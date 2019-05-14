<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Название</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Input class="adm-input adm-input--regular" v-model="data.docN" @on-input-change="storeElementData"></Input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Описание</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Input class="adm-input adm-input--regular" v-model="data.dopSved" @on-input-change="storeElementData"></Input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Медиа документы</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <input type="file" multiple ref="file" @change="onFileChange" id="file"/>
        </Col>
      </Row>
    </div>
    <article v-if="filesArray.length > 0" class="gallery">
      <hr>
      <Slider :photos="filesArray" classes="reverse"/>
    </article>
    <div v-if="otherMedia.length > 0" v-for="(item, index) in otherMedia" :key="index">
      {{item}}
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemDocPhoto",
    props: {
      info: Object
    },
    components: {
      Slider: () => import('~/components/delo/DlgEdFotoMaterial/Slider')
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        files: null,
        byteArraysCount: 0,
        filesArray: [],
        otherMedia: []
      }
    },
    methods: {
      async initData() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getCurrentData',
            data: null
          }
        });
        this.data = JSON.parse(JSON.parse(eventResponse.response).data);
      },
      byteArrayToBase64(bytes, type) {
        let binary = '';
        let len = bytes.length;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return `data:${type};base64,${window.btoa(binary)}`;
      },
      async onFileChange(e) {
        let vm = this;
        this.byteArraysCount = 0;
        this.files = {};
        this.filesArray = [];
        this.otherMedia = [];
        this.data.files = [];

        let files = e.target.files || e.dataTransfer.files;
        if (!files || files.length === 0) {
          await this.storeElementData();
          return;
        }

        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          this.data.files.push({
            name: file.name,
            type: file.type,
            size: file.size,
            loadSize: 0
          });
        }
        await this.storeElementData();

        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let reader = new FileReader();
          reader.onload = function (e) {
            let kb = 1024 * 64;
            let key = this.metaInfo.name + '-' + this.metaInfo.type + '-' + this.metaInfo.size;
            let byteArray = Array.prototype.slice.call(new Uint8Array(e.currentTarget.result));
            let body = vm.chunkArray(byteArray, kb);
            vm.files[key] = {
              file: this.metaInfo,
              body: body
            };
            vm.byteArraysCount += body.length;

            switch (this.metaInfo.type) {
              case 'image/png':
              case 'image/jpeg': {
                vm.filesArray.push(vm.byteArrayToBase64(byteArray, this.metaInfo.type));
                break;
              }
              case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
              case 'video/mp4':
              case 'application/pdf':
              case 'application/pgp-signature':
              case 'video/webm': {
                vm.otherMedia.push(this.metaInfo.name);
                break;
              }
            }

            this.onloaded();
          };
          reader.metaInfo = file;
          reader.onloaded = function () {
            let keys = Object.keys(vm.files);
            if (keys.length === vm.data.files.length) {
              for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                vm.sendFile(key);
              }
            }
          };
          reader.readAsArrayBuffer(file);
        }
      },
      sendFile(key) {
        let vm = this;
        let file = this.files[key];
        let kbArrays = file.body;
        let sendedBytes = 0;
        for (let i = 0; i < kbArrays.length; i++) {
          let kbArray = kbArrays[i];
          let response = RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'setPart',
              data: JSON.stringify({
                fileName: file.file.name,
                startPos: sendedBytes,
                body: kbArray,
              })
            },
            withSpinner: false
          });
          sendedBytes += kbArray.length;
          response.then(() => {
            vm.byteArraysCount--;
            if (vm.byteArraysCount === 0) {
              vm.checkSended();
            }
          }, () => {
            vm.byteArraysCount--;
            if (vm.byteArraysCount === 0) {
              vm.checkSended();
            }

          });
        }
      },
      async checkSended() {
        let errors = [];
        let errorsFiles = '';
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getCurrentData',
            data: null
          },
          withSpinner: false
        });
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < data.files.length; i++) {
          let dataFile = data.files[i];
          let key = dataFile.name + '-' + dataFile.type + '-' + dataFile.size;
          let file = this.files[key];
          this.byteArraysCount += file.body.length;
          if (dataFile.loadSize !== file.file.size) {
            file.successed = false;
            errors.push(key);
            errorsFiles += file.file.name + '\n';
          } else {
            file.successed = true;
          }
        }
        if (errors.length > 0) {
          let answer = confirm(`Не удалось загрузить файлы:\n${errorsFiles}Повторить отправку?`);
          if (answer) {
            debugger;
          }
        } else {
          alert('Файлы загружены');
        }
      },
      chunkArray(myArray, chunkSize) {
        let index = 0;
        let arrayLength = myArray.length;
        let tempArray = [];

        for (index = 0; index < arrayLength; index += chunkSize) {
          let myChunk = myArray.slice(index, index + chunkSize);
          tempArray.push(myChunk);
        }

        return tempArray;
      },
      clearFile() {
        this.file = null;
        let input = this.$refs.file;
        input.type = 'file';
      },
      async storeElementData() {
        return new Promise((resolve, reject) => {
          this.$emit('storeElementData', {
            eCID: this.info.eCID,
            data: this.data,
            resolve: resolve
          });
        });
      },
    }
  }
</script>

<style scoped>

</style>
