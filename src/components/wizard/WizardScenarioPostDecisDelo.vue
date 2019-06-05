<!-- prettier-ignore -->
<template>
  <aside-template :listSectionNav="listSectionNav()" title="Постановление с решением по делу">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <wizard-item-doc-post-first id="head" v-if="isVisible('DocPostFirst')" ref="DocPostFirst" :info="getInfo('DocPostFirst')" @storeElementData="storeElementData" @updateComponents="updateComponents">
            <wizard-item-place v-if="isVisible('DocPostFirst.PlaceSost')" ref="DocPostFirst.PlaceSost" :info="getInfo('DocPostFirst.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
          </wizard-item-doc-post-first>
          <div class="adm-form__container" v-if="isVisible('Present')">
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
            <h2 class="adm-form__headding">Решение по делу</h2>
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
    name: "WizardScenarioPostDecisDelo",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate: () => import ('~/components/templates/AsideTemplate'),
      WizardItemDecis: () => import('~/components/wizard/items/WizardItemDecis'),
      WizardItemDocPostFinal: () => import('~/components/wizard/items/docPost/WizardItemDocPostFinal'),
      WizardItemDocPostFirst: () => import('~/components/wizard/items/docPost/WizardItemDocPostFirst.vue'),
      WizardItemDocPostSecond: () => import('~/components/wizard/items/docPost/WizardItemDocPostSecond'),
      WizardItemPlace: () => import('~/components/wizard/items/WizardItemPlace'),
      WizardItemPresent: () => import('~/components/wizard/items/WizardItemPresent'),
      WizardItemPredDoc: () => import('~/components/wizard/items/WizardItemPredDoc'),
      WizardItemIndividual: () => import('~/components/wizard/items/WizardItemIndividual'),
      WizardItemAddress: () => import('~/components/wizard/items/WizardItemAddress'),
    },
    data() {
      return {
        maskInputProt: {
          regex: '[0-9]+',
          casing: 'upper',
          placeholder: ''
        },
      }
    },
    methods: {
      listSectionNav(){
        return [
          {
            title: "Ввод данных постановления с решением по делу",
            name: "head",
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
          this.$store.dispatch('errors/changeContent', {title: eventResp.error.errorMsg, desc: eventResp.error.errorDesc,});
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
    }
  }
</script>

<style scoped>

</style>
