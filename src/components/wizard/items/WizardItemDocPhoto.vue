<template>
  <div>
    <div class="items" :class="{empty: !filesArray.length}">
      <form ref="fileform" class="add-item-wrap">
        <div class="text">Перетащите сюда файл</div>
        <div class="text small">или</div>
        <label>
          Выберите
          <input type="file" multiple ref="file" @change="onFileChange" id="file" class="none"/>
        </label>
      </form>
      <div v-if="data"
           class="item"
           v-for="(item, index) in filesArray"
           :key="item.id"
      >
        <div class="item-preview">
          <img v-if="item.type === constants.PNG_MIME_TYPE || item.type === constants.JPEG_MIME_TYPE"
               :src="item.body" alt="">

          <img v-else-if="item.type === constants.PDF_MIME_TYPE"
               :src="require('~/assets/images/icons/dokument-pdf.svg')" alt="">

          <img v-else-if="item.type === constants.PGP_SIGNATURE_MIME_TYPE"
               :src="require('~/assets/images/icons/dokument-digital.svg')" alt="">

          <img v-else-if="item.type === constants.DOCX_MIME_TYPE"
               :src="require('~/assets/images/icons/dokument-docx.svg')" alt="">

          <img v-else-if="item.type === constants.WEBM_MIME_TYPE || item.type === constants.MP4_MIME_TYPE"
               :src="require('~/assets/images/icons/foto-kamera-varialt-1.svg')" alt="">
        </div>
        <div class="file-name">{{item.name}}</div>
        <button class="remove" @click="removeItem(item, index)"><img :src="require('~/assets/images/icons/remove.svg')" alt=""></button>
      </div>
    </div>
  </div>
</template>

<script>
import RequestApi from "~/assets/js/api/requestApi";
import * as constants from "~/assets/js/utils/constants";

