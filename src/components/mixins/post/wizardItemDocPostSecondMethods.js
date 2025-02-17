import * as funcUtils from "~/assets/js/utils/funcUtils";
import RequestApi from "~/assets/js/api/requestApi";

export default {
  data() {
    return {
      KBKSearchInfoList: null,
      pnpaList: null,
      stotvSearchInfoList: null,
      factSvedList: [],
      guiltAdmissionDictionaryList: [],
    }
  },
  methods: {
    async changeStotvSearchInfo() {
      this.KBKSearchInfoList = null;
      this.factSvedList = [];
      if (funcUtils.isNotEmpty(this.data.stotvId)) {
        this.fillKBKSearchInfo();
        this.fillFactSved();
      }
      await this.storeElementData();
    },
    async fillPnpaList() {
      let eventResponse = await RequestApi.prepareData({
        method: 'invokeElementMethod',
        params: {
          eCID: this.info.eCID,
          methodName: 'getPnpaDict',
          data: null
        }
      });
      let pnpaList = [];
      let pnpaDict = JSON.parse(JSON.parse(eventResponse.response).data);
      for (let i = 0; i < pnpaDict.length; i++) {
        let pnpa = pnpaDict[i];
        pnpaList.push({
          label: pnpa.PNPA_NAME,
          value: pnpa.PNPA_KOD,
          id: pnpa.PNPA_ID
        });
      }
      this.pnpaList = pnpaList;
    },
    async fillStotvSearchInfo() {
      let eventResponse = await RequestApi.prepareData({
        method: 'invokeElementMethod',
        params: {
          eCID: this.info.eCID,
          methodName: 'getStotvSearchInfo',
          data: null
        }
      });
      let stotvSearchInfoList = [];
      let stotvSearchInfoDict = JSON.parse(JSON.parse(eventResponse.response).data);
      for (let i = 0; i < stotvSearchInfoDict.length; i++) {
        let stotvSearchInfo = stotvSearchInfoDict[i];
        stotvSearchInfoList.push({
          label: stotvSearchInfo.stotvName,
          value: stotvSearchInfo.stotvKod,
          id: stotvSearchInfo.stotvId
        });
      }
      this.stotvSearchInfoList = stotvSearchInfoList;
    },
    async fillKBKSearchInfo() {
      let eventResponse = await RequestApi.prepareData({
        method: 'invokeElementMethod',
        params: {
          eCID: this.info.eCID,
          methodName: 'getKBKSearchInfo',
          data: JSON.stringify({
            stotvId: this.data.stotvId
          })
        }
      });
      let KBKSearchInfoAnswer = JSON.parse(JSON.parse(eventResponse.response).data);
      if (KBKSearchInfoAnswer && KBKSearchInfoAnswer.length > 0) {
        this.KBKSearchInfoList = KBKSearchInfoAnswer.map(element => {
          return {
            label: element.kbkName,
            value: element.kbk
          }
        });
      }
    },
    async fillGuiltAdmissionDictionary() {
      let eventResponse = await RequestApi.prepareData({
        method: 'invokeElementMethod',
        params: {
          eCID: this.info.eCID,
          methodName: 'getGuiltAdmissionDictionary',
          data: null
        }
      });
      let guiltAdmissionDictionaryList = [];
      let guiltAdmissionDictionaryDict = JSON.parse(JSON.parse(eventResponse.response).data);
      for (let i = 0; i < guiltAdmissionDictionaryDict.length; i++) {
        let guiltAdmissionDictionary = guiltAdmissionDictionaryDict[i];
        guiltAdmissionDictionaryList.push({
          label: guiltAdmissionDictionary.NAME,
          value: guiltAdmissionDictionary.ID
        });
      }
      this.guiltAdmissionDictionaryList = guiltAdmissionDictionaryList;
    },
    async fillFactSved() {
      let eventResponse = await RequestApi.prepareData({
        method: 'invokeElementMethod',
        params: {
          eCID: this.info.eCID,
          methodName: 'getFactSved',
          data: null
        }
      });
      let responseData = JSON.parse(eventResponse.response).data;
      if (responseData.length) {
        this.factSvedList = JSON.parse(responseData);
      }
    },
    filterfactSvedList(value, option) {
      if (funcUtils.isEmpty(value) || funcUtils.isEmpty(option)) {
        return false;
      }
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
  }
}
