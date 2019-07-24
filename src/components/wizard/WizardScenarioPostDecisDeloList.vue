<!-- prettier-ignore -->
<template>
  <aside-template :listSectionNav="listSectionNav()" title="Постановление с решением по делу">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <wizard-item-doc-post-first id="head" v-if="isVisible('DocPostFirst')" ref="DocPostFirst" :info="getInfo('DocPostFirst')" @storeElementData="storeElementData" @updateComponents="updateComponents">
            <wizard-item-place v-if="isVisible('DocPostFirst.PlaceSost')" ref="DocPostFirst.PlaceSost" :info="getInfo('DocPostFirst.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
          </wizard-item-doc-post-first>
          <div class="adm-form__container" id="decis" v-if="isVisible('DecisMain')">
            <h2 class="adm-form__headding">Решение по делу</h2>
            <div class="adm-form__content">
              <wizard-item-decis id="DecisMain" v-if="isVisible('DecisMain')" ref="DecisMain" :info="getInfo('DecisMain')" @storeElementData="storeElementData" title="Решение по делу" @updateComponents="updateComponents"></wizard-item-decis>
              <wizard-item-decis id="DecisAdd" v-if="isVisible('DecisAdd')" ref="DecisAdd" :info="getInfo('DecisAdd')" @storeElementData="storeElementData" title="Дополнительное решение по делу" @updateComponents="updateComponents"></wizard-item-decis>
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
    name: "WizardScenarioPostDecisDeloList",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate: () => import ('~/components/templates/AsideTemplate'),
      WizardItemDecis: () => import('~/components/wizard/items/WizardItemDecis'),
      WizardItemDocPostFirst: () => import('~/components/wizard/items/docPost/WizardItemDocPostFirst.vue'),
      WizardItemPlace: () => import('~/components/wizard/items/WizardItemPlace'),
    },
    data() {
      return {
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
          this.$store.dispatch('errorsModal/changeContent', {title: eventResp.error.errorMsg, desc: eventResp.error.errorDesc,});
        } else {
          let errorsLength = 0;
          let errors = {
            id: [],
            text: [],
          };
          let deloErrors = eventResp.data.deloErrors;
          for (const key in deloErrors) {
            if (deloErrors[key]) {
              errors.text.push(`Дело id:${key}`);
              errors.id.push(+key);
              errorsLength++;
            }
          }
          if (errorsLength > 0) {
            this.protDecisDeloListResponseProcessing(errors);
            return;
          }
          let stack = formStack.getStack();
          let prev = stack.indexOf(stack.size() - 2);
          if (funcUtils.isEmpty(prev.params)) {
            prev.params = {
              scenarioResult: eventResp.data
            };
          }
          prev.params.scenarioResult = eventResp.data;
          formStack.updateStack(stack);
          this.getPrev();
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
      async protDecisDeloListResponseProcessing(errors) {
        await this.$store.dispatch('deloReestrForPostSetDeloErrors', errors.id);
        await this.getPrev();
        if (errors.text.length) {
          this.$store.dispatch('errorsModal/changeContent', {
            title: "При создании постановлений дела с ошибками были пропущены:",
            desc: errors.text.join("<br>")
          });
        }
      },
    }
  }
</script>

<style scoped>
</style>