export default {
  name: "WizardItemDocPhoto",
  props: {
    info: Object
  },
  components: {
    Slider: () => import("~/components/delo/DlgEdFotoMaterial/Slider")
  },
  async created() {
    await this.initData();
  },
  mounted(){
    this.dragAndDropCapable = this.determineDragAndDropCapable();
    if(this.dragAndDropCapable) {
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach((evt) => {
        this.$refs.fileform.addEventListener(evt, function(e) {
          e.preventDefault();
          e.stopPropagation();
        });
      });

      this.$refs.fileform.addEventListener('drop', this.onFileChange);
    }
  },
  data() {
    return {
      data: null,
      dragFiles: null,
      dragAndDropCapable: false,
      fileError: null,
      allowedFiles: [
        constants.PNG_MIME_TYPE,
        constants.JPEG_MIME_TYPE,
        constants.DOCX_MIME_TYPE,
        constants.MP4_MIME_TYPE,
        constants.PDF_MIME_TYPE,
        constants.PGP_SIGNATURE_MIME_TYPE,
        constants.WEBM_MIME_TYPE
      ],
      filesArray: [],
      constants
    };
  },
  methods: {
    async initData() {
      let eventResponse = await RequestApi.prepareData({
        method: "invokeElementMethod",
        params: {
          eCID: this.info.eCID,
          methodName: "getCurrentData",
          data: null
        }
      });
      this.data = JSON.parse(JSON.parse(eventResponse.response).data);
      if (this.data.files && this.data.files.length > 0) {
        eventResponse = await RequestApi.prepareData({
          method: "invokeElementMethod",
          params: {
            eCID: this.info.eCID,
            methodName: "getFileBody",
            data: null
          }
        });
        let filesBody = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < this.data.files.length; i++) {
          let file = this.data.files[i];
          let fileBody = filesBody[file.name];
          let item = {
            name: file.name,
            type: file.type
          };
          switch (file.type) {
            case constants.PNG_MIME_TYPE:
            case constants.JPEG_MIME_TYPE: {
              item.body = `data:${file.type};base64,${fileBody}`;
              break;
            }
            case constants.WEBM_MIME_TYPE:
            case constants.MP4_MIME_TYPE: {
              item.body = require("~/assets/images/icons/foto-kamera-varialt-1.svg");
              break;
            }
            case constants.PDF_MIME_TYPE: {
              item.body = require("~/assets/images/icons/dokument-pdf.svg");
              break;
            }
            case constants.PGP_SIGNATURE_MIME_TYPE: {
              item.body = require("~/assets/images/icons/dokument-digital.svg");
              break;
            }
            case constants.DOCX_MIME_TYPE: {
              item.body = require("~/assets/images/icons/dokument-docx.svg");
              break;
            }
          }
          this.filesArray.push(item);
        }
      }
    },
    byteArrayToBase64(bytes, type) {
      let binary = "";
      let len = bytes.length;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return `data:${type};base64,${window.btoa(binary)}`;
    },
    determineDragAndDropCapable() {
      let div = document.createElement('div');
      return (('draggable' in div)
        || ('ondragstart' in div && 'ondrop' in div))
        && 'FormData' in window
        && 'FileReader' in window;
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
          // this.$store.dispatch('errorsModal/changeContent', {title: 'Неправильный формат файла', desc: 'Допустимые форматы: Microsoft Excel (XLS, XLSX), PNG, JPEG, MP4, PDF, WEBM',});
          this.$Notice.warning({
            title: `Неправильный формат файла ${file.name}.`,
            desc:
              "Допустимые форматы: Microsoft Word (DOCX), PNG, JPEG, MP4, PDF, WEBM",
            duration: 10
          });

          this.fileError = file.name;
          this.clearFile(false);
          return;
        }
      }

      files.forEach((file, index, object) => {
        let fileOfDataFiles = this.data.files
          .filter(item => {
            return item.name === file.name;
          })
          .getFirst();
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
        reader.onload = async function(e) {
          this.metaInfo.byteArray = Array.prototype.slice.call(
            new Uint8Array(e.currentTarget.result)
          );
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
          method: "invokeElementMethod",
          params: {
            eCID: this.info.eCID,
            methodName: "setPart",
            data: JSON.stringify({
              fileName: file.name,
              startPos: sendedBytes,
              body: kbArray
            })
          }
        });
        sendedBytes += kbArray.length;
      }
    },
    async checkSended(files) {
      let errorsFiles = [];
      let errors = "";
      let eventResponse = await RequestApi.prepareData({
        method: "invokeElementMethod",
        params: {
          eCID: this.info.eCID,
          methodName: "getCurrentData",
          data: null
        },
        withSpinner: false
      });
      let data = JSON.parse(JSON.parse(eventResponse.response).data);
      this.data = data;
      for (let i = 0; i < data.files.length; i++) {
        let dataFile = data.files[i];

        let file = files
          .filter(item => {
            return item.name === dataFile.name;
          }).getFirst();
        if (!file) {
          continue;
        }
        if (dataFile.loadSize !== file.size) {
          errorsFiles.push(file);
          errors += file.name + "\n";
        } else {
          let item = {
            name: file.name,
            type: file.type
          };
          switch (file.type) {
            case constants.PNG_MIME_TYPE:
            case constants.JPEG_MIME_TYPE: {
              item.body = this.byteArrayToBase64(file.byteArray, file.type);
              break;
            }
            case constants.WEBM_MIME_TYPE:
            case constants.MP4_MIME_TYPE: {
              item.body = require("~/assets/images/icons/foto-kamera-varialt-1.svg");
              break;
            }
            case constants.PDF_MIME_TYPE: {
              item.body = require("~/assets/images/icons/dokument-pdf.svg");
              break;
            }
            case constants.PGP_SIGNATURE_MIME_TYPE: {
              item.body = require("~/assets/images/icons/dokument-digital.svg");
              break;
            }
            case constants.DOCX_MIME_TYPE: {
              item.body = require("~/assets/images/icons/dokument-docx.svg");
              break;
            }
          }
          this.filesArray.push(item);
        }
      }
      if (errorsFiles.length > 0) {
        let answer = confirm(
          `Не удалось загрузить файлы:\n${errors}Повторить отправку?`
        );
        if (answer) {
          this.sendRepeatFiles(errorsFiles);
        }
      } else {
        this.$Notice.warning({
          title: "Файлы загружены",
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
      input.type = "file";
      if (withClearError === true) {
        this.fileError = null;
      }
    },
    removeItem(item, index) {
      this.filesArray.splice(index, 1);
      this.data.files.splice(
        this.data.files.indexOf(
          this.data.files.find(el => el.name === item.name)
        ),
        1
      );
      RequestApi.prepareData({
        method: "invokeElementMethod",
        params: {
          eCID: this.info.eCID,
          methodName: "removeFile",
          data: JSON.stringify({
            fileName: item.name
          })
        }
      });
    },
    async storeElementData() {
      return new Promise((resolve, reject) => {
        this.$emit("storeElementData", {
          eCID: this.info.eCID,
          data: this.data,
          resolve: resolve
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 290px;
  grid-gap: 15px;
  &.empty {
    justify-content: center;
    grid-template-columns: 290px;
  }
}
.add-item-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed #cccccc;
  border-radius: 4px;
  color: #808080;

  .text {
    font-weight: 600;
    &.small {
      color: #cccccc;
      font-style: italic;
      margin: 5px 0;
    }
  }
  label {
    background: #1888cc;
    padding: 5px 40px;
    color: #ffffff;
    cursor: pointer;
    input {
      display: none;
    }
  }
}
.item {
  height: 100%;
  background: #fff;
  padding: 30px;
  position: relative;
  .remove {
    position: absolute;
    top: 0;
    right: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  .item-preview {
    height: 70%;
    width: 100%;
    margin-bottom: 30px;
    img {
      max-width: 100%;
      max-height: 100%;
      display: block;
      margin: 0 auto;
      height: 100%;
    }
  }
  .file-name {
    text-align: center;
  }
}
</style>
