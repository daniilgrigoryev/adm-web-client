<template>
  <aside-template :listSectionNav="listSectionNav" title="ЭЦП" v-if="signature">

    <div class="adm-form">
      <div class="adm-form__container">
        <CustomSelect class="adm-input adm-input--regular wmax360 wmin180" placeholder="" v-model="sertificateNumber" clearable filterable @on-open-change="openSings">
          <Option class="wmax360 " v-for="item in signList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </CustomSelect>
        <Button @click="signData" type="primary" class="ml12">Подписать</Button>
      </div>
    </div>

    <div class="bot-wrap">
      <Button @click="getPrev" type="text">Отменить изменения</Button>
      <Button @click="save" type="primary" class="ml12">Сохранить</Button>
    </div>
  </aside-template>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import 'crypto-pro';

  export default {
    name: "FrmSignatureEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmSignatureEditSetCid', current.cid);
        let prepareParams = {
          method: 'restore'
        };
        if (funcUtils.isNotEmpty(this.$route.params.docCID)) {
          prepareParams.method = 'getData';
          prepareParams.params = {
            'docCID': this.$route.params.docCID
          };
        }
        let eventResponse = await RequestApi.prepareData(prepareParams);
        let signature = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(signature)) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          this.signature = signature;
        }
      } catch (e) {
        this.$store.dispatch('errors/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmSignatureEditSetCid', null);
      this.$store.dispatch('frmSignatureEditSetData', null);
    },
    data() {
      return {
        signature: null,
        listSectionNav: [],
        signList: [],
        sertificateObj: {},
        sertificateNumber: null,
        sign: null,
      }
    },
    methods: {
      async fillSignList() {
        try {
          let signList = await this.getSignList();
          let sName = signList['SubjectName'];
          let sNumber = signList['SerialNumber'];
          let vFromDate = signList['ValidFromDate'];
          let vToDate = signList['ValidToDate'];

          let nameSplit = sName.split(";");
          let numberSplit = sNumber.split(";");
          let fDateSplit = vFromDate.split(";");
          let tDateSplit = vToDate.split(";");

          this.signList = [];
          for (let i = 0; i < nameSplit.length; i++) {
            if (numberSplit[i].length > 0) {
              this.signList.push({
                label: nameSplit[i] + "; " + numberSplit[i] + "; " + fDateSplit[i] + "; " + tDateSplit[i],
                value: numberSplit[i]
              });
              this.sertificateObj[numberSplit[i]] = {
                IssuerName: '',
                SubjectName: nameSplit[i],
                SerialNumber: numberSplit[i],
                ValidFromDate: fDateSplit[i],
                ValidToDate: tDateSplit[i]
              }
            }
          }
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e,});
        }
      },
      getSignList() {
        let CADESCOM_CADES_BES = 1;
        let CAPICOM_CURRENT_USER_STORE = 2;
        let CAPICOM_MY_STORE = "My";
        let CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
        let CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;

        return new Promise(function (resolve, reject) {
          cadesplugin.async_spawn(function* (args) {
            try {
              let oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
              yield oStore.Open(CAPICOM_CURRENT_USER_STORE, CAPICOM_MY_STORE,
                CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

              let CertificatesObj = yield oStore.Certificates;

              let cnt = yield CertificatesObj.Count;
              let res = {};
              res.SubjectName = '';
              res.SerialNumber = '';
              res.ValidFromDate = '';
              res.ValidToDate = '';
              for (let i = 1; i <= cnt; i++) {
                let oCertificates = yield CertificatesObj.Item(i);
                let name = yield oCertificates.SubjectName;
                name = name.replace(new RegExp("\\n", 'g'), ',');
                res.SubjectName = res.SubjectName + ';' + name;
                let num = yield oCertificates.SerialNumber;
                res.SerialNumber = res.SerialNumber + ';' + num;
                let fdate = yield oCertificates.ValidFromDate;
                res.ValidFromDate = res.ValidFromDate + ';' + fdate;
                let tdate = yield oCertificates.ValidToDate;
                res.ValidToDate = res.ValidToDate + ';' + tdate;
              }

              yield oStore.Close();

              args[0](res);
            } catch (e) {
              args[1]("Failed to create signature. Error: " + cadesplugin.getLastError(e));
            }
          }, resolve, reject);
        });
      },
      async signData() {
        try {
          let dataToSign = window.btoa(unescape(encodeURIComponent(this.signature.sourceData)));
          let sign = await this.signCreate(this.sertificateNumber, dataToSign);
          if (sign) {
            this.$store.dispatch('errors/changeContent', {title: 'Успешно'});
            this.sertificateObj[this.sertificateNumber].IssuerName = sign.IssuerName;
            this.signature.signDataBase64 = sign.Message;
            this.signature.certSerialNumber = sign.SerialNumber;
            this.signature.certSubject = sign.SubjectName;
            this.signature.certIssuer = sign.IssuerName;
            this.signature.certValidFrom = sign.ValidFromDate;
            this.signature.certValidTo = sign.ValidToDate;
            this.store();
          }
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e, desc: e,});
        }
      },
      signCreate(certSerialNumber, dataToSign) {
        let CADESCOM_CADES_BES = 1;
        let CAPICOM_CURRENT_USER_STORE = 2;
        let CAPICOM_MY_STORE = "My";
        let CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
        let CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;

        return new Promise(function (resolve, reject) {
          cadesplugin.async_spawn(function* (args) {
            try {
              let oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
              yield oStore.Open(CAPICOM_CURRENT_USER_STORE, CAPICOM_MY_STORE,
                CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

              let CertificatesObj = yield oStore.Certificates;
              let oCertificate = {};
              let cnt = yield CertificatesObj.Count;
              for (let i = 1; i <= cnt; i++) {
                let vCertificate = yield CertificatesObj.Item(i);
                let num = yield vCertificate.SerialNumber;
                if (certSerialNumber == num) {
                  oCertificate = vCertificate;
                  break;
                }
              }

              let oSigner = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
              yield oSigner.propset_Certificate(oCertificate);

              let oSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
              yield oSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
              yield oSignedData.propset_Content(dataToSign);

              let resObj = {};

              let sSignedMessage = yield oSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES, true);

              resObj.Message = sSignedMessage;
              resObj.SubjectName = yield oCertificate.SubjectName;
              resObj.SerialNumber = yield oCertificate.SerialNumber;
              resObj.IssuerName = yield oCertificate.IssuerName;
              resObj.ValidFromDate = yield oCertificate.ValidFromDate;
              resObj.ValidToDate = yield oCertificate.ValidToDate;

              yield oStore.Close();

              args[2](resObj);
            } catch (e) {
              args[3]("Failed to create signature. Error: " + cadesplugin.getLastError(e));
            }
          }, certSerialNumber, dataToSign, resolve, reject);
        });
      },
      openSings(opened) {
        if (opened && this.signList.length === 0) {
          this.fillSignList();
        }
      },
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.signature
          }
        });
      },
      async save() {
        let eventResponse = await RequestApi.prepareData({
          method: 'save'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          this.getPrev();
        }
      },
      getPrev() {
        try {
          formStack.toPrev({
            vm: this
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
    },
  }
</script>


<style scoped lang="scss">
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 12px;
    // outline: 1px solid red;
    padding-bottom: 12px;
    // min-height: 90px;
  }
  .adm-form__label{
    padding: 0;
    padding-right: 12px;
    min-width: 210px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
