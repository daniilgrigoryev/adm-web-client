<template>
  <!-- Протокол апн погрузки и разгрузки -->
  <aside-template :listSectionNav="listSectionNav()" title="Протокол АПН погрузки и разгрузки">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">
              Ввод данных по протоколу об административном правонарушении погрузки и разгрузки
            </h2>
            <div class="adm-form__content">
              <wizard-item-prot-one-apn id="DocProtApnOne" v-if="isVisible('DocProtApnOne')" ref="DocProtApnOne" :info="getInfo('DocProtApnOne')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-one-apn>
              <wizard-item-place v-if="isVisible('DocProtApnOne.PlaceSost')" ref="DocProtApnOne.PlaceSost" :info="getInfo('DocProtApnOne.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              <wizard-item-prot-two id="DocProtApnTwo" v-if="isVisible('DocProtApnTwo')" ref="DocProtApnTwo" :info="getInfo('DocProtApnTwo')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-two>
            </div>
          </div>
          <wizard-item-vehs id="Vehs" v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs>
          <div id="Owner" class="adm-form__container" v-if="isVisible('Owner')">
            <h2 class="adm-form__headding">Владелец транспортного средства</h2>
            <div class="adm-form__content">
              <wizard-item-owner v-if="isVisible('Owner')" ref="Owner" :info="getInfo('Owner')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-owner>
              <wizard-item-individual id="Owner.Individual" v-if="isVisible('Owner.Individual')" ref="Owner.Individual" :info="getInfo('Owner.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('Owner.Individual.regAddr')" ref="Owner.Individual.regAddr" :info="getInfo('Owner.Individual.regAddr')"  title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('Owner.Individual.factAddr')" ref="Owner.Individual.factAddr" :info="getInfo('Owner.Individual.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-organization v-if="isVisible('Owner.Organization')" ref="Owner.Organization" :info="getInfo('Owner.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
              <wizard-item-address v-if="isVisible('Owner.Organization.regAddr')" ref="Owner.Organization.regAddr" :info="getInfo('Owner.Organization.regAddr')" title="Юридический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('Owner.Organization.factAddr')" ref="Owner.Organization.factAddr" :info="getInfo('Owner.Organization.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="Lvok">ЛВОК</h2>
            <div class="adm-form__content">
              <wizard-item-lvok  v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-lvok>
              <wizard-item-individual v-if="isVisible('LVOK.Individual')" ref="LVOK.Individual" :info="getInfo('LVOK.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('LVOK.Individual.regAddr')" ref="LVOK.Individual.regAddr" :info="getInfo('LVOK.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('LVOK.Individual.factAddr')" ref="LVOK.Individual.factAddr" :info="getInfo('LVOK.Individual.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-organization v-if="isVisible('LVOK.Organization')" ref="LVOK.Organization" :info="getInfo('LVOK.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
              <wizard-item-address v-if="isVisible('LVOK.Organization.regAddr')" ref="LVOK.Organization.regAddr" :info="getInfo('LVOK.Organization.regAddr')" title="Юридический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('LVOK.Organization.factAddr')" ref="LVOK.Organization.factAddr" :info="getInfo('LVOK.Organization.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
          </div>
          <div v-if="isVisible('Present')" class="adm-form">
            <div class="adm-form__container">
              <h2 id="pres" class="adm-form__headding">Сведения о явке</h2>
              <div class="adm-form__content">
                <wizard-item-present id="Present" ref="Present" :info="getInfo('Present')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-present>
                <wizard-item-pred-doc v-if="isVisible('Present.PredDoc')" ref="Present.PredDoc" :info="getInfo('Present.PredDoc')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pred-doc>
                <wizard-item-individual v-if="isVisible('Present.Repres')" ref="Present.Repres" :info="getInfo('Present.Repres')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
                <wizard-item-address v-if="isVisible('Present.Repres.regAddr')" ref="Present.Repres.regAddr" :info="getInfo('Present.Repres.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              </div>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 id="nar" class="adm-form__headding">Сведения о нарушении</h2>
            <div class="adm-form__content">
              <wizard-item-prot-three id="DocProtApnThree" v-if="isVisible('DocProtApnThree')" ref="DocProtApnThree" :info="getInfo('DocProtApnThree')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-three>
              <wizard-item-place v-if="isVisible('DocProtApnThree.PlaceNar')" ref="DocProtApnThree.PlaceNar" :info="getInfo('DocProtApnThree.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              <wizard-item-prot-apn-four id="DocProtApnFour" v-if="isVisible('DocProtApnFour')" ref="DocProtApnFour" :info="getInfo('DocProtApnFour')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-apn-four>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 id="rasm" class="adm-form__headding">Сведения о рассмотрении</h2>
            <div class="adm-form__content">
              <wizard-item-prot-apn-five id="apn" v-if="isVisible('DocProtApnFive')" ref="DocProtApnFive" :info="getInfo('DocProtApnFive')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-apn-five>
            </div>
          </div>
          <div v-if="isVisible('Witness1')" class="adm-form__container">
            <h2 id="witness" class="adm-form__headding">Свидетели</h2>
            <div class="adm-form__content">
              <h4 class="h4">1 свидетель</h4>
              <wizard-item-individual ref="Witness1" :info="getInfo('Witness1')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('Witness1.regAddr')" ref="Witness1.regAddr" :info="getInfo('Witness1.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <hr>
              <h4 class="h4">2 свидетель</h4>
              <wizard-item-individual v-if="isVisible('Witness2')" ref="Witness2" :info="getInfo('Witness2')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('Witness2.regAddr')" ref="Witness2.regAddr" :info="getInfo('Witness2.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
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
    name: "WizardScenarioProtCargo",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardItemProtOneApn: () => import('~/components/wizard/items/protApn/WizardItemProtOneApn'),
      WizardItemProtTwo: () => import('~/components/wizard/items/WizardItemProtTwo'),
      WizardItemProtThree: () => import('~/components/wizard/items/WizardItemProtThree'),
      WizardItemProtApnFour: () => import('~/components/wizard/items/protApn/WizardItemProtApnFour'),
      WizardItemProtApnFive: () => import('~/components/wizard/items/protApn/WizardItemProtApnFive'),
      WizardItemAddress: () => import('~/components/wizard/items/WizardItemAddress'),
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
            title: "Ввод данных по протоколу об АПН погрузки и разгрузки",
            name: "head",
          },
          {
            title: "Транспортное средство",
            name: "Vehs",
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
            name: "nar"
          },
          {
            title: "Сведения о рассмотрении",
            name: "rasm"
          },
          {
            title: "Свидетели",
            name: "witness",
            hide: !this.isVisible('Witness1')
          },

        ]
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
            let current = formStack.getCurrent();
            await this.getPrev(false);
            let params = {
              deloId: resp.data,
              scenarioResult: eventResp.data,
              title: current.params.title
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
