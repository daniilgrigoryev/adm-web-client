<template>
  <div>
    <button type="button" @click="getPrev">Назад</button>

    <div>
      <wizard-item-doc-post-first v-if="isVisible('DocPostFirst')" :info="getInfo('DocPostFirst')"></wizard-item-doc-post-first>

        <wizard-item-place v-if="isVisible('DocPostFirst.PlaceSost')" :info="getInfo('DocPostFirst.PlaceSost')"></wizard-item-place>

      <wizard-item-lvok v-if="isVisible('LVOK')" :info="getInfo('LVOK')"></wizard-item-lvok>

        <wizard-item-pred-doc v-if="isVisible('LVOK.PredDoc')" :info="getInfo('LVOK.PredDoc')"></wizard-item-pred-doc>

        <wizard-item-individual v-if="isVisible('LVOK.Individual')" :info="getInfo('LVOK.Individual')"></wizard-item-individual>

          <wizard-item-address v-if="isVisible('LVOK.Individual.regAddr')" :info="getInfo('LVOK.Individual.regAddr')"></wizard-item-address>

          <wizard-item-address v-if="isVisible('LVOK.Individual.factAddr')" :info="getInfo('LVOK.Individual.factAddr')"></wizard-item-address>

        <wizard-item-organization v-if="isVisible('LVOK.Organization')" :info="getInfo('LVOK.Organization')"></wizard-item-organization>

          <wizard-item-address v-if="isVisible('LVOK.Organization.regAddr')" :info="getInfo('LVOK.Organization.regAddr')"></wizard-item-address>

          <wizard-item-address v-if="isVisible('LVOK.Organization.factAddr')" :info="getInfo('LVOK.Organization.factAddr')"></wizard-item-address>

      <wizard-item-vehs v-if="isVisible('Vehs')" :info="getInfo('Vehs')"></wizard-item-vehs>

      <wizard-item-owner v-if="isVisible('Owner')" :info="getInfo('Owner')"></wizard-item-owner>

        <wizard-item-individual v-if="isVisible('Owner.Individual')" :info="getInfo('Owner.Individual')"></wizard-item-individual>

          <wizard-item-address v-if="isVisible('Owner.Individual.regAddr')" :info="getInfo('Owner.Individual.regAddr')"></wizard-item-address>

          <wizard-item-address v-if="isVisible('Owner.Individual.factAddr')" :info="getInfo('Owner.Individual.factAddr')"></wizard-item-address>

        <wizard-item-organization v-if="isVisible('Owner.Organization')" :info="getInfo('Owner.Organization')"></wizard-item-organization>

          <wizard-item-address v-if="isVisible('Owner.Organization.regAddr')" :info="getInfo('Owner.Organization.regAddr')"></wizard-item-address>

          <wizard-item-address v-if="isVisible('Owner.Organization.factAddr')" :info="getInfo('Owner.Organization.factAddr')"></wizard-item-address>

      <wizard-item-doc-post-second v-if="isVisible('DocPostSecond')" :info="getInfo('DocPostSecond')"></wizard-item-doc-post-second>

        <wizard-item-place v-if="isVisible('DocPostSecond.PlaceNar')" :info="getInfo('DocPostSecond.PlaceNar')"></wizard-item-place>

      <wizard-item-decis v-if="isVisible('DecisMain')" :info="getInfo('DecisMain')"></wizard-item-decis>

      <wizard-item-decis v-if="isVisible('DecisAdd')" :info="getInfo('DecisAdd')"></wizard-item-decis>

      <wizard-item-doc-post-final v-if="isVisible('DocPostFinal')" :info="getInfo('DocPostFinal')"></wizard-item-doc-post-final>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import WizardItemAddress from "~/components/wizard/items/WizardItemAddress";
  import WizardItemDecis from "~/components/wizard/items/WizardItemDecis";
  import WizardItemDocPostFinal from "~/components/wizard/items/WizardItemDocPostFinal";
  import WizardItemDocPostFirst from "~/components/wizard/items/WizardItemDocPostFirst";
  import WizardItemDocPostSecond from "~/components/wizard/items/WizardItemDocPostSecond";
  import WizardItemIndividual from "~/components/wizard/items/WizardItemIndividual";
  import WizardItemLvok from "~/components/wizard/items/WizardItemLvok";
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
      WizardItemIndividual,
      WizardItemLvok,
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
            data.eCID = prop;
            pathes[data.path] = data;
          }
        }
        this.pathes = pathes;
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
      getInfo(path) {
        if (funcUtils.isEmpty(this.pathes)) {
          return false;
        } else {
          return this.pathes[path];
        }
      },
      async storeElementData(params) {
        let eventResponse = await RequestApi.prepareData({
          method: 'getElementData',
          params: {
            eCID: params.eCID,
            data: JSON.stringify(params.data)
          }
        });
        // this.data = JSON.parse(eventResponse.response).data;
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
