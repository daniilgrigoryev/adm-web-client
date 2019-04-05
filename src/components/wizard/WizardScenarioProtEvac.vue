<template>
  <aside-template :listSectionNav="listSectionNav" title="Протокол о задержании ТС">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">
              Ввод данных по протоколу о задержании ТС
            </h2>
            <div class="adm-form__content">
              <wizard-item-prot-evac-one id="DocProtEvacOne" v-if="isVisible('DocProtEvacOne')" ref="DocProtEvacOne" :info="getInfo('DocProtEvacOne')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-evac-one>
              <wizard-item-place v-if="isVisible('DocProtEvacOne.PlaceSost')" ref="DocProtEvacOne.PlaceSost" :info="getInfo('DocProtEvacOne.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              <wizard-item-prot-evac-two id="DocProtEvacTwo" v-if="isVisible('DocProtEvacTwo')" ref="DocProtEvacTwo" :info="getInfo('DocProtEvacTwo')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-evac-two>
            </div>
          </div>
          <div v-if="isNotEmptyParentNode('LVOK')">
            <div class="adm-form__container">
              <h2 class="adm-form__headding" id="lvok">ЛВОК</h2>
              <div class="adm-form__content">
                <wizard-item-lvok id="LVOK" v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-lvok>
                <wizard-item-pred-doc v-if="isVisible('LVOK.PredDoc')" ref="LVOK.PredDoc" :info="getInfo('LVOK.PredDoc')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pred-doc>
                <wizard-item-individual v-if="isVisible('LVOK.Individual')" ref="LVOK.Individual" :info="getInfo('LVOK.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
                <wizard-item-address v-if="isVisible('LVOK.Individual.regAddr')" ref="LVOK.Individual.regAddr" :info="getInfo('LVOK.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('LVOK.Individual.factAddr')" ref="LVOK.Individual.factAddr" :info="getInfo('LVOK.Individual.factAddr')" title="Адрес места жительства" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-organization v-if="isVisible('LVOK.Organization')" ref="LVOK.Organization" :info="getInfo('LVOK.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
                <wizard-item-address v-if="isVisible('LVOK.Organization.regAddr')" ref="LVOK.Organization.regAddr" :info="getInfo('LVOK.Organization.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('LVOK.Organization.factAddr')" ref="LVOK.Organization.factAddr" :info="getInfo('LVOK.Organization.factAddr')" title="Адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-owner v-if="isVisible('Owner')" ref="Owner" :info="getInfo('Owner')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-owner>
                <wizard-item-individual id="Owner.Individual" v-if="isVisible('Owner.Individual')" ref="Owner.Individual" :info="getInfo('Owner.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
                <wizard-item-address v-if="isVisible('Owner.Individual.regAddr')" ref="Owner.Individual.regAddr" :info="getInfo('Owner.Individual.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('Owner.Individual.factAddr')" ref="Owner.Individual.factAddr" :info="getInfo('Owner.Individual.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-organization v-if="isVisible('Owner.Organization')" ref="Owner.Organization" :info="getInfo('Owner.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
                <wizard-item-address v-if="isVisible('Owner.Organization.regAddr')" ref="Owner.Organization.regAddr" :info="getInfo('Owner.Organization.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('Owner.Organization.factAddr')" ref="Owner.Organization.factAddr" :info="getInfo('Owner.Organization.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              </div>
            </div>
          </div>
          <wizard-item-vehs-evac id="vehs" v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs-evac>
          <div class="adm-form__container">
            <h2 id="nar" class="adm-form__headding">Сведения о нарушении</h2>
            <div class="adm-form__content">
              <wizard-item-prot-evac-three id="DocProtEvacThree" v-if="isVisible('DocProtEvacThree')" ref="DocProtEvacThree" :info="getInfo('DocProtEvacThree')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-evac-three>
              <wizard-item-place v-if="isVisible('DocProtEvacThree.PlaceNar')" ref="DocProtEvacThree.PlaceNar" :info="getInfo('DocProtEvacThree.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              <wizard-item-prot-evac-four id="DocProtEvacFour" v-if="isVisible('DocProtEvacFour')" ref="DocProtEvacFour" :info="getInfo('DocProtEvacFour')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-evac-four>
            </div>
          </div>
          <wizard-item-prot-evac-five id="evac" v-if="isVisible('DocProtEvacFive')" ref="DocProtEvacFive" :info="getInfo('DocProtEvacFive')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-evac-five>
          <div class="adm-form__container">
            <h2 id="witness" class="adm-form__headding">Понятые</h2>
            <div class="adm-form__content">
              <h4 class="h4">1 понятой</h4>
              <wizard-item-individual v-if="isVisible('Witness1')" ref="Witness1" :info="getInfo('Witness1')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('Witness1.regAddr')" ref="Witness1.regAddr" :info="getInfo('Witness1.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <hr>
              <h4 class="h4">2 понятой</h4>
              <wizard-item-individual v-if="isVisible('Witness2')" ref="Witness2" :info="getInfo('Witness2')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('Witness2.regAddr')" ref="Witness2.regAddr" :info="getInfo('Witness2.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
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
  import WizardItemProtEvacOne from "./items/protEvac/WizardItemProtEvacOne.vue";
  import WizardItemProtEvacTwo from "./items/protEvac/WizardItemProtEvacTwo.vue";
  import WizardItemProtEvacThree from "./items/protEvac/WizardItemProtEvacThree.vue";
  import WizardItemProtEvacFour from "./items/protEvac/WizardItemProtEvacFour.vue";
  import WizardItemProtEvacFive from "./items/protEvac/WizardItemProtEvacFive.vue";
  import WizardItemPlace from "./items/WizardItemPlace.vue";
  import WizardItemLvok from "./items/WizardItemLvok.vue";
  import WizardItemPredDoc from "./items/WizardItemPredDoc.vue";
  import WizardItemIndividual from "./items/WizardItemIndividual.vue";
  import WizardItemOrganization from "./items/WizardItemOrganization.vue";
  import WizardItemAddress from "./items/WizardItemAddress.vue";
  import WizardItemOwner from "./items/WizardItemOwner.vue";
  import WizardItemVehsEvac from "./items/protEvac/WizardItemVehsEvac.vue";
  import MaskedInput from "~/components/shared/MaskedInput";


  export default {
    name: "WizardScenarioProtEvac",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate,
      WizardItemProtEvacOne,
      WizardItemProtEvacTwo,
      WizardItemProtEvacThree,
      WizardItemProtEvacFour,
      WizardItemProtEvacFive,
      WizardItemPlace,
      WizardItemLvok,
      WizardItemPredDoc,
      WizardItemIndividual,
      WizardItemOrganization,
      WizardItemAddress,
      WizardItemOwner,
      WizardItemVehsEvac,
      MaskedInput,
    },
    data() {
      return {
        listSectionNav: [
          {
            title: "Ввод данных по ПЗТС",
            name: "head",
          },
          {
            title: "Транспортное средство",
            name: "vehs",
          },
          {
            title: "Сведения о нарушении",
            name: "nar",
          },
          {
            title: "Сведения об эвакуации",
            name: "evac",
          },
          {
            title: "Понятые",
            name: "witness",
          },
        ],
        maskInputProt: {
          regex: '[0-9]+',
          casing: 'upper',
          placeholder: ''
        },
      }
    },
    methods: {
      isNotEmptyParentNode(path) {
        if (funcUtils.isEmpty(this.pathes)) {
          return false;
        } else {
          return funcUtils.isNotEmpty(this.pathes[path].parentNode);
        }
      },
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
          eventResponse = await RequestApi.prepareData({
            method: 'getDeloId'
          });
          resp =  JSON.parse(eventResponse.response);
          if (resp.data) {
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
      getPrev(withTransition) {
        try {
          formStack.toPrev({
            vm: this,
            withTransition: withTransition || true
          });
        } catch (e) {
          alert(e.message);
        }
      },
    }
  }
</script>

