<template>
  <div>
    <button type="button" @click="getPrev">Назад</button>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import Stack from '../../assets/js/api/stack';
  import RequestApi from "../../assets/js/api/requestApi";
  export default {
    name: "WizardExecuter",
    async created() {
      try {
        let prepareParams = {
          method: 'restore'
        };
        if (funcUtils.isNotEmpty(this.$route.params.scenarioName)) {
          prepareParams.method = 'loadScenario';
          prepareParams.params = {
            'name': this.$route.params.scenarioName
          };
        }

        let eventResponse = await RequestApi.prepareData(prepareParams);
        /*let cids = Object.keys(JSON.parse(eventResponse.response).data);
        let data = {};
        let info = {};
        for (let i = 0; i < cids.length; i++) {
          let cid = cids[i];
          data[cid] = await RequestApi.prepareData({
            method: 'getElementData',
            params: {
              eCID: cid
            }
          });
          info[cid] = await RequestApi.prepareData({
            method: 'getElementInfo',
            params: {
              eCID: cid
            }
          });
        }
        let responses = [];
        let pathes = {};
        for (let i = 0; i < Object.entries(info).length; i++) {
          let response = JSON.parse(Object.entries(info)[i][1].response);
          responses.push(JSON.parse(response).data);
          pathes[JSON.parse(response).data.path] = Object.entries(info)[i][0];
        }
        debugger;*/
      } catch (e) {
        alert(e.message);
      }
    },
    methods: {
      getPrev() {
        try {
          formStack.toPrev({
            vm: this
          });
        } catch (e) {
          alert(e.message);
        }
      },
    }
  }
</script>

<style scoped>

</style>
