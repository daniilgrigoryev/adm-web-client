<template>
<!-- Протокол об административном правонарушении -->
  <div class="wmax1920">
    <Row type="flex">
      <Col :xs="24" :sm="8" :md="6" :lg="6">
          <div class="bg-blue-thin h-full">
            <ul class="ml60 mr24 my24 min-nav" style="top: 100px">
              <li v-for="item in goToSectionNav" :key="item.id" >
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
                <h2 id="head" class="adm-text-big adm-form__headding">Протокол об административном правонарушении</h2>

                <wizard-item-doc-prot-rasm id="DocProtRasm" v-if="isVisible('DocProtRasm')" ref="DocProtRasm" :info="getInfo('DocProtRasm')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-doc-prot-rasm>
                <wizard-item-place v-if="isVisible('DocProtRasm.PlaceSost')" ref="DocProtRasm.PlaceSost" :info="getInfo('DocProtRasm.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
                <wizard-item-place v-if="isVisible('DocProtRasm.PlaceNar')" ref="DocProtRasm.PlaceNar" :info="getInfo('DocProtRasm.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
                <wizard-item-lvok id="LVOK" v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-lvok>
                <wizard-item-pred-doc v-if="isVisible('LVOK.PredDoc')" ref="LVOK.PredDoc" :info="getInfo('LVOK.PredDoc')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pred-doc>
                <wizard-item-individual v-if="isVisible('LVOK.Individual')" ref="LVOK.Individual" :info="getInfo('LVOK.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
                <wizard-item-address v-if="isVisible('LVOK.Individual.regAddr')" ref="LVOK.Individual.regAddr" :info="getInfo('LVOK.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('LVOK.Individual.factAddr')" ref="LVOK.Individual.factAddr" :info="getInfo('LVOK.Individual.factAddr')" title="Адрес места жительства" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-organization v-if="isVisible('LVOK.Organization')" ref="LVOK.Organization" :info="getInfo('LVOK.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
                <wizard-item-address v-if="isVisible('LVOK.Organization.regAddr')" ref="LVOK.Organization.regAddr" :info="getInfo('LVOK.Organization.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('LVOK.Organization.factAddr')" ref="LVOK.Organization.factAddr" :info="getInfo('LVOK.Organization.factAddr')" title="Адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              </div>
            </div>

            <wizard-item-vehs id="Vehs" v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs>

            <div class="adm-form" v-if="isVisible('Owner')">
              <div class="adm-form__container mt6">
                <wizard-item-owner v-if="isVisible('Owner')" ref="Owner" :info="getInfo('Owner')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-owner>
                <wizard-item-individual id="Owner.Individual" v-if="isVisible('Owner.Individual')" ref="Owner.Individual" :info="getInfo('Owner.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
                <wizard-item-address v-if="isVisible('Owner.Individual.regAddr')" ref="Owner.Individual.regAddr" :info="getInfo('Owner.Individual.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('Owner.Individual.factAddr')" ref="Owner.Individual.factAddr" :info="getInfo('Owner.Individual.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-organization v-if="isVisible('Owner.Organization')" ref="Owner.Organization" :info="getInfo('Owner.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
                <wizard-item-address v-if="isVisible('Owner.Organization.regAddr')" ref="Owner.Organization.regAddr" :info="getInfo('Owner.Organization.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('Owner.Organization.factAddr')" ref="Owner.Organization.factAddr" :info="getInfo('Owner.Organization.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              </div>
            </div>

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
  import WizardItemAddress from "./items/WizardItemAddress.vue";
  import WizardItemDocProtRasm from "./items/WizardItemDocProtRasm.vue";
  import WizardItemIndividual from "./items/WizardItemIndividual.vue";
  import WizardItemLvok from "./items/WizardItemLvok.vue";
  import WizardItemOrganization from "./items/WizardItemOrganization.vue";
  import WizardItemOwner from "./items/WizardItemOwner.vue";
  import WizardItemPlace from "./items/WizardItemPlace.vue";
  import WizardItemPredDoc from "./items/WizardItemPredDoc.vue";
  import WizardItemVehs from "./items/WizardItemVehs.vue";

  export default {
    name: "WizardScenarioProtAPN",
    props: {
      pathes: Object
    },
    components: {
      WizardItemAddress,
      WizardItemDocProtRasm,
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
        goToSectionNav: [
          {
            title: "Протокол об АПН",
            name: "head",
          },
          {
            title: "Лвок",
            name: "LVOK",
          },
          {
            title: "Транспортное средство",
            name: "Vehs",
          },
          {
            title: "Понятые",
            name: "witness",
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
