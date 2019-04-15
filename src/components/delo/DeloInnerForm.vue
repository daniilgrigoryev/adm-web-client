<template>
  <div v-if="sizeInnerStack > 0 && current" class="">

    <div class="hmin360">
      <frm-ed-delo v-if="isVisible('FrmEdDelo')" @getMainDelo="getMainDelo"></frm-ed-delo>
      <frm-ed-docs-post v-if="isVisible('FrmEdDocsPost')"></frm-ed-docs-post>
      <frm-ed-docs-opred v-if="isVisible('FrmEdDocsOpred')"></frm-ed-docs-opred>
      <frm-ed-decis-shtraf v-if="isVisible('FrmEdDecisShtraf')"></frm-ed-decis-shtraf>
      <frm-ed-ispoln-shtraf v-if="isVisible('FrmEdIspolnShtraf')"></frm-ed-ispoln-shtraf>
      <frm-ed-vehs-a-m-t-c v-if="isVisible('FrmEdVehsAMTC')"></frm-ed-vehs-a-m-t-c>
      <frm-ed-prot-p-z-t-c v-if="isVisible('FrmEdDocsOtherPZTC')"></frm-ed-prot-p-z-t-c>
      <frm-ed-uchast-f-l v-if="isVisible('FrmEdUchastFL')"></frm-ed-uchast-f-l>
      <frm-ed-uchast-f-l v-if="isVisible('FrmEdUchastUL')"></frm-ed-uchast-f-l>
      <frm-ed-uchast-f-l v-if="isVisible('FrmEdUchastOther')"></frm-ed-uchast-f-l>
      <frm-ed-vu-pred v-if="isVisible('FrmEdVuPred')"></frm-ed-vu-pred>
      <frm-ed-vu-vyd v-if="isVisible('FrmEdVuVyd')"></frm-ed-vu-vyd>
      <frm-ed-ispoln-post-uvedom v-if="isVisible('FrmEdIspolnPostUvedom')"></frm-ed-ispoln-post-uvedom>
      <dlg-ed-foto-material v-if="isVisible('DlgEdFotoMaterial')"></dlg-ed-foto-material>
      <frm-ed-docs-prot v-if="isVisible('FrmEdDocsProt')"></frm-ed-docs-prot>
      <dlg-advice v-if="isVisible('DlgAdvice')"></dlg-advice>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";

  export default {
    name: "DeloInnerForm",
    props: {
      sizeInnerStack: Number
    },
    components: {
      DlgAdvice: () => import('~/components/delo/DlgAdvice'),
      DlgEdFotoMaterial: () => import('~/components/delo/DlgEdFotoMaterial/DlgEdFotoMaterial'),
      FrmEdIspolnPostUvedom: () => import('~/components/delo/FrmEdIspolnPostUvedom'),
      FrmEdVuPred: () => import('~/components/delo/FrmEdVuPred'),
      FrmEdVuVyd: () => import('~/components/delo/FrmEdVuVyd'),
      FrmEdDocsOpred: () => import('~/components/delo/FrmEdDocsOpred'),
      FrmEdDocsPost: () => import('~/components/delo/FrmEdDocsPost'),
      FrmEdDecisShtraf: () => import('~/components/delo/FrmEdDecisShtraf'),
      FrmEdIspolnShtraf: () => import('~/components/delo/FrmEdIspolnShtraf'),
      FrmEdVehsAMTC: () => import('~/components/delo/FrmEdVehsAMTC'),
      FrmEdProtPZTC: () => import('~/components/delo/FrmEdProtPZTC'),
      FrmEdUchastFL: () => import('~/components/delo/FrmEdUchastFL'),
      FrmEdDocsProt: () => import('~/components/delo/FrmEdDocsProt'),
      FrmEdDelo: () => import('~/components/delo/FrmEdDelo'),
    },
    async created() {
      try {
        this.init();
      } catch (e) {
        alert(e.message);
      }
    },
    data() {
      return {
        current: null
      }
    },
    computed: {},
    methods: {
      init() {
        if (this.sizeInnerStack > 0) {
          let current = formStack.getCurrent();
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          this.current = innerFormStack.getCurrent(uid);
          this.current.restore = true;
        }
      },
      async addForm(node) {
        let currentModule = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + currentModule.cid;
        let eventResponse = await RequestApi.prepareData({
          method: 'getBeanNameByNode',
          params: {
            node: node
          }
        });
        let beanName = JSON.parse(eventResponse.response).data.beanName;
        let current = await innerFormStack.toNext({
          beanName: beanName,
          params: node,
          uid: uid
        });
        await this.updateSizeStack();
        this.current = current;
      },
      async removeForm() {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        await innerFormStack.toPrev({
          uid: uid
        });
        await this.updateSizeStack();
        this.current = innerFormStack.getCurrent(uid);
      },
      async updateSizeStack() {
        await this.$emit('updateSizeStack');
      },
      clearCurrent() {
        this.current = null;
      },
      isVisible(beanName) {
        return funcUtils.isNotEmpty(this.current) && this.current.beanName === beanName;
      },
      getMainDelo(mainDeloId) {
        this.$emit('getMainDelo', mainDeloId);
      }
    }
  }
</script>
