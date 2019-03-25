<template>
  <div v-if="sizeInnerStack > 0 && current" class="bg-white">

    <div class="hmin360">
      <frm-ed-delo v-if="isVisible('FrmEdDelo')"></frm-ed-delo>
      <frm-ed-docs-post v-if="isVisible('FrmEdDocsPost')"></frm-ed-docs-post>
      <frm-ed-docs-opred v-if="isVisible('FrmEdDocsOpred')"></frm-ed-docs-opred>
      <frm-ed-decis-shtraf v-if="isVisible('FrmEdDecisShtraf')"></frm-ed-decis-shtraf>
      <frm-ed-ispoln-shtraf v-if="isVisible('FrmEdIspolnShtraf')"></frm-ed-ispoln-shtraf>
      <frm-ed-vehs-a-m-t-c v-if="isVisible('FrmEdVehsAMTC')"></frm-ed-vehs-a-m-t-c>
      <frm-ed-prot-p-z-t-c v-if="isVisible('FrmEdProtPZTC')"></frm-ed-prot-p-z-t-c>
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
  import FrmEdDelo from "~/components/delo/FrmEdDelo";
  import FrmEdDocsPost from "~/components/delo/FrmEdDocsPost";
  import FrmEdDocsOpred from "~/components/delo/FrmEdDocsOpred";
  import FrmEdDecisShtraf from "~/components/delo/FrmEdDecisShtraf";
  import FrmEdIspolnShtraf from "~/components/delo/FrmEdIspolnShtraf";
  import FrmEdVehsAMTC from "~/components/delo/FrmEdVehsAMTC";
  import FrmEdProtPZTC from "~/components/delo/FrmEdProtPZTC";
  import FrmEdUchastFL from "~/components/delo/FrmEdUchastFL";
  import FrmEdVuPred from "~/components/delo/FrmEdVuPred";
  import FrmEdVuVyd from "~/components/delo/FrmEdVuVyd";
  import FrmEdIspolnPostUvedom from "~/components/delo/FrmEdIspolnPostUvedom";
  import FrmEdDocsProt from "~/components/delo/FrmEdDocsProt";
  import DlgEdFotoMaterial from "~/components/delo/DlgEdFotoMaterial";
  import DlgAdvice from "~/components/delo/DlgAdvice";

  export default {
    name: "DeloInnerForm",
    props: {
      sizeInnerStack: Number
    },
    components: {
      DlgAdvice,
      DlgEdFotoMaterial,
      FrmEdIspolnPostUvedom,
      FrmEdVuPred,
      FrmEdVuVyd,
      FrmEdDocsOpred,
      FrmEdDocsPost,
      FrmEdDecisShtraf,
      FrmEdIspolnShtraf,
      FrmEdVehsAMTC,
      FrmEdUchastFL,
      FrmEdDocsProt,
      FrmEdDelo
    },
    async created() {
      try {
        if (this.sizeInnerStack > 0) {
          let current = formStack.getCurrent();
          this.current = innerFormStack.getCurrent({
            uid: current.moduleName
          });
          this.current.restore = true;
        }
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
      async addForm(node) {
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
          uid: this.$store.state.deloTreeCardView.moduleName
        });
        await this.updateSizeStack();
        this.current = current;
      },
      async removeForm() {
        let current = formStack.getCurrent();
        await innerFormStack.toPrev({
          uid: current.moduleName
        });
        await this.updateSizeStack();
        this.current = innerFormStack.getCurrent({
          uid: current.moduleName
        });
      },
      async updateSizeStack() {
        await this.$emit('updateSizeStack', {
          uid: formStack.getCurrent().moduleName
        });
      },
      clearCurrent() {
        this.current = null;
      },
      isVisible(beanName) {
        return funcUtils.isNotEmpty(this.current) && this.current.beanName === beanName;
      },
    }
  }
</script>

<style scoped>

</style>
