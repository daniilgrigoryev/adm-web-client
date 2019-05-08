<template>
  <!-- Медиа документы -->
  <aside-template :listSectionNav="listSectionNav" title="Медиа документы">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">
              Медиа документы
            </h2>
            <div class="adm-form__content">
              <wizard-item-doc-photo v-if="isVisible('DocPhoto')" ref="DocPhoto" :info="getInfo('DocPhoto')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-doc-photo>
            </div>
          </div>
        </div>
      </Layout>
    </div>
    <div class="bot-wrap">
      <Button @click="getPrev" type="text">Отменить добавление документа</Button>
      <Button @click="save" type="primary" class="ml12">Добавить</Button>
    </div>
  </aside-template>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardScenarioAddDocPhoto",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardItemDocPhoto: () => import('~/components/wizard/items/WizardItemDocPhoto'),
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
          this.$store.dispatch('errors/changeContent', {
            title: resp.error.errorMsg,
            desc: resp.error.errorDesc,
          });
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
          this.$store.dispatch('errors/changeContent', {title: e.message.error,});
        }
      },
    }
  }
</script>

<style scoped>

</style>
