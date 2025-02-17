<template>

  <div v-if="body" class="mb18">
    <div class="amd-title amd-title--sticky px36 py24"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <b class="adm-text-big color-dark-lighter">Фотофиксация нарушения</b>
        </div>
      </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <article class="gallery">
            <Slider :photos="photos"/>
            <div class="dc-object-map-wrap">
              <div id="dc-object-map"></div>
              <view-data-item
                label="Координаты"
                :value="fotofix.violPlaceLatitude, fotofix.violPlaceLongitude | concatByDelimiter(',')"
              />
            </div>
          </article>
          <view-data-item
            label="Дата и время нарушения"
            :value="fotofix.violTime | formatDateTime('DD.MM.YYYY HH:mm')"
            :icon="require('../../../assets/images/icons/time.svg')"

          />
          <view-data-item
            label="Место нарушения"
            :value="fotofix.violPlace"
            :icon="require('../../../assets/images/icons/map.svg')"

          />
          <hr>
          <view-data-item
            label="Идентификатор"
            :value="fotofix.cam1CertNumber"
          />
          <view-data-item
            label="Модель"
            :value="fotofix.cam1Model"
          />
          <view-data-item
            label="Сертификат поверки"
            :value="fotofix.cam2CertExpirDate"
          />
          <view-data-item
            label="Окончание"
            :value="fotofix.cam1CertExpirDate | formatDateTime('DD.MM.YYYY HH:mm')"
          />

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import * as ConstantUtils from "~/assets/js/utils/constantUtils";
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import {mapGetters} from 'vuex';
  import mapboxgl from 'mapbox-gl';
  import '~/assets/mapbox/mapbox-gl.css';

  export default {
    name: "DlgEdFotoMaterial",
    components: {
      Slider: () => import('~/components/delo/DlgEdFotoMaterial/Slider'),
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.dlgEdFotoMaterialGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
          }
        });
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    mounted() {
      let vm = this;
      this.$store.watch(this.$store.getters.dlgEdFotoMaterialGetDataForMap, () => {
        try {
          let container = document.querySelector('#dc-object-map');
          let currentForm = innerFormStack.getCurrent();
          if (container && currentForm) {
            vm.fillComponent({
              vm: vm,
              cid: currentForm.cid,
              photos: vm.dataStore ? vm.dataStore.fotoList : null
            });
          }
        } catch (e) {
          this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
        }
      });
    },
    destroyed() {
      this.$store.dispatch('dlgEdFotoMaterialSetCid', null);
      this.$store.dispatch('dlgEdFotoMaterialSetData', null);
    },
    methods: {
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
          await this.$store.dispatch('dlgEdFotoMaterialSetCid', currentForm.cid);

          let prepareParams = {
            method: 'restore',
            cid: currentForm.cid
          };
          if (funcUtils.isEmpty(currentForm.restore)) {
            prepareParams.method = 'getData';
            prepareParams.params = {
              'node': currentForm.params
            };
            currentForm.restore = true;
          } else {
            delete currentForm['restore'];
          }
          innerFormStack.updateCurrent(currentForm);
          let eventResponse = await RequestApi.prepareData(prepareParams);
          await this.$store.dispatch('fillModule', {'event': eventResponse});
        } catch (e) {
          this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
        }
      },
      async fillComponent(params) {
        let cid = params.cid;
        let photos = params.photos;
        let vm = params.vm;

        vm.photos = [];
        if (photos && photos.length > 0) {
          let item;
          let eventResponse;
          let photo;

          photos.forEach((element, index) => {
            if (element.isRegnoFoto === "t") {
              photos.splice(index , 1);
              photos.unshift(element);
            }
          });
          for (let i = 0; i < photos.length; i++) {
            item = photos[i];
            eventResponse = await RequestApi.prepareData({
              method: 'getPhotoBody',
              params: {
                'node': item.id
              },
              cid: cid
            });
            if (eventResponse.response) {
              photo = JSON.parse(eventResponse.response).data;
              vm.photos.push('data:image/jpeg;base64,' + photo);
            }
          }
        }

        if (vm.fotofix) {
          vm.createMapObjects('dc-object-map', [vm.fotofix.violPlaceLongitude, vm.fotofix.violPlaceLatitude]);
          vm.drawCamera([vm.fotofix.violPlaceLongitude, vm.fotofix.violPlaceLatitude]);
        }
      },
      createMapObjects(id, coord) {
        if (!coord.getFirst()) {
          coord = [37.632478, 55.749408];
        }
        let mapStyle = this.$store.state.properties.data.MAP_STYLE;
        this.map = new mapboxgl.Map({
            container: id,
            style: mapStyle,
            center: [coord[0], coord[1]],
            zoom: 12,
            showCompass: false,
          }
        );
      },
      drawCamera(coord) {
        if (!coord.getFirst()) {
          coord = [37.632478, 55.749408];
        }
        document.querySelectorAll('.marker').forEach(function (marker) {
          marker.remove();
        });
        let feature = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [coord[0], coord[1]]
          }
        };
        let el = document.createElement('div');
        el.className = 'marker';
        el.className += ' iconCamera';
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .addTo(this.map);
      },
    },
    data() {
      return {
        photos: [],
        map: null,
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'dlgEdFotoMaterialGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
      fotofix() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.fotofix;
        }
        return res;
      },
    },
  }
</script>

<style scoped lang="scss">
  article.gallery {
    grid-column: span 2;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 12px;
    align-items: flex-start;
    align-content: flex-start;
    padding-bottom: 40px;
    #dc-object-map {
      height: 300px;
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .items-wrap {
    display: grid;
    .item{
      display: block;
    }
  }
</style>

<style lang="scss">
  .marker {
    width: 20px;
    height: 20px;
    z-index: 3;
    &.iconCamera {
      background: url('../../../assets/images/icons/map-cam-b.svg') no-repeat center;
      background-size: contain;
    }
  }
</style>

