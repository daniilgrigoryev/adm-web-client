<template>
  <div>
    <button type="button" @click="getPrev">Назад</button>

    <div>
      <wizard-item-address v-if="isVisible()"></wizard-item-address>

      <wizard-item-decis></wizard-item-decis>

      <wizard-item-doc-post-final></wizard-item-doc-post-final>

      <wizard-item-doc-post-first></wizard-item-doc-post-first>

      <wizard-item-doc-post-second></wizard-item-doc-post-second>

      <wizard-item-doc-prot2025></wizard-item-doc-prot2025>

      <wizard-item-individual></wizard-item-individual>

      <wizard-item-lvok></wizard-item-lvok>

      <wizard-item-lvok2025></wizard-item-lvok2025>

      <wizard-item-organization></wizard-item-organization>

      <wizard-item-owner></wizard-item-owner>

      <wizard-item-place></wizard-item-place>

      <wizard-item-pred-doc></wizard-item-pred-doc>

      <wizard-item-vehs></wizard-item-vehs>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import Stack from '../../assets/js/api/stack';
  import RequestApi from "../../assets/js/api/requestApi";
  import WizardItemAddress from "~/components/wizard/items/WizardItemAddress";
  import WizardItemDecis from "~/components/wizard/items/WizardItemDecis";
  import WizardItemDocPostFinal from "~/components/wizard/items/WizardItemDocPostFinal";
  import WizardItemDocPostFirst from "~/components/wizard/items/WizardItemDocPostFirst";
  import WizardItemDocPostSecond from "~/components/wizard/items/WizardItemDocPostSecond";
  import WizardItemDocProt2025 from "~/components/wizard/items/WizardItemDocProt2025";
  import WizardItemIndividual from "~/components/wizard/items/WizardItemIndividual";
  import WizardItemLvok from "~/components/wizard/items/WizardItemLvok";
  import WizardItemLvok2025 from "~/components/wizard/items/WizardItemLvok2025";
  import WizardItemOrganization from "~/components/wizard/items/WizardItemOrganization";
  import WizardItemOwner from "~/components/wizard/items/WizardItemOwner";
  import WizardItemPlace from "~/components/wizard/items/WizardItemPlace";
  import WizardItemPredDoc from "~/components/wizard/items/WizardItemPredDoc";
  import WizardItemVehs from "~/components/wizard/items/WizardItemVehs";

  export default {
    name: "WizardExecuter",
    components: {
      WizardItemAddress,
      WizardItemDecis,
      WizardItemDocPostFinal,
      WizardItemDocPostFirst,
      WizardItemDocPostSecond,
      WizardItemDocProt2025,
      WizardItemIndividual,
      WizardItemLvok,
      WizardItemLvok2025,
      WizardItemOrganization,
      WizardItemOwner,
      WizardItemPlace,
      WizardItemPredDoc,
      WizardItemVehs
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
            data.eCid = prop;
            pathes[data.path] = data;
          }
        }
        this.pathes = pathes;
        debugger;
      } catch (e) {
        alert(e.message);
      }
    },
    data() {
      return {
        pathes: null
      }
    },
    methods: {
      isVisible(path) {
        if (funcUtils.isEmpty(this.pathes)) {
          return false;
        } else {
          return funcUtils.isNotEmpty(this.pathes[path]);
        }
      },
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
