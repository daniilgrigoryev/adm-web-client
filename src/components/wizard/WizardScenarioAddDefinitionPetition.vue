<template>
  <!-- Форма возбуждения Определением по ходатайству -->
  <aside-template :listSectionNav="listSectionNav()" title="Определение по ходатайству">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">
              Ввод данных об Определение по ходатайству
            </h2>
            <div class="adm-form__content">
              <wizard-item-definition-one  id="DocDefinitionOne" v-if="isVisible('DocDefinitionOne')" ref="DocDefinitionOne" :info="getInfo('DocDefinitionOne')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-definition-one>
              <wizard-item-place v-if="isVisible('DocDefinitionOne.PlaceSost')" ref="DocDefinitionOne.PlaceSost" :info="getInfo('DocDefinitionOne.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              <wizard-item-prot-two id="DocDefinitionTwo" v-if="isVisible('DocDefinitionTwo')" ref="DocDefinitionTwo" :info="getInfo('DocDefinitionTwo')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-two>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 id="pet" class="adm-form__headding">Решение определения по ходатайству</h2>
            <div class="adm-form__content">
              <wizard-item-definition-pet id="DocDefinitionPet" v-if="isVisible('DocDefinitionPet')" ref="DocDefinitionPet" :info="getInfo('DocDefinitionPet')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-definition-pet>
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
    name: "WizardScenarioAddDefinitionPetition",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardItemDefinitionOne: () => import('~/components/wizard/items/definition/WizardItemDefinitionOne'),
      WizardItemPlace: () => import('~/components/wizard/items/WizardItemPlace'),
      WizardItemProtTwo: () => import('~/components/wizard/items/WizardItemProtTwo'),
      WizardItemDefinitionPet: () => import('~/components/wizard/items/definitionPetition/WizardItemDefinitionPet'),
    },
    methods: {
      listSectionNav() {
        return [
          {
            title: "Ввод данных об определение по ходатайству",
            name: "head",
          },
          {
            title: "Решение определения по ходатайству",
            name: "pet",
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
