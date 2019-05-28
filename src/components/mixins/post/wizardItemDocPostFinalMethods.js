import * as funcUtils from "~/assets/js/utils/funcUtils";
import RequestApi from "~/assets/js/api/requestApi";

export default {
  data() {},
  methods: {
    async calcDateVstup() {
      let eventResponse = await RequestApi.prepareData({
        method: 'invokeElementMethod',
        params: {
          eCID: this.info.eCID,
          methodName: 'calcDateVstup',
          data: null
        }
      });
      let dateVstup = JSON.parse(JSON.parse(eventResponse.response).data);
      if (dateVstup) {
        this.data.dateVstup = dateVstup;
      }
    },
  }
}
