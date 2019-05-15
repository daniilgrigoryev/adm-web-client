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
          <Alert v-if="fileError" type="warning" closable show-icon @on-close="clearFile">Неправильный формат
            файла.
          </Alert>

          <div class="relative ivu-upload-drag py12 cursor-pointer">
            <template>
              <label class="absolute block w-full h-full cursor-pointer">
                <input type="file" multiple ref="file" @change="onFileChange" id="file"
                       class="none"/>
              </label>

              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" class="pt36"></Icon>
              <p class="pb36">Щелкните для выбора файлов</p>
            </template>
          </div>
        </Col>
      </Row><!--
      <div>
        <div class="page-card-file-icon">
          <Icon type="ios-document-outline" size="36"/>
          <div class="page-card-file-icon-type"></div>
        </div>
        <p class="page-card-file-icon-caption">Test1</p>
        <Button @click.stop="clearFile" icon="ios-close-circle color-orange" type="text" size="small">
          Очистить
        </Button>
      </div>-->
    </div>
    <div v-if="filesArray.length > 0 || otherMedia.length > 0" class="adm-form__item">
      <small class="adm-form__label">Выбранные файлы</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <article v-if="filesArray.length > 0" class="gallery">
            <hr>
            <Slider :showImage="false" :photos="filesArray" classes="reverse"/>
          </article>

          <div v-if="otherMedia.length > 0">
            <div v-for="(itemMedia, itemMediaIdx) in otherMedia" :key="itemMediaIdx">
              <span>{{ itemMedia.name }}</span>
            </div>
          </div>
        </Col>
      </Row>
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
        fileError: false,
        allowedFiles: ['image/png', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'video/mp4', 'application/pdf', 'application/pgp-signature', 'video/webm'],
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
        this.fileError = false;

        let files = e.target.files || e.dataTransfer.files;
        if (!files || files.length === 0) {
          await this.storeElementData();
          return;
        }

        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let type = file.type;
          if (!this.allowedFiles.includes(type)) {
            this.clearFile();
            // this.$store.dispatch('errors/changeContent', {title: 'Неправильный формат файла', desc: 'Допустимые форматы: Microsoft Excel (XLS, XLSX), PNG, JPEG, MP4, PDF, WEBM',});
            this.$Notice.warning({
              title: 'Неправильный формат файла',
              desc: 'Допустимые форматы: Microsoft Word (DOC), PNG, JPEG, MP4, PDF, WEBM',
              duration: 10
            });

            this.fileError = true;
            return;
          }
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
              body: body,
              byteArray: byteArray
            };
            vm.byteArraysCount += body.length;
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

            switch (file.file.type) {
              case 'image/png':
              case 'image/jpeg': {
                this.filesArray.push({
                  type: file.file.type,
                  desc: file.file.name,
                  body: this.byteArrayToBase64(file.byteArray, file.file.type)
                  });
                break;
              }
              case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
              case 'video/mp4':
              case 'application/pdf':
              case 'application/pgp-signature':
              case 'video/webm': {
                this.otherMedia.push({
                  type: file.file.type,
                  name: file.file.name
                });
                break;
              }
            }
          }
        }
        if (errors.length > 0) {
          let answer = confirm(`Не удалось загрузить файлы:\n${errorsFiles}Повторить отправку?`);
          if (answer) {
            debugger;
          }
        } else {
          this.$store.dispatch('errors/changeContent', {title: 'Файлы загружены'});
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
