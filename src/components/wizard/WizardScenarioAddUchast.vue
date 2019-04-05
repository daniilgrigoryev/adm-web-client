<template>
  <div class="create-prosecution">
    <aside>
      <h3>Список подразделов</h3>
      <ul>
        <li v-for="item in listSectionNav" :key="item.id">
          <a :href="'#' + item.name">{{item.title}}</a>
        </li>
      </ul>
    </aside>
    <main>
      <div class="layout-wrap">
        <Layout ref="Main" class="layout">
          <div class="adm-form">
            <wizard-item-add-uchast v-if="isVisible('Uchast')" ref="DocProtFirst" :info="getInfo('Uchast')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-add-uchast>
            <wizard-item-individual v-if="isVisible('Uchast.Individual')" ref="Uchast.Individual" :info="getInfo('Uchast.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
            <wizard-item-address v-if="isVisible('Uchast.Individual.regAddr')" ref="Uchast.Individual.regAddr" :info="getInfo('Uchast.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            <wizard-item-organization v-if="isVisible('Uchast.Organization')" ref="Uchast.Organization" :info="getInfo('Uchast.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
            <wizard-item-address v-if="isVisible('Uchast.Organization.regAddr')" ref="Uchast.Organization.regAddr" :info="getInfo('Uchast.Organization.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
          </div>
        </Layout>
      </div>
      <div class="bot-wrap">
        <Button @click="getPrev" type="text">Отменить возбуждение дела</Button>
        <Button @click="save" type="primary" class="ml12">Возбудить</Button>
      </div>
    </main>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import WizardItemAddUchast from "~/components/wizard/items/WizardItemAddUchast";
  import WizardItemAddress from "~/components/wizard/items/WizardItemAddress";
  import WizardItemIndividual from "~/components/wizard/items/WizardItemIndividual";
  import WizardItemOrganization from "~/components/wizard/items/WizardItemOrganization";

  export default {
    name: "WizardScenarioAddUchast",
    props: {
      pathes: Object
    },
    components: {
      WizardItemAddUchast,
      WizardItemAddress,
      WizardItemIndividual,
      WizardItemOrganization
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
      storeElementData(params) {
        this.$emit('storeElementData', params);
      },
      updateComponents(cids) {
        this.$emit('updateComponents', cids);
      },
      async save() {
        let eventResponse = await RequestApi.prepareData({
          method: 'make'
        });
        let resp =  JSON.parse(eventResponse.response);
        if (resp.error && resp.error.errorMsg) {
          alert(resp.error.errorMsg);
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
          alert(e.message);
        }
      },
    }
  }
</script>

<style scoped>

</style>
