<template>
  <aside-template :listSectionNav="listSectionNav()" title="Постановление об АПН">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <wizard-item-doc-post-first id="head" v-if="isVisible('DocPostFirst')" ref="DocPostFirst" :info="getInfo('DocPostFirst')" @storeElementData="storeElementData" @updateComponents="updateComponents">
            <wizard-item-place v-if="isVisible('DocPostFirst.PlaceSost')" ref="DocPostFirst.PlaceSost" :info="getInfo('DocPostFirst.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
          </wizard-item-doc-post-first>
          <wizard-item-vehs id="Vehs" v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs>
          <div id="Owner" class="adm-form__container" v-if="isVisible('Owner')">
            <h2 class="adm-form__headding">Владелец транспортного средства</h2>
            <div class="adm-form__content">
              <wizard-item-owner v-if="isVisible('Owner')" ref="Owner" :info="getInfo('Owner')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-owner>
              <wizard-item-individual id="Owner.Individual" v-if="isVisible('Owner.Individual')" ref="Owner.Individual" :info="getInfo('Owner.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('Owner.Individual.regAddr')" ref="Owner.Individual.regAddr" :info="getInfo('Owner.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('Owner.Individual.factAddr')" ref="Owner.Individual.factAddr" :info="getInfo('Owner.Individual.factAddr')" title="Адрес места жительства" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-organization v-if="isVisible('Owner.Organization')" ref="Owner.Organization" :info="getInfo('Owner.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
              <wizard-item-address v-if="isVisible('Owner.Organization.regAddr')" ref="Owner.Organization.regAddr" :info="getInfo('Owner.Organization.regAddr')" title="Юридический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('Owner.Organization.factAddr')" ref="Owner.Organization.factAddr" :info="getInfo('Owner.Organization.factAddr')"  title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
          </div>
          <!-- <div v-if="isNotEmptyParentNode('LVOK')"> -->
            <div class="adm-form__container">
              <h2 class="adm-form__headding" id="Lvok">ЛВОК</h2>
              <div class="adm-form__content">
                <wizard-item-lvok id="LVOK" v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-lvok>
                <wizard-item-individual v-if="isVisible('LVOK.Individual')" ref="LVOK.Individual" :info="getInfo('LVOK.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
                <wizard-item-address v-if="isVisible('LVOK.Individual.regAddr')" ref="LVOK.Individual.regAddr" :info="getInfo('LVOK.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('LVOK.Individual.factAddr')" ref="LVOK.Individual.factAddr" :info="getInfo('LVOK.Individual.factAddr')" title="Адрес места жительства" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-organization v-if="isVisible('LVOK.Organization')" ref="LVOK.Organization" :info="getInfo('LVOK.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
                <wizard-item-address v-if="isVisible('LVOK.Organization.regAddr')" ref="LVOK.Organization.regAddr" :info="getInfo('LVOK.Organization.regAddr')" title="Юридический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
                <wizard-item-address v-if="isVisible('LVOK.Organization.factAddr')" ref="LVOK.Organization.factAddr" :info="getInfo('LVOK.Organization.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              </div>
            </div>
          <!-- </div> -->
          <div v-if="isVisible('Present')" class="adm-form__container">
            <h2 id="pres" class="adm-form__headding">Сведения о явке</h2>
            <div class="adm-form__content">
              <wizard-item-present id="Present" ref="Present" :info="getInfo('Present')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-present>
              <wizard-item-pred-doc v-if="isVisible('Present.PredDoc')" ref="Present.PredDoc" :info="getInfo('Present.PredDoc')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pred-doc>
              <wizard-item-individual v-if="isVisible('Present.Repres')" ref="Present.Repres" :info="getInfo('Present.Repres')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('Present.Repres.regAddr')" ref="Present.Repres.regAddr" :info="getInfo('Present.Repres.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
          </div>
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
      WizardItemPresent: () => import('~/components/wizard/items/WizardItemPresent'),
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
            title: "Транспортное средство",
            name: "Vehs",
            hide: !this.isVisible('Vehs')
          },
          {
            title: "Владелец транспортного средства",
            name: "Owner",
            hide: !this.isVisible('Owner')
          },
          {
            title: "ЛВОК",
            name: "Lvok",
            hide: !this.isVisible('LVOK')
          },
          {
            title: "Сведения о явке",
            name: "pres",
            hide: !this.isVisible('Present')
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
        let eventResp =  JSON.parse(eventResponse.response);
        if (eventResp.error && eventResp.error.errorId) {
          this.$store.dispatch('errorsModal/changeContent', {title: eventResp.error.errorMsg, desc: eventResp.error.errorDesc,});
        } else {
          let response = await RequestApi.prepareData({
            method: 'getDeloId'
          });
          let resp = null;
          if (response.response) {
            resp = JSON.parse(response.response);
          }
          if (resp && resp.data) {
            await this.getPrev(false);
            let params = {
              deloId: resp.data,
              scenarioResult: eventResp.data,
            };

            formStack.toNext({
              module: this.$store.state.deloTreeCardView,
              vm: this,
              notRemoved: false,
              params: params,
              withCreate: true
            });
          } else {
            let stack = formStack.getStack();
            let prev = stack.indexOf(stack.size() - 2);
            prev.params.scenarioResult = eventResp.data;
            formStack.updateStack(stack);
            this.getPrev();
          }
        }
      },
      async getPrev(withTransition = true) {
        try {
          await formStack.toPrev({
            vm: this,
            withTransition: withTransition
          });
        } catch (e) {
          this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
        }
      },
    }
  }
</script>

<style scoped>

</style>
