<template>
  <aside-template :listSectionNav="listSectionNav()" title="Постановление об АПН">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <wizard-item-doc-post-first id="head" v-if="isVisible('DocPostFirst')" ref="DocPostFirst" :info="getInfo('DocPostFirst')" @storeElementData="storeElementData" @updateComponents="updateComponents">
            <wizard-item-place v-if="isVisible('DocPostFirst.PlaceSost')" ref="DocPostFirst.PlaceSost" :info="getInfo('DocPostFirst.PlaceSost')" title="Место вынесения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
          </wizard-item-doc-post-first>
          <!-- <div v-if="isNotEmptyParentNode('LVOK')"> -->
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
                <wizard-item-owner id="Owner" v-if="isVisible('Owner')" ref="Owner" :info="getInfo('Owner')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-owner>
                <wizard-item-individual v-if="isVisible('Owner.Individual')" ref="Owner.Individual" :info="getInfo('Owner.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
                <wizard-item-address v-if="isVisible('Owner.Individual.regAddr')" ref="Owner.Individual.regAddr" :info="getInfo('Owner.Individual.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('Owner.Individual.factAddr')" ref="Owner.Individual.factAddr" :info="getInfo('Owner.Individual.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-organization v-if="isVisible('Owner.Organization')" ref="Owner.Organization" :info="getInfo('Owner.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
                <wizard-item-address v-if="isVisible('Owner.Organization.regAddr')" ref="Owner.Organization.regAddr" :info="getInfo('Owner.Organization.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('Owner.Organization.factAddr')" ref="Owner.Organization.factAddr" :info="getInfo('Owner.Organization.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              </div>
            </div>
          <!-- </div> -->
          <wizard-item-vehs id="vehs" v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs>

          <div class="adm-form__container">
            <h2 id="nar" class="adm-form__headding">Сведения о нарушении</h2>
            <div class="adm-form__content">
              <wizard-item-doc-post-second id="DocPostSecond" v-if="isVisible('DocPostSecond')" ref="DocPostSecond" :info="getInfo('DocPostSecond')" @storeElementData="storeElementData" @updateComponents="updateComponents">
                <wizard-item-place v-if="isVisible('DocPostSecond.PlaceNar')" ref="DocPostSecond.PlaceNar" :info="getInfo('DocPostSecond.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              </wizard-item-doc-post-second>
            </div>
          </div>
          <div class="adm-form__container" id="decis" v-if="isVisible('DecisMain')">
            <h2 id="decis" class="adm-form__headding">Решение по делу</h2>
            <div class="adm-form__content">
              <wizard-item-decis id="DecisMain" v-if="isVisible('DecisMain')" ref="DecisMain" :info="getInfo('DecisMain')" @storeElementData="storeElementData" title="Решение по делу" @updateComponents="updateComponents"></wizard-item-decis>
              <wizard-item-decis id="DecisAdd" v-if="isVisible('DecisAdd')" ref="DecisAdd" :info="getInfo('DecisAdd')" @storeElementData="storeElementData" title="Дополнительное решение по делу" @updateComponents="updateComponents"></wizard-item-decis>
              <wizard-item-doc-post-final v-if="isVisible('DocPostFinal')" ref="DocPostFirst" :info="getInfo('DocPostFinal')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-doc-post-final>
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
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardScenarioPost",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardItemAddress: () => import('~/components/wizard/items/WizardItemAddress'),
      WizardItemDecis: () => import('~/components/wizard/items/WizardItemDecis'),
      WizardItemDocPostFinal: () => import('~/components/wizard/items/docPost/WizardItemDocPostFinal'),
      WizardItemDocPostFirst: () => import('~/components/wizard/items/docPost/WizardItemDocPostFirst'),
      WizardItemDocPostSecond: () => import('~/components/wizard/items/docPost/WizardItemDocPostSecond'),
      WizardItemIndividual: () => import('~/components/wizard/items/WizardItemIndividual'),
      WizardItemLvok: () => import('~/components/wizard/items/WizardItemLvok'),
      WizardItemOrganization: () => import('~/components/wizard/items/WizardItemOrganization'),
      WizardItemOwner: () => import('~/components/wizard/items/WizardItemOwner'),
      WizardItemPlace: () => import('~/components/wizard/items/WizardItemPlace'),
      WizardItemPredDoc: () => import('~/components/wizard/items/WizardItemPredDoc'),
      WizardItemVehs: () => import('~/components/wizard/items/WizardItemVehs')
    },
    methods: {
      listSectionNav() {
        return [
          {
            title: "Ввод данных по постановлению об АПН",
            name: "head",
          },
          {
            title: "ЛВОК",
            name: "lvok",
          },
          {
            title: "Транспортное средство",
            name: "Vehs",
            hide: !this.isVisible('Vehs')
          },
          {
            title: "Сведения о нарушении",
            name: "nar",
          },
          {
            title: "Решение по делу",
            name: "DecisMain",
            hide: !this.isVisible('DecisMain')
          }
        ]
      },
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
