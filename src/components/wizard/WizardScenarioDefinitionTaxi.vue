<template>
  <!-- Форма возбуждения дела Определением об административном правонарушении -->
  <aside-template :listSectionNav="listSectionNav" title="Определение об АПН">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">
              Ввод данных по Определению об административном правонарушении
            </h2>
            <div class="adm-form__content">
              <wizard-item-definition-one  id="DocDefinitionTaxiOne" v-if="isVisible('DocDefinitionTaxiOne')" ref="DocDefinitionTaxiOne" :info="getInfo('DocDefinitionTaxiOne')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-definition-one>
              <wizard-item-place v-if="isVisible('DocDefinitionTaxiOne.PlaceSost')" ref="DocDefinitionTaxiOne.PlaceSost" :info="getInfo('DocDefinitionTaxiOne.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              <wizard-item-prot-two id="DocDefinitionTaxiTwo" v-if="isVisible('DocDefinitionTaxiTwo')" ref="DocDefinitionTaxiTwo" :info="getInfo('DocDefinitionTaxiTwo')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-two>
            </div>
          </div>
          <wizard-item-vehs id="Vehs" v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs>
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="Lvok">ЛВОК</h2>
            <div class="adm-form__content">
              <wizard-item-lvok v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-lvok>
              <wizard-item-pred-doc v-if="isVisible('LVOK.PredDoc')" ref="LVOK.PredDoc" :info="getInfo('LVOK.PredDoc')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pred-doc>
              <wizard-item-individual v-if="isVisible('LVOK.Individual')" ref="LVOK.Individual" :info="getInfo('LVOK.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('LVOK.Individual.regAddr')" ref="LVOK.Individual.regAddr" :info="getInfo('LVOK.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('LVOK.Individual.factAddr')" ref="LVOK.Individual.factAddr" :info="getInfo('LVOK.Individual.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-organization v-if="isVisible('LVOK.Organization')" ref="LVOK.Organization" :info="getInfo('LVOK.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
              <wizard-item-address v-if="isVisible('LVOK.Organization.regAddr')" ref="LVOK.Organization.regAddr" :info="getInfo('LVOK.Organization.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('LVOK.Organization.factAddr')" ref="LVOK.Organization.factAddr" :info="getInfo('LVOK.Organization.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
          </div>
          <!--<div class="adm-form__container" v-if="isVisible('Owner')">
            <h2 class="adm-form__headding">Владелец транспортного средства</h2>
            <div class="adm-form__content">
              <wizard-item-owner v-if="isVisible('Owner')" ref="Owner" :info="getInfo('Owner')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-owner>
              <wizard-item-individual id="Owner.Individual" v-if="isVisible('Owner.Individual')" ref="Owner.Individual" :info="getInfo('Owner.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('Owner.Individual.regAddr')" ref="Owner.Individual.regAddr" :info="getInfo('Owner.Individual.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('Owner.Individual.factAddr')" ref="Owner.Individual.factAddr" :info="getInfo('Owner.Individual.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-organization v-if="isVisible('Owner.Organization')" ref="Owner.Organization" :info="getInfo('Owner.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
              <wizard-item-address v-if="isVisible('Owner.Organization.regAddr')" ref="Owner.Organization.regAddr" :info="getInfo('Owner.Organization.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('Owner.Organization.factAddr')" ref="Owner.Organization.factAddr" :info="getInfo('Owner.Organization.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
          </div>-->
          <div class="adm-form__container">
            <h2 id="nar" class="adm-form__headding">Сведения о нарушении</h2>
            <div class="adm-form__content">
              <wizard-item-prot-three id="DocDefinitionTaxiThree" v-if="isVisible('DocDefinitionTaxiThree')" ref="DocDefinitionTaxiThree" :info="getInfo('DocDefinitionTaxiThree')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-three>
              <wizard-item-place v-if="isVisible('DocDefinitionTaxiThree.PlaceNar')" ref="DocDefinitionTaxiThree.PlaceNar" :info="getInfo('DocDefinitionTaxiThree.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              <wizard-item-definition-taxi-four id="DocDefinitionTaxiFour" v-if="isVisible('DocDefinitionTaxiFour')" ref="DocDefinitionTaxiFour" :info="getInfo('DocDefinitionTaxiFour')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-definition-taxi-four>
            </div>
          </div>
          <wizard-item-definition-taxi-four2 id="DocDefinitionTaxiFour" v-if="isVisible('DocDefinitionTaxiFour')" ref="DocDefinitionTaxiFour2" :info="getInfo('DocDefinitionTaxiFour')" @storeElementData="storeElementData" @updateComponents="updateComponents">
            <wizard-item-individual id="DocDefinitionTaxiFour.Individual" v-if="isVisible('DocDefinitionTaxiFour.Individual')" ref="DocDefinitionTaxiFour.Individual" :info="getInfo('DocDefinitionTaxiFour.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
            <wizard-item-address v-if="isVisible('DocDefinitionTaxiFour.Individual.regAddr')" ref="DocDefinitionTaxiFour.Individual.regAddr" :info="getInfo('DocDefinitionTaxiFour.Individual.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            <wizard-item-address v-if="isVisible('DocDefinitionTaxiFour.Individual.factAddr')" ref="DocDefinitionTaxiFour.Individual.factAddr" :info="getInfo('DocDefinitionTaxiFour.Individual.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            <wizard-item-organization v-if="isVisible('DocDefinitionTaxiFour.Organization')" ref="DocDefinitionTaxiFour.Organization" :info="getInfo('DocDefinitionTaxiFour.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
            <wizard-item-address v-if="isVisible('DocDefinitionTaxiFour.Organization.regAddr')" ref="DocDefinitionTaxiFour.Organization.regAddr" :info="getInfo('DocDefinitionTaxiFour.Organization.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            <wizard-item-address v-if="isVisible('DocDefinitionTaxiFour.Organization.factAddr')" ref="DocDefinitionTaxiFour.Organization.factAddr" :info="getInfo('DocDefinitionTaxiFour.Organization.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
          </wizard-item-definition-taxi-four2>
          <div class="adm-form__container">
            <h2 id="definition" class="adm-form__headding">Сведения о рассмотрении</h2>
            <div class="adm-form__content">
              <wizard-item-definition-five v-if="isVisible('DocDefinitionTaxiFive')" ref="DocDefinitionTaxiFive" :info="getInfo('DocDefinitionTaxiFive')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-definition-five>
            </div>
          </div>
        </div>
      </Layout>
    </div>
    <div class="bot-wrap">
      <Button @click="getPrev" type="text">Отменить изменения</Button>
      <Button @click="save" type="primary" class="ml12">Сохранить</Button>
    </div>
  </aside-template>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardScenarioDefinitionTaxi",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardItemDefinitionOne: () => import('~/components/wizard/items/definition/WizardItemDefinitionOne'),
      WizardItemProtTwo: () => import('~/components/wizard/items/WizardItemProtTwo'),
      WizardItemProtThree: () => import('~/components/wizard/items/WizardItemProtThree'),
      WizardItemDefinitionTaxiFour: () => import('~/components/wizard/items/definitionTaxi/WizardItemDefinitionTaxiFour'),
      WizardItemDefinitionTaxiFour2: () => import('~/components/wizard/items/definitionTaxi/WizardItemDefinitionTaxiFour2'),
      WizardItemDefinitionFive: () => import('~/components/wizard/items/definition/WizardItemDefinitionFive'),
      WizardItemAddress: () => import('~/components/wizard/items/WizardItemAddress'),
      WizardItemIndividual: () => import('~/components/wizard/items/WizardItemIndividual'),
      WizardItemLvok: () => import('~/components/wizard/items/WizardItemLvok'),
      WizardItemOrganization: () => import('~/components/wizard/items/WizardItemOrganization'),
      // WizardItemOwner: () => import('~/components/wizard/items/WizardItemOwner'),
      WizardItemPlace: () => import('~/components/wizard/items/WizardItemPlace'),
      WizardItemPredDoc: () => import('~/components/wizard/items/WizardItemPredDoc'),
      WizardItemVehs: () => import('~/components/wizard/items/WizardItemVehs')
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
            name: "Lvok",
          },
          {
            title: "Транспортное средство",
            name: "Vehs",
          },
          {
            title: "Сведения о нарушении",
            name: "nar"
          },
          {
            title: "Сведения об источнике данных",
            name: "data-source"
          },
          {
            title: "Сведения о владельце разрешения",
            name: "owner-details"
          },
          {
            title: "Сведения о рассмотрении",
            name: "definition"
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
        if (resp.error && resp.error.errorId) {
          let error = '';
          funcUtils.isNotEmpty(resp.error.errorMsg) ? error += `ErrorMsg: ${resp.error.errorMsg}\n` : null;
          funcUtils.isNotEmpty(resp.error.errorDesc) ? error += `ErrorDesc: ${resp.error.errorDesc}\n` : null;
          alert(error);
        } else {
          eventResponse = await RequestApi.prepareData({
            method: 'getDeloId'
          });
          resp = null;
          if (eventResponse.response) {
            resp = JSON.parse(eventResponse.response);
          }
          if (resp && resp.data) {
            this.getPrev(false);
            let params = {
              deloId: resp.data
            };

            formStack.toNext({
              module: this.$store.state.deloTreeCardView,
              vm: this,
              notRemoved: false,
              params: params,
              withCreate: true
            });
          } else {
            this.getPrev();
          }
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
