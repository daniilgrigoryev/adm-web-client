<template>
  <aside-template :listSectionNav="listSectionNav">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <wizard-item-doc-prot2025 id="DocProt" v-if="isVisible('DocProt')" ref="DocProt" :info="getInfo('DocProt')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-doc-prot2025>
          <wizard-item-place v-if="isVisible('DocProt.PlaceSost')" ref="DocProt.PlaceSost" :info="getInfo('DocProt.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
          <wizard-item-lvok2025 v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-lvok2025>
          <wizard-item-pred-doc v-if="isVisible('LVOK.PredDoc')" ref="LVOK.PredDoc" :info="getInfo('LVOK.PredDoc')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pred-doc>
          <wizard-item-address  id="LVOK.regAddr" v-if="isVisible('LVOK.regAddr')" ref="LVOK.regAddr" :info="getInfo('LVOK.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
          <wizard-item-individual v-if="isVisible('Repres')" ref="Repres" :info="getInfo('Repres')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
          <wizard-item-address  id="Repres.regAddr" v-if="isVisible('Repres.regAddr')" ref="Repres.regAddr" :info="getInfo('Repres.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
        </div>
      </Layout>
    </div>
    <div class="bot-wrap">
      <Button @click="getPrev" type="text">Отменить возбуждение дела</Button>
      <Button @click="save" type="primary" class="ml12">Возбудить</Button>
    </div>
  </aside-template>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardScenario2025",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardItemDocProt2025: () => import('~/components/wizard/items/WizardItemDocProt2025'),
      WizardItemLvok2025: () => import('~/components/wizard/items/WizardItemLvok2025'),
      WizardItemAddress: () => import('~/components/wizard/items/WizardItemAddress'),
      WizardItemIndividual: () => import('~/components/wizard/items/WizardItemIndividual'),
      WizardItemPlace: () => import('~/components/wizard/items/WizardItemPlace'),
      WizardItemPredDoc: () => import('~/components/wizard/items/WizardItemPredDoc'),
    },
    data() {
      return {
        listSectionNav: [
          {
            title: "Переход на секцию",
            name: "DocProt",
          },
          {
            title: "Переход на секцию",
            name: "LVOK.regAddr",
          },
          {
            title: "Переход на секцию",
            name: "Repres.regAddr",
          },
        ]
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
        await this.$emit('storeElementData', params);
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
          this.$store.dispatch('errors/changeContent', {title: resp.error.errorMsg,});
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
          this.$store.dispatch('errors/changeContent', {title: e.message.error,});
        }
      },
    }
  }
</script>

<style scoped>

</style>
