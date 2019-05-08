import * as funcUtils from "~/assets/js/utils/funcUtils";
import RequestApi from "~/assets/js/api/requestApi";

export default {
  data() {
    return {}
  },
  methods: {
    async createProtNum() {
      let eventResponse = await RequestApi.prepareData({
        method: 'invokeElementMethod',
        params: {
          eCID: this.info.eCID,
          methodName: 'createProtNum',
          data: null
        }
      });
      let data = JSON.parse(JSON.parse(eventResponse.response).data);
      if (funcUtils.isEmpty(data)) {
        let error = JSON.parse(eventResponse.response).error;
        this.$store.dispatch('errors/changeContent', {title: error.errorMsg,});
      } else {
        this.data = data;
      }
    },
    async createNewDeloNum() {
      let eventResponse = await RequestApi.prepareData({
        method: 'invokeElementMethod',
        params: {
          eCID: this.info.eCID,
          methodName: 'createDeloNum',
          data: null
        }
      });
      let data = JSON.parse(JSON.parse(eventResponse.response).data);
      if (funcUtils.isEmpty(data)) {
        let error = JSON.parse(eventResponse.response).error;
        this.$store.dispatch('errors/changeContent', {title: error.errorMsg,});
      } else {
        this.data = data;
      }
    },
  }
}
