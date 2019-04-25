import * as funcUtils from "~/assets/js/utils/funcUtils";
import RequestApi from "~/assets/js/api/requestApi";

export default {
  data() {
    return {
      KBKSearchInfoList: null,
      pnpaList: null,
      stotvSearchInfoList: null,
    }
  },
  methods: {
    changeStotvSearchInfo() {
      this.KBKSearchInfoList = null;
      if (funcUtils.isNotEmpty(this.data.stotvId)) {
        this.fillKBKSearchInfo();
      }

      this.storeElementData();
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
      if (KBKSearchInfoAnswer) {
        this.KBKSearchInfoList = KBKSearchInfoAnswer.map(element => {
          return {
            label: element.kbkName,
            value: element.kbk,
            id: element.id + ''
          }
        });
      }
    },
  }
}
