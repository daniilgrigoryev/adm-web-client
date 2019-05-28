<template>
<!-- Протокол об административном правонарушении такси -->
  <aside-template :listSectionNav="listSectionNav()" title="Протокол об АПН такси">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">
              Ввод данных по протоколу об административном правонарушении такси
            </h2>
            <div class="adm-form__content">
              <wizard-item-prot-one-apn id="DocProtApnOne" v-if="isVisible('DocProtApnOne')" ref="DocProtApnOne" :info="getInfo('DocProtApnOne')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-one-apn>
              <wizard-item-place v-if="isVisible('DocProtApnOne.PlaceSost')" ref="DocProtApnOne.PlaceSost" :info="getInfo('DocProtApnOne.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              <wizard-item-prot-two id="DocProtApnTwo" v-if="isVisible('DocProtApnTwo')" ref="DocProtApnTwo" :info="getInfo('DocProtApnTwo')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-two>
            </div>
          </div>
          <wizard-item-vehs id="Vehs" v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs>
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="Lvok">ЛВОК</h2>
            <div class="adm-form__content">
              <wizard-item-lvok v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-lvok>
              <wizard-item-individual v-if="isVisible('LVOK.Individual')" ref="LVOK.Individual" :info="getInfo('LVOK.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('LVOK.Individual.regAddr')" ref="LVOK.Individual.regAddr" :info="getInfo('LVOK.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('LVOK.Individual.factAddr')" ref="LVOK.Individual.factAddr" :info="getInfo('LVOK.Individual.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-organization v-if="isVisible('LVOK.Organization')" ref="LVOK.Organization" :info="getInfo('LVOK.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
              <wizard-item-address v-if="isVisible('LVOK.Organization.regAddr')" ref="LVOK.Organization.regAddr" :info="getInfo('LVOK.Organization.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
              <wizard-item-address v-if="isVisible('LVOK.Organization.factAddr')" ref="LVOK.Organization.factAddr" :info="getInfo('LVOK.Organization.factAddr')" title="Адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
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
          <wizard-item-prot-taxi-four id="DocProtTaxiFour" v-if="isVisible('DocProtTaxiFour')" ref="DocProtTaxiFour" :info="getInfo('DocProtTaxiFour')" @storeElementData="storeElementData" @updateComponents="updateComponents">
            <template v-slot:wizard-item-prot-three>
              <wizard-item-prot-three id="DocProtApnThree" v-if="isVisible('DocProtApnThree')" ref="DocProtApnThree" :info="getInfo('DocProtApnThree')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-three>
              <wizard-item-place v-if="isVisible('DocProtApnThree.PlaceNar')" ref="DocProtApnThree.PlaceNar" :info="getInfo('DocProtApnThree.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
            </template>
            <wizard-item-individual id="DocProtTaxiFour.Individual" v-if="isVisible('DocProtTaxiFour.Individual')" ref="DocProtTaxiFour.Individual" :info="getInfo('DocProtTaxiFour.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
            <wizard-item-address v-if="isVisible('DocProtTaxiFour.Individual.regAddr')" ref="DocProtTaxiFour.Individual.regAddr" :info="getInfo('DocProtTaxiFour.Individual.regAddr')"  title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            <wizard-item-address v-if="isVisible('DocProtTaxiFour.Individual.factAddr')" ref="DocProtTaxiFour.Individual.factAddr" :info="getInfo('DocProtTaxiFour.Individual.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            <wizard-item-organization v-if="isVisible('DocProtTaxiFour.Organization')" ref="DocProtTaxiFour.Organization" :info="getInfo('DocProtTaxiFour.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>
            <wizard-item-address v-if="isVisible('DocProtTaxiFour.Organization.regAddr')" ref="DocProtTaxiFour.Organization.regAddr" :info="getInfo('DocProtTaxiFour.Organization.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            <wizard-item-address v-if="isVisible('DocProtTaxiFour.Organization.factAddr')" ref="DocProtTaxiFour.Organization.factAddr" :info="getInfo('DocProtTaxiFour.Organization.factAddr')" title="Фактический адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
          </wizard-item-prot-taxi-four>


          <div class="adm-form__container">
            <h2 id="rasm" class="adm-form__headding">Сведения о рассмотрении</h2>
            <div class="adm-form__content">
              <wizard-item-prot-taxi-five id="apn" v-if="isVisible('DocProtTaxiFive')" ref="DocProtTaxiFive" :info="getInfo('DocProtTaxiFive')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-taxi-five>
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
    name: "WizardScenarioProtTaxi",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardItemProtOneApn: () => import('~/components/wizard/items/protApn/WizardItemProtOneApn'),
      WizardItemProtTwo: () => import('~/components/wizard/items/WizardItemProtTwo'),
      WizardItemProtThree: () => import('~/components/wizard/items/WizardItemProtThree'),
      WizardItemProtTaxiFour: () => import('~/components/wizard/items/protTaxi/WizardItemProtTaxiFour'),
      WizardItemProtTaxiFive: () => import('~/components/wizard/items/protTaxi/WizardItemProtTaxiFive'),
      WizardItemAddress: () => import('~/components/wizard/items/WizardItemAddress'),
      WizardItemIndividual: () => import('~/components/wizard/items/WizardItemIndividual'),
      WizardItemLvok: () => import('~/components/wizard/items/WizardItemLvok'),
      WizardItemOrganization: () => import('~/components/wizard/items/WizardItemOrganization'),
      WizardItemPlace: () => import('~/components/wizard/items/WizardItemPlace'),
      WizardItemPredDoc: () => import('~/components/wizard/items/WizardItemPredDoc'),
      WizardItemPresent: () => import('~/components/wizard/items/WizardItemPresent'),
      WizardItemVehs: () => import('~/components/wizard/items/WizardItemVehs')
    },
    methods: {
      listSectionNav() {
        return [
          {
            title: "Ввод данных по протоколу об АПН такси",
            name: "head",
          },
          {
            title: "Транспортное средство",
            name: "vehs",
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
            title: "Сведения о нарушении",
            name: "nar"
          },
          {
            title: "Сведения о владельце разрешения",
            name: "owner-details"
          },
          {
            title: "Сведения о разрешении",
            name: "permission-details"
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
        let resp =  JSON.parse(eventResponse.response);
        if (resp.error && resp.error.errorId) {
          this.$store.dispatch('errors/changeContent', {title: resp.error.errorMsg, desc: resp.error.errorDesc,});
        } else {
          let stack = formStack.getStack();
          let prev = stack.indexOf(stack.size() - 2);
          prev.params.scenarioResult = resp.data;
          formStack.updateStack(stack);

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
      getPrev(withTransition) {
        try {
          formStack.toPrev({
            vm: this,
            withTransition: withTransition || true
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
    }
  }
</script>

<style scoped>

</style>
