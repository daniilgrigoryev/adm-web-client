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
            файла {{fileError}}.
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
      </Row>
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

          <Button @click="clearPreview" type="text">Очистить</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
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
        fileError: null,
        allowedFiles: ['image/png', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'video/mp4', 'application/pdf', 'application/pgp-signature', 'video/webm'],
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
        if (this.data.files && this.data.files.length > 0) {
          eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getFileBody',
              data: null
            }
          });
          let filesBody = JSON.parse(JSON.parse(eventResponse.response).data);
          for (let i = 0; i < this.data.files.length; i++) {
            let file = this.data.files[i];
            let fileBody = filesBody[file.name];
            switch (file.type) {
              case 'image/png':
              case 'image/jpeg': {
                this.filesArray.push({
                  type: file.type,
                  desc: file.name,
                  body: `data:${file.type};base64,${fileBody}`
                });
                break;
              }
              case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
              case 'video/mp4':
              case 'application/pdf':
              case 'application/pgp-signature':
              case 'video/webm': {
                this.otherMedia.push({
                  type: file.type,
                  name: file.name,
                });
                break;
              }
            }
          }
        }
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

        let files = e.target.files || e.dataTransfer.files;
        if (!files) {
          this.clearFile();
          await this.storeElementData();
          return;
        }

        files = Array.prototype.slice.call(files);
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let type = file.type;
          if (!this.allowedFiles.includes(type)) {
            // this.$store.dispatch('errors/changeContent', {title: 'Неправильный формат файла', desc: 'Допустимые форматы: Microsoft Excel (XLS, XLSX), PNG, JPEG, MP4, PDF, WEBM',});
            this.$Notice.warning({
              title: `Неправильный формат файла ${file.name}.`,
              desc: 'Допустимые форматы: Microsoft Word (DOC), PNG, JPEG, MP4, PDF, WEBM',
              duration: 10
            });

            this.fileError = file.name;
            this.clearFile(false);
            return;
          }
        }

        files.forEach((file, index, object) => {
          let fileOfDataFiles = this.data.files.filter((item) => {
            return item.desc === file.name;
          }).getFirst();
          if (!fileOfDataFiles) {
            this.data.files.push({
              name: file.name,
              type: file.type,
              size: file.size,
              loadSize: 0
            });
          } else {
            object.splice(index, 1);
          }
        });
        await this.storeElementData();

        let filesToLoad = {
          files: [],
          count: files.length
        };

        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let reader = new FileReader();
          reader.onload = async function (e) {
            this.metaInfo.byteArray = Array.prototype.slice.call(new Uint8Array(e.currentTarget.result));
            filesToLoad.files.push(this.metaInfo);
            await vm.sendFile(this.metaInfo);
            filesToLoad.count--;
            if (filesToLoad.count === 0) {
              vm.checkSended(filesToLoad.files);
            }
          };
          reader.metaInfo = file;
          reader.readAsArrayBuffer(file);
        }
      },
      async sendRepeatFiles(files) {
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          await this.sendFile(file);
        }
        this.checkSended(files);
      },
      async sendFile(file) {
        let kb = 1024 * 64;
        let kbArrays = this.chunkArray(file.byteArray, kb);
        let sendedBytes = 0;
        for (let i = 0; i < kbArrays.length; i++) {
          let kbArray = kbArrays[i];
          await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'setPart',
              data: JSON.stringify({
                fileName: file.name,
                startPos: sendedBytes,
                body: kbArray,
              })
            }
          });
          sendedBytes += kbArray.length;
        }
      },
      async checkSended(files) {
        let errorsFiles = [];
        let errors = '';
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
        this.data = data;
        for (let i = 0; i < data.files.length; i++) {
          let dataFile = data.files[i];
          let file = files.filter((item) => {
            return item.name === dataFile.name;
          }).getFirst();
          if (!file) {
            continue;
          }
          if (dataFile.loadSize !== file.size) {
            errorsFiles.push(file);
            errors += file.name + '\n';
          } else {
            switch (file.type) {
              case 'image/png':
              case 'image/jpeg': {
                this.filesArray.push({
                  type: file.type,
                  desc: file.name,
                  body: this.byteArrayToBase64(file.byteArray, file.type)
                });
                break;
              }
              case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
              case 'video/mp4':
              case 'application/pdf':
              case 'application/pgp-signature':
              case 'video/webm': {
                this.otherMedia.push({
                  type: file.type,
                  name: file.name
                });
                break;
              }
            }
          }
        }
        if (errorsFiles.length > 0) {
          let answer = confirm(`Не удалось загрузить файлы:\n${errors}Повторить отправку?`);
          if (answer) {
            this.sendRepeatFiles(errorsFiles);
          }
        } else {
          this.$Notice.warning({
            title: 'Файлы загружены',
            duration: 10
          });
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
      clearFile(withClearError = true) {
        let input = this.$refs.file;
        input.type = 'file';
        if (withClearError === true) {
          this.fileError = null;
        }
      },
      async clearPreview() {
        this.filesArray = [];
        this.otherMedia = [];
        this.clearFile();
        for (let i = 0; i < this.data.files.length; i++) {
          let file = this.data.files[i];
          await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'removeFile',
              data: JSON.stringify({
                fileName: file.name
              })
            }
          });
        }
        this.data.files = [];
        await this.storeElementData();
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
