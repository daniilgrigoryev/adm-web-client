<template>
    <div>
      <wizard-scenario-post v-if="isVisible('CreatePost')" ref="CreatePost" :pathes="pathes" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-scenario-post>

      <wizard-scenario2025 v-if="isVisible('CreateProt2025')" ref="CreateProt2025" :pathes="pathes" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-scenario2025>
    </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import RequestApi from "../../assets/js/api/requestApi";
  import WizardScenario2025 from "~/components/wizard/WizardScenario2025";
  import WizardScenarioPost from "~/components/wizard/WizardScenarioPost";
  import WizardScenarioProtPZTC from "~/components/wizard/WizardScenarioProtPZTC";

  export default {
    name: "WizardExecuter",
    components: {
      WizardScenario2025,
      WizardScenarioPost,
      WizardScenarioProtPZTC,
    },
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
        let cids = Object.keys(JSON.parse(eventResponse.response).data);
        let info = {};
        for (let i = 0; i < cids.length; i++) {
          let cid = cids[i];
          eventResponse = await RequestApi.prepareData({
            method: 'getElementInfo',
            params: {
              eCID: cid
            }
          });
          info[cid] = JSON.parse(eventResponse.response).data;
        }
        let pathes = {};
        for (let prop in info) {
          if (info.hasOwnProperty(prop)) {
            let data = info[prop];
            data.eCID = prop;
            pathes[data.path] = data;
          }
        }
        this.pathes = pathes;

        eventResponse = await RequestApi.prepareData({
          method: 'getScenarioName',
        });
        let scenarioName = JSON.parse(eventResponse.response).data;
        this.scenario = scenarioName;
      } catch (e) {
        alert(e.message);
      }
    },
    data() {
      return {
        pathes: null,
        scenario: null
      }
    },
    methods: {
      isVisible(scenario) {
        return this.scenario === scenario;
      },
      async storeElementData(params) {
        let eventResponse = await RequestApi.prepareData({
          method: 'storeElementData',
          params: {
            eCID: params.eCID,
            data: JSON.stringify(params.data, funcUtils.replacer)
          },
          withSpinner: false
        });
        let cids = JSON.parse(eventResponse.response).data;
        if (funcUtils.isEmpty(cids)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
          eventResponse = await RequestApi.prepareData({
            method: 'getChain',
            withSpinner: false
          });
          cids = JSON.parse(eventResponse.response).data;
        }
        await this.updateComponents(cids);
      },
      async updateComponents(cids) {
        let cidsKeySet = Object.keys(cids);
        for (let i = 0; i < cidsKeySet.length; i++) {
          let cid = cidsKeySet[i];
          let prop = cids[cid];
          let child = this.getChild(cid);
          if (child && funcUtils.isEmpty(prop)) {
            delete this.pathes[child.info.path];
            this.$refs[this.scenario].$forceUpdate();
          } else if (child && funcUtils.isNotEmpty(prop)) {
            child.initData();
          } else if (!child && funcUtils.isNotEmpty(prop)) {
            let eventResponse = await RequestApi.prepareData({
              method: 'getElementInfo',
              params: {
                eCID: cid
              }
            });
            let info = JSON.parse(eventResponse.response).data;
            if (funcUtils.isEmpty(this.pathes[info.path])) {
              info.eCID = cid;
              this.pathes[info.path] = info;
              this.$refs[this.scenario].$forceUpdate();
            }
          }
        }
      },
      getChild(cid) {
        let res = null;
        let children = this.pathes;
        for (let prop in children) {
          if (children.hasOwnProperty(prop)) {
            let child = children[prop];
            if (child.eCID === cid) {
              return this.$refs[this.scenario].$refs[child.path];
            }
          }
        }
        return res;
      },
    },
  }
</script>

<style scoped>

</style>
