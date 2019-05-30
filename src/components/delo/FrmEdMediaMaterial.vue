<template>
  <div v-if="body" class="ml18 mb18">
    <div class="amd-title amd-title--sticky px36 py24"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <b class="adm-text-big color-dark-lighter">Медиаматериалы</b>
        </div>
      </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <article v-if="photos.length > 0" class="gallery">
            <Slider :photos="photos" />
          </article>

          <div v-if="otherMedia.length > 0" v-for="(item, index) in otherMedia" :key="index" @click="downloadMedia(item)">
            {{item.docNum}}
          </div>

          <view-data-item
            label="Test"
            :value="body.docN"
          />
          <view-data-item
            label="Test"
            :value="body.docTipName"
          />
          <view-data-item
            label="Test"
            :value="body.docN"
          />
          <view-data-item
            label="Test"
            :value="body.docTipName"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as ConstantUtils from "~/assets/js/utils/constantUtils";
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import {mapGetters} from 'vuex';

  export default {
    name: "FrmEdMediaMaterial",
    components: {
      Slider: () => import('~/components/delo/DlgEdFotoMaterial/Slider'),
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdMediaMaterialGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});

            vm.fillComponent({
              vm: vm,
              cid: currentForm.cid
            });
          } catch (e) {
            this.$store.dispatch('errors/changeContent', {title: e.message,});
          }
        });
      } catch (e) {
        this.$store.dispatch('errors/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdMediaMaterialSetCid', null);
      this.$store.dispatch('frmEdMediaMaterialSetData', null);
    },
    methods: {
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
          await this.$store.dispatch('frmEdMediaMaterialSetCid', currentForm.cid);

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

          this.fillComponent({
            vm: this,
            cid: currentForm.cid
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      async fillComponent(params) {
        let cid = params.cid;
        let vm = params.vm;
        let photos = vm.dataStore.fotoList;

        vm.photos = [];
        vm.otherMedia = [];
        if (photos && photos.length > 0) {
          let item;
          let eventResponse;
          let photo;

          for (let i = 0; i < photos.length; i++) {
            item = photos[i];
            switch (item.mimeType) {
              case 'image/png':
              case 'image/jpeg': {
                eventResponse = await RequestApi.prepareData({
                  method: 'getPhotoBody',
                  params: {
                    'mediaMetaId': item.mediaId
                  },
                  cid: cid
                });
                if (eventResponse.response) {
                  photo = JSON.parse(eventResponse.response).data;
                  vm.photos.push(`data:${item.mimeType};base64,${photo}`);
                }
                break;
              }
              case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
              case 'video/mp4':
              case 'application/pdf':
              case 'application/pgp-signature':
              case 'video/webm': {
                vm.otherMedia.push(item);
              }
            }
          }
        }
      },
      async downloadMedia(item) {
        try {
          let eventResponse = await RequestApi.sendGetMediaFileHttpRequest({
            url: `${ConstantUtils.HTTP_URL_FILES}/${localStorage.getItem('admSid')}/${item.mediaId}`
          });
          let data = null;
          if (eventResponse.response) {
            data = eventResponse.response;
          }
          if (data) {
            let element = document.createElement("a");
            element.href = window.URL.createObjectURL(data);
            element.setAttribute("download", `${item.docNum}`);
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }
        } catch (e) {
          this.$Notice.warning({
            title: 'Ошибка получения данных',
            desc: e.message,
            duration: 10
          });
        }
      },
    },
    data() {
      return {
        photos: [],
        otherMedia: [],
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdMediaMaterialGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
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

