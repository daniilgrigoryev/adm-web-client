<template>

  <div v-if="body" class="ml18 mb18">
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
              <div id="dc-object-map" />
              <view-data-item 
                label="Координаты" 
                :value="fotofix.violPlaceLatitude, fotofix.violPlaceLongitude | concatByDelimiter(',')" 
              />
            </div>
          </article>
          <view-data-item 
            label="Дата и время нарушения" 
            :value="fotofix.violTime | formatDateTime('DD.MM.YYYY HH:mm')" 
            :icon="require('../../../assets/images/time.svg')"
          />
          <view-data-item 
            label="Место нарушения" 
            :value="fotofix.violPlace" 
            :icon="require('../../../assets/images/map.svg')"
          />
          <hr>
          <view-data-item 
            label="Индефитикатор" 
            :value="fotofix.cam1CertNumber" 
          />
          <view-data-item 
            label="Модель" 
            :value="fotofix.cam1Model" 
          />
          <view-data-item 
            label="Идентификатор поверки" 
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
  import ViewDataItem from "~/components/shared/ui/view-data-item.vue";
  import {mapGetters} from 'vuex';
  import $ from "jquery";
  import mapboxgl from 'mapbox-gl';
  import '~/assets/mapbox/mapbox-gl.css';
  import Slider from './Slider.vue';

  export default {
    name: "DlgEdFotoMaterial",
    components: {
      Slider,
      ViewDataItem,
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
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
        }
        delete currentForm['restore'];
        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch('fillModule', {'event': eventResponse});

        let vm = this;
        this.$store.watch(this.$store.getters.dlgEdFotoMaterialGetCommand, async () => {
          try {
            let current = formStack.getCurrent();
            let uid = vm.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
            let currentForm = innerFormStack.getCurrent(uid);
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            alert(e.message);
          }
        });
      } catch (e) {
        alert(e.message);
      }
    },
    mounted() {
      let vm = this;
      this.$store.watch(this.$store.getters.dlgEdFotoMaterialGetDataForMap, () => {
        try {
          let container = document.querySelector('#dc-object-map');
          let current = formStack.getCurrent();
          let uid = vm.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          let currentForm = innerFormStack.getCurrent(uid);
          if (container && currentForm) {
            vm.fillComponent({
              vm: vm,
              cid: currentForm.cid,
              photos: vm.dataStore ? vm.dataStore.fotoList : null
            });
          }
        } catch (e) {
          alert(e.message);
        }
      });
    },
    destroyed() {
      this.$store.dispatch('dlgEdFotoMaterialSetCid', null);
      this.$store.dispatch('dlgEdFotoMaterialSetData', null);
    },
    methods: {
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
        if (!coord[0]) {
          coord = [37.632478, 55.749408];
        }
        this.map = new mapboxgl.Map({
            container: id,
            style: ConstantUtils.MAP_STYLE,
            center: [coord[0], coord[1]],
            zoom: 12,
            showCompass: false,
          }
        );
      },
      drawCamera(coord) {
        if (!coord[0]) {
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
    grid-template-columns: 250px 1fr;
    grid-gap: 12px;
    hr {
      height: 1px;
      width: 100%;
      color: #cccccc;
      background: #cccccc;
      grid-column: span 2;
    }
  }
</style>

<style lang="scss">
  .marker {
    width: 20px;
    height: 20px;
    z-index: 3;
    &.iconCamera {
      background: url('../../../assets/images/map-cam-b.svg') no-repeat center;
      background-size: contain;
    }
  }
</style>

