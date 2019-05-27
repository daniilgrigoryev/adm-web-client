<template>
  <!-- Извещение -->
  <aside-template :listSectionNav="listSectionNav" title="Извещение">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">
              Извещение
            </h2>
            <div class="adm-form__content">
              <wizard-item-advice-one v-if="isVisible('AdviceOne')" ref="AdviceOne" :info="getInfo('AdviceOne')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-advice-one>
              <wizard-item-place v-if="isVisible('AdviceOne.PlaceSost')" ref="AdviceOne.PlaceSost" :info="getInfo('AdviceOne.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              <wizard-item-advice-two v-if="isVisible('AdviceTwo')" ref="AdviceTwo" :info="getInfo('AdviceTwo')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-advice-two>
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
    name: "WizardScenarioAddAdvice",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardItemPlace: () => import('~/components/wizard/items/WizardItemPlace'),
      WizardItemAdviceOne: () => import('~/components/wizard/items/advice/WizardItemAdviceOne'),
      WizardItemAdviceTwo: () => import('~/components/wizard/items/advice/WizardItemAdviceTwo')
    },
    data() {
      return {
        listSectionNav: []
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
          this.$store.dispatch('errors/changeContent', {title: resp.error.errorMsg, desc: resp.error.errorDesc,});
        } else {
          let stack = formStack.getStack();
          let prev = stack.indexOf(stack.size() - 2);
          prev.params.scenarioResult = resp.data;
          formStack.updateStack(stack);
          this.getPrev();
        }
      },
      getPrev() {
        try {
          formStack.toPrev({
            vm: this
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
