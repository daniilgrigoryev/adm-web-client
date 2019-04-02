<template>
  <div class="wmax1920 prot-pztc">
    <Row type="flex">
      <Col :xs="24" :sm="8" :md="6" :lg="6">
        <div class="bg-blue-thin h-full">
          <ul class="ml60 mr24 my24 min-nav" style="top: 100px" v-if="isVisible('DocProtEvacOne')">
            <li v-for="item in goToSectionNav" :key="item.id">
              <a :href="'#' + item.name" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">{{item.title}}</a>
            </li>
          </ul>
        </div>
      </Col>
      <Col :xs="24" :sm="18" :md="18" :lg="18">
        <div>
          <Layout ref="Main" class=" px36 py12" style="min-height: calc(100vh - 125px);">
            <div class="adm-form">
              <div class="adm-form__container mt6">
                <h2 class="adm-text-big adm-form__headding" id="head">
                  Ввод данных по протоколу о задержании ТС по делу №
                  <div class="adm-form__item">
                    <div class="adm-form__item_content">
                      <masked-input inputClass="adm-input adm-input--regular white-color-input" :maskProps="maskInputProt"></masked-input>
                    </div>
                  </div>
                </h2>
                <div class="adm-form__content px36 py24">
                  <wizard-item-prot-evac-one id="DocProtEvacOne" v-if="isVisible('DocProtEvacOne')" ref="DocProtEvacOne" :info="getInfo('DocProtEvacOne')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-evac-one>
                  <wizard-item-place v-if="isVisible('DocProtEvacOne.PlaceSost')" ref="DocProtEvacOne.PlaceSost" :info="getInfo('DocProtEvacOne.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
                  <wizard-item-prot-evac-two id="DocProtEvacTwo" v-if="isVisible('DocProtEvacTwo')" ref="DocProtEvacTwo" :info="getInfo('DocProtEvacTwo')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-evac-two>
                </div>
              </div>
            </div>
            <div class="adm-form">
              <div class="adm-form__container mt6">
                <h2 class="adm-text-big adm-form__headding" id="lvok">ЛВОК</h2>
                <div class="adm-form__content px36 py24">
                <div v-if="isNotEmptyParentNode('LVOK')">
                  <wizard-item-lvok id="LVOK" v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-lvok>
                  <wizard-item-pred-doc v-if="isVisible('LVOK.PredDoc')" ref="LVOK.PredDoc" :info="getInfo('LVOK.PredDoc')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pred-doc>
                  <wizard-item-individual v-if="isVisible('LVOK.Individual')" ref="LVOK.Individual" :info="getInfo('LVOK.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
                  <wizard-item-address v-if="isVisible('LVOK.Individual.regAddr')" ref="LVOK.Individual.regAddr" :info="getInfo('LVOK.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                  <wizard-item-address v-if="isVisible('LVOK.Individual.factAddr')" ref="LVOK.Individual.factAddr" :info="getInfo('LVOK.Individual.factAddr')" title="Адрес места жительства" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                  <wizard-item-organization v-if="isVisible('LVOK.Organization')" ref="LVOK.Organization" :info="getInfo('LVOK.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
                  <wizard-item-address v-if="isVisible('LVOK.Organization.regAddr')" ref="LVOK.Organization.regAddr" :info="getInfo('LVOK.Organization.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                  <wizard-item-address v-if="isVisible('LVOK.Organization.factAddr')" ref="LVOK.Organization.factAddr" :info="getInfo('LVOK.Organization.factAddr')" title="Адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                </div>
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

            <wizard-item-vehs id="nar" v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs>

            <div class="adm-form">
              <div class="adm-form__container mt6">
                <h2 class="adm-text-big adm-form__headding" id="violation-information">Сведения о нарушении</h2>
                <div class="adm-form__content px36 py24">
                  <wizard-item-prot-evac-three id="DocProtEvacThree" v-if="isVisible('DocProtEvacThree')" ref="DocProtEvacThree" :info="getInfo('DocProtEvacThree')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-evac-three>
                  <wizard-item-place v-if="isVisible('DocProtEvacThree.PlaceNar')" ref="DocProtEvacThree.PlaceNar" :info="getInfo('DocProtEvacThree.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
                  <wizard-item-prot-evac-four id="DocProtEvacFour" v-if="isVisible('DocProtEvacFour')" ref="DocProtEvacFour" :info="getInfo('DocProtEvacFour')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-evac-four>
                </div>
              </div>
            </div>
            <wizard-item-prot-evac-five id="DocProtEvacFive" v-if="isVisible('DocProtEvacFive')" ref="DocProtEvacFive" :info="getInfo('DocProtEvacFive')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-evac-five>


            <div class="adm-form">
              <div class="adm-form__container mt6">
                <h2 id="witness" class="adm-text-big adm-form__headding">Понятые</h2>
                <div class="adm-form__content px36 py24">
                  <div class="adm-form__container mt6">
                    <wizard-item-individual v-if="isVisible('Witness1')" ref="Witness1" :info="getInfo('Witness1')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
                    <wizard-item-address v-if="isVisible('Witness1.regAddr')" ref="Witness1.regAddr" :info="getInfo('Witness1.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                  </div>
                  <div class="adm-form__container mt6">
                    <wizard-item-individual v-if="isVisible('Witness2')" ref="Witness2" :info="getInfo('Witness2')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
                    <wizard-item-address v-if="isVisible('Witness2.regAddr')" ref="Witness2.regAddr" :info="getInfo('Witness2.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                  </div>
                </div>
              </div>
            </div>

          </Layout>
          <div class="px36 py12 flex-parent flex-parent--end-main border-t border-b border--gray-faint bg-white-light adm-btn-footer--sticky">
            <Button @click="getPrev" type="text">Отменить возбуждение дела</Button>
            <Button @click="save" type="primary" class="ml12">Возбудить</Button>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import WizardItemProtEvacOne from "./items/evac/WizardItemProtEvacOne.vue";
  import WizardItemProtEvacTwo from "./items/evac/WizardItemProtEvacTwo.vue";
  import WizardItemProtEvacThree from "./items/evac/WizardItemProtEvacThree.vue";
  import WizardItemProtEvacFour from "./items/evac/WizardItemProtEvacFour.vue";
  import WizardItemProtEvacFive from "./items/evac/WizardItemProtEvacFive.vue";
  import WizardItemPlace from "./items/WizardItemPlace.vue";
  import WizardItemLvok from "./items/WizardItemLvok.vue";
  import WizardItemPredDoc from "./items/WizardItemPredDoc.vue";
  import WizardItemIndividual from "./items/WizardItemIndividual.vue";
  import WizardItemOrganization from "./items/WizardItemOrganization.vue";
  import WizardItemAddress from "./items/WizardItemAddress.vue";
  import WizardItemOwner from "./items/WizardItemOwner.vue";
  import WizardItemVehs from "./items/WizardItemVehs.vue";
  import MaskedInput from "~/components/shared/MaskedInput";


  export default {
    name: "WizardScenarioProtEvac",
    props: {
      pathes: Object
    },
    components: {
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
      WizardItemVehs,
      MaskedInput,
    },
    data() {
      return {
        goToSectionNav: [
          {
            title: "Ввод данных по протоколу о задержании ТС",
            name: "head",
          },
          {
            title: "ЛВОК",
            name: "lvok",
          },
          {
            title: "Транспортное средство",
            name: "Vehs",
          },
          {
            title: "Сведения о нарушении",
            name: "nar",
          },
          {
            title: "Сведения о нарушении",
            name: "nar",
          },
          {
            title: "Понятые",
            name: "witness",
          },
        ],
        maskInputProt: {
          regex: '[0-9]+',
          casing: 'upper',
          placeholder: ' '
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

<style lang="scss">
  .prot-pztc {
    .adm-form {
      .adm-form__headding {
        margin: 0;
      }
      .adm-form__label {
        min-width: 180px;
      }
    }
  }
</style>
