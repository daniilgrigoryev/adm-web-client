<template>
  <!-- Форма возбуждения дела Определением об административном правонарушении -->
  <aside-template :listSectionNav="listSectionNav" title="Определение об АПН">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">
              Форма возбуждения дела Определением об административном правонарушении
            </h2>
            <div class="adm-form__content">
              <wizard-item-definition-one  id="DocDefinitionOne" v-if="isVisible('DocDefinitionOne')" ref="DocDefinitionOne" :info="getInfo('DocDefinitionOne')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-definition-one>
              <wizard-item-place v-if="isVisible('DocDefinitionOne.PlaceSost')" ref="DocDefinitionOne.PlaceSost" :info="getInfo('DocDefinitionOne.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              <wizard-item-prot-two id="DocDefinitionTwo" v-if="isVisible('DocDefinitionTwo')" ref="DocDefinitionTwo" :info="getInfo('DocDefinitionTwo')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-two>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 class="adm-form__headding">ЛВОК</h2>
            <div class="adm-form__content">
              <wizard-item-lvok id="LVOK" v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-lvok>
              <wizard-item-pred-doc v-if="isVisible('LVOK.PredDoc')" ref="LVOK.PredDoc" :info="getInfo('LVOK.PredDoc')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pred-doc>
              <wizard-item-individual v-if="isVisible('LVOK.Individual')" ref="LVOK.Individual" :info="getInfo('LVOK.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('LVOK.Individual.regAddr')" ref="LVOK.Individual.regAddr" :info="getInfo('LVOK.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('LVOK.Individual.factAddr')" ref="LVOK.Individual.factAddr" :info="getInfo('LVOK.Individual.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-organization v-if="isVisible('LVOK.Organization')" ref="LVOK.Organization" :info="getInfo('LVOK.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
              <wizard-item-address v-if="isVisible('LVOK.Organization.regAddr')" ref="LVOK.Organization.regAddr" :info="getInfo('LVOK.Organization.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('LVOK.Organization.factAddr')" ref="LVOK.Organization.factAddr" :info="getInfo('LVOK.Organization.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
          </div>
          <wizard-item-vehs id="Vehs" v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs>
          <div class="adm-form__container">
            <div class="adm-form__content"  v-if="isVisible('Owner')">
              <wizard-item-owner v-if="isVisible('Owner')" ref="Owner" :info="getInfo('Owner')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-owner>
              <wizard-item-individual id="Owner.Individual" v-if="isVisible('Owner.Individual')" ref="Owner.Individual" :info="getInfo('Owner.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('Owner.Individual.regAddr')" ref="Owner.Individual.regAddr" :info="getInfo('Owner.Individual.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('Owner.Individual.factAddr')" ref="Owner.Individual.factAddr" :info="getInfo('Owner.Individual.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-organization v-if="isVisible('Owner.Organization')" ref="Owner.Organization" :info="getInfo('Owner.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
              <wizard-item-address v-if="isVisible('Owner.Organization.regAddr')" ref="Owner.Organization.regAddr" :info="getInfo('Owner.Organization.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('Owner.Organization.factAddr')" ref="Owner.Organization.factAddr" :info="getInfo('Owner.Organization.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
            <div class="adm-form__container">
              <h2 id="nar" class="adm-form__headding">Сведения о нарушении</h2>
              <div class="adm-form__content">
                <wizard-item-prot-three id="DocDefinitionThree" v-if="isVisible('DocDefinitionThree')" ref="DocDefinitionThree" :info="getInfo('DocDefinitionThree')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-three>
                <wizard-item-place v-if="isVisible('DocDefinitionThree.PlaceNar')" ref="DocDefinitionThree.PlaceNar" :info="getInfo('DocDefinitionThree.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
                <wizard-item-prot-four id="DocDefinitionFour" v-if="isVisible('DocDefinitionFour')" ref="DocDefinitionFour" :info="getInfo('DocDefinitionFour')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-four>
                <wizard-item-definition-five id="definition" v-if="isVisible('DocDefinitionFive')" ref="DocDefinitionFive" :info="getInfo('DocDefinitionFive')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-definition-five>
              </div>
            </div>
          </div>
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
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import AsideTemplate from "~/components/templates/AsideTemplate.vue";
  import WizardItemDefinitionOne from "./items/definition/WizardItemDefinitionOne.vue";
  import WizardItemProtTwo from "./items/WizardItemProtTwo.vue";
  import WizardItemProtThree from "./items/WizardItemProtThree.vue";
  import WizardItemProtFour from "./items/WizardItemProtFour.vue";
  import WizardItemDefinitionFive from "./items/definition/WizardItemDefinitionFive.vue";
  import WizardItemAddress from "./items/WizardItemAddress.vue";
  import WizardItemIndividual from "./items/WizardItemIndividual.vue";
  import WizardItemLvok from "./items/WizardItemLvok.vue";
  import WizardItemOrganization from "./items/WizardItemOrganization.vue";
  import WizardItemOwner from "./items/WizardItemOwner.vue";
  import WizardItemPlace from "./items/WizardItemPlace.vue";
  import WizardItemPredDoc from "./items/WizardItemPredDoc.vue";
  import WizardItemVehs from "./items/WizardItemVehs.vue";

  export default {
    name: "WizardScenarioDefinition",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate,
      WizardItemDefinitionOne,
      WizardItemProtTwo,
      WizardItemProtThree,
      WizardItemProtFour,
      WizardItemDefinitionFive,
      WizardItemAddress,
      WizardItemIndividual,
      WizardItemLvok,
      WizardItemOrganization,
      WizardItemOwner,
      WizardItemPlace,
      WizardItemPredDoc,
      WizardItemVehs
    },
    data() {
      return {
        listSectionNav: [
          {
            title: "Ввод данных по определению",
            name: "head",
          },
          {
            title: "ЛВОК",
            name: "head",
          },
          {
            title: "Транспортное средство",
            name: "Vehs",
          },
          {
            title: "Сведения о нарушении",
            name: "nar"
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
