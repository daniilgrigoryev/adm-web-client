<template>
  <div v-if="body" class="mb18">
    <div class="amd-title amd-title--sticky px36 py24"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <b class="adm-text-big color-dark-lighter">Медиаматериалы</b>
        </div>
      </div>
    </div>

    <div class="material-items-wrap">
      <div class="material-item" v-for="item in filesArray" :key="item.id">
        <div class="item-preview" @click="openModal(item)">
          <img :src="item.preview" alt="" :class="item.class">
          <div class="hov-block"><img :src="require('~/assets/images/icons/resize-diagonal.svg')" alt=""></div>
        </div>
        <div class="text-wrap">
          <div class="date">
            {{item.date}}
            <!-- <button class="options" @click="options(item)" title="Загрузить">
              <img :src="require('~/assets/images/icons/dots.svg')" alt="">
            </button> -->
          </div>
          <div class="name">{{item.docNum}}</div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="modal.status">
      <div class="head">
        <div class="name-wrap">
          <button class="back" @click="closeModal">
            <img :src="require('~/assets/images/icons/arrow-to-left.svg')" alt="">
          </button>
          <div class="name">
            {{modal.data.docNum}}
          </div>
        </div>
        <div class="date">{{modal.data.date}}</div>
        <div class="options-wrap">
          <button class="download" @click="downloadMedia(modal.data)">
            <img :src="require('~/assets/images/icons/download.svg')" alt="">
          </button>
          <button class="options" @click="options(modal.data)" title="Загрузить">
            <img :src="require('~/assets/images/icons/dots.svg')" alt="">
          </button>
        </div>
      </div>
      <div class="body">
        <div id="docx" v-if="modal.data.mimeType === constants.DOCX_MIME_TYPE" v-html="modal.data.body.innerHTML"></div>
        <embed v-else-if="modal.data.mimeType === constants.PDF_MIME_TYPE" :src="modal.data.body" />
        <video v-if="modal.data.mimeType === constants.WEBM_MIME_TYPE || modal.data.mimeType === constants.MP4_MIME_TYPE" :src="modal.data.body" :autoplay="false" controls playsinline :type="modal.data.mimeType"></video>
        <img v-else :src="modal.data.body" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import * as ConstantUtils from "~/assets/js/utils/constantUtils";
  import * as constants from "~/assets/js/utils/constants";
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import {mapGetters} from 'vuex';
  const docx = require('docx-preview');
  window.JSZip = require('jszip');

  export default {
    name: "FrmEdMediaMaterial",
    props: {
      delo: Object
    },
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
    data() {
      return {
        modal: {
          status: false,
          data: {},
        },
        filesArray: [],
        constants,
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
      player() {
        return this.$refs.videoPlayer.player
      }
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

          await this.fillComponent({
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
        let storeFilesArray = this.dataStore.fotoList;

        vm.filesArray = [];
        if (storeFilesArray && storeFilesArray.length > 0) {
          for (let i = 0; i < storeFilesArray.length; i++) {
            let file = storeFilesArray[i];
            let item = {
              docNum: file.docNum,
              date: file.docDate,
              mediaId: file.mediaId,
              mimeType: file.mimeType,
            };
            switch (file.mimeType) {
              case constants.PNG_MIME_TYPE:
              case constants.JPEG_MIME_TYPE: {
                let eventResponse = await RequestApi.prepareData({
                  method: 'getPhotoBody',
                  params: {
                    'mediaMetaId': file.mediaId
                  },
                  cid: cid
                });
                if (eventResponse.response) {
                  let body = JSON.parse(eventResponse.response).data;
                  item.preview = `data:${file.mimeType};base64,${body}`;
                  item.body = `data:${file.mimeType};base64,${body}`;
                }
                break;
              }
              case constants.WEBM_MIME_TYPE:
              case constants.MP4_MIME_TYPE: {
                item.preview = require("~/assets/images/icons/foto-kamera-varialt-1.svg");
                let eventResponse = await RequestApi.prepareData({
                  method: 'getPhotoBody',
                  params: {
                    'mediaMetaId': item.mediaId
                  },
                  cid: cid
                });
                if (eventResponse.response) {
                  let body = JSON.parse(eventResponse.response).data;
                  const blob = this.base64ToBlob(body, item.mimeType);
                  let element = document.createElement("a");
                  element.href = window.URL.createObjectURL(blob);
                  item.body = element;
                }
                break;
              }
              case constants.PDF_MIME_TYPE: {
                item.preview = require("~/assets/images/icons/dokument-pdf.svg");
                let eventResponse = await RequestApi.prepareData({
                  method: 'getPhotoBody',
                  params: {
                    'mediaMetaId': file.mediaId
                  },
                  cid: cid
                });
                if (eventResponse.response) {
                  let body = JSON.parse(eventResponse.response).data;
                  item.body = `data:${file.mimeType};base64,${body}`;
                }
                break;
              }
              case constants.PGP_SIGNATURE_MIME_TYPE: {
                const icon = require("~/assets/images/icons/dokument-digital.svg");
                item.preview = icon;
                item.body = icon;
                item.class = "--icon";
                break;
              }
              case constants.DOCX_MIME_TYPE: {
                item.preview = require("~/assets/images/icons/dokument-docx.svg");
                let eventResponse = await RequestApi.prepareData({
                  method: 'getPhotoBody',
                  params: {
                    'mediaMetaId': item.mediaId
                  },
                  cid: cid
                });
                if (eventResponse.response) {
                  let docxEl = document.createElement('div');
                  let body = JSON.parse(eventResponse.response).data;
                  const blob = this.base64ToBlob(body, item.mimeType);
                  // TODO
                  // await docx.renderAsync(blob, docxEl);
                  item.body = docxEl;
                }
                break;
              }
            }
            vm.filesArray.push(item);
          }
        }
      },
      base64ToBlob(base64, type) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], {type: type});
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
      openModal(item) {
        this.modal.status = true;
        this.modal.data = item;
      },
      closeModal() {
        this.modal.status = false;
        this.modal.data = {};
      },
      options(item) {
        this.downloadMedia(item);
      }
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
  .material-items-wrap {
    display: grid;
    grid-template-columns: repeat(3, 280px);
    grid-gap: 10px;
    .material-item {
      min-height: 220px;
      background: #fff;
      border: 1px solid #CCCCCC;
      .item-preview {
        border-bottom: 1px solid #CCCCCC;
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        img {
          height: 100%;
          &.--icon {
            height: 70%;
          }
        }
        .hov-block {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          background: rgba(0, 0, 0, 0.5);
          transition: .3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 32px;
          }
        }
        &:hover {
          .hov-block {
            opacity: 1;
          }
        }
      }
      .text-wrap {
        padding: 10px;
        .date {
          color: #797979;
          font-size: 13px;
          font-style: italic;
          margin-bottom: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .options {
            padding: 0 5px;
          }
        }
        .name {
          color: #808080;
          font-weight: 600;
          font-size: 14px;
        }
      }
    }
  }
  .modal {
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    height: 100%;
    z-index: 90;
    display: grid;
    grid-auto-rows: 100px 1fr;
    .head {
      color: #fff;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 100px 1fr;
      padding: 10px;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        &.name-wrap {
          justify-content: flex-start;
          .back {
            padding: 20px;
            transition: .3s ease;
            &:hover {
              opacity: .5;
            }
          }
          .name {
            font-size: 24px;
            font-weight: 600;
            margin-left: 20px;
          }
        }
        &.options-wrap {
          justify-content: flex-end;
          padding-right: 10px;
          button {
            padding: 10px 20px;

          }
        }
      }
    }
    .body {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        background: #fff;
      }
      embed {
        width: 100%;
        height: 100%;
      }
      #docx {
        overflow-y: auto;
        height: calc(100vh - 200px);
      }
      video {
        width: 70%;
        height: 70%;
      }
    }
  }
</style>

