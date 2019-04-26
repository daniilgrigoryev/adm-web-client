<template>
  <div>
    <component v-if="scenario" :is="currentTabComponent.name" :ref="currentTabComponent.ref" :pathes="pathes" @storeElementData="storeElementData" @updateComponents="updateComponents"></component>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardExecuter",
    components: {
      WizardScenario2025: () => import('~/components/wizard/WizardScenario2025'),
      WizardScenarioPost: () => import('~/components/wizard/WizardScenarioPost'),
      WizardScenarioProtAPN: () => import('~/components/wizard/WizardScenarioProtAPN'),
      WizardScenarioProtEvac: () => import('~/components/wizard/WizardScenarioProtEvac'),
      WizardScenarioDefinition: () => import('~/components/wizard/WizardScenarioDefinition'),
      WizardScenarioAddPredDoc: () => import('~/components/wizard/WizardScenarioAddPredDoc'),
      WizardScenarioAddIspoln: () => import('~/components/wizard/WizardScenarioAddIspoln'),
      WizardScenarioAddDocPhoto: () => import('~/components/wizard/WizardScenarioAddDocPhoto'),
      WizardScenarioProtIzyat: () => import('~/components/wizard/WizardScenarioProtIzyat'),
      WizardScenarioAddUchast: () => import('~/components/wizard/WizardScenarioAddUchast'),
      WizardScenarioProtTaxi: () => import('~/components/wizard/WizardScenarioProtTaxi'),
      WizardScenarioDefinitionTaxi: () => import('~/components/wizard/WizardScenarioDefinitionTaxi'),
      WizardScenarioPostStopDelo: () => import('~/components/wizard/WizardScenarioPostStopDelo')
    },
    async created() {
      try {
        let prepareParams = {
          method: 'restore'
        };
        if (funcUtils.isNotEmpty(this.$route.params.scenarioName)) {
          prepareParams.method = 'loadScenarioWithNodeNewDelo';
          prepareParams.params = {
            'name': this.$route.params.scenarioName,
            'node': this.$route.params.node || null,
            'newDelo': this.$route.params.newDelo ? this.$route.params.newDelo : funcUtils.isEmpty(this.$route.params.node)
          };
        }

        let eventResponse = await RequestApi.prepareData(prepareParams);
        let cids = Object.keys(JSON.parse(eventResponse.response).data);

        let parentNode = null;
        eventResponse = await RequestApi.prepareData({
          method: 'getParentNode',
        });
        if (eventResponse.response) {
          parentNode = JSON.parse(eventResponse.response).data;
        }

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
          info[cid].parentNode = parentNode;
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
    computed: {
      currentTabComponent() {
        let res = null;
        switch (this.scenario) {
          case 'CreateProtStopDelo': {
            res = {
              name: 'WizardScenarioPostStopDelo'
            };
            break;
          }
          case 'CreatePost': {
            res = {
              name: 'WizardScenarioPost'
            };
            break;
          }
          case 'CreateProt2025': {
            res = {
              name: 'WizardScenario2025'
            };
            break;
          }
          case 'CreateProtEvac': {
            res = {
              name: 'WizardScenarioProtEvac',
              ref: 'CreateProtEvac'
            };
            break;
          }
          case 'CreateProtAPN': {
            res = {
              name: 'WizardScenarioProtAPN'
            };
            break;
          }
          case 'AddUchast': {
            res = {
              name: 'WizardScenarioAddUchast'
            };
            break;
          }
          case 'CreateDefinition': {
            res = {
              name: 'WizardScenarioDefinition'
            };
            break;
          }
          case 'AddPredDoc': {
            res = {
              name: 'WizardScenarioAddPredDoc'
            };
            break;
          }
          case 'AddDocPhoto': {
            res = {
              name: 'WizardScenarioAddDocPhoto'
            };
            break;
          }
          case 'AddIspoln': {
            res = {
              name: 'WizardScenarioAddIspoln'
            };
            break;
          }
          case 'CreateProtIzyat': {
            res = {
              name: 'WizardScenarioProtIzyat'
            };
            break;
          }
          case 'CreateProtTaxi': {
            res = {
              name: 'WizardScenarioProtTaxi'
            };
            break;
          }
          case 'CreateDefinitionTaxi': {
            res = {
              name: 'WizardScenarioDefinitionTaxi'
            };
            break;
          }
        }
        res.ref = this.scenario;
        return res;
      }
    },
    methods: {
      async storeElementData(params) {
        let eventResponse = await RequestApi.prepareData({
          method: 'storeElementData',
          params: {
            eCID: params.eCID,
            data: JSON.stringify(params.data, funcUtils.undefinedJSONreplacer)
          }
        });
        let cids = JSON.parse(eventResponse.response).data;
        if (funcUtils.isEmpty(cids)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
          eventResponse = await RequestApi.prepareData({
            method: 'getChain'
          });
          cids = JSON.parse(eventResponse.response).data;
        }
        await this.updateComponents(cids);
        if (params.resolve) {
          params.resolve();
        }
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
              let parentNode = null;
              let eventResponse = await RequestApi.prepareData({
                method: 'getParentNode',
              });
              if (eventResponse.response) {
                parentNode = JSON.parse(eventResponse.response).data;
              }
              info.eCID = cid;
              info.parentNode = parentNode;
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
