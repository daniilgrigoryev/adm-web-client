<template>
  <div v-if="currentInnerBean">
    <div class="hmin360">
      <frm-ed-delo v-if="isVisible('FrmEdDelo')" @getMainDelo="getMainDelo" ref="FrmEdDelo"></frm-ed-delo>
      <frm-ed-docs-post v-if="isVisible('FrmEdDocsPost')" ref="FrmEdDocsPost"></frm-ed-docs-post>
      <frm-ed-docs-opred v-if="isVisible('FrmEdDocsOpred')" ref="FrmEdDocsOpred"></frm-ed-docs-opred>
      <frm-ed-decis-shtraf v-if="isVisible('FrmEdDecisShtraf')" ref="FrmEdDecisShtraf"></frm-ed-decis-shtraf>
      <frm-ed-decis-lish v-if="isVisible('FrmEdDecisLish')" ref="FrmEdDecisLish"></frm-ed-decis-lish>
      <frm-ed-decis-vozb-delo v-if="isVisible('FrmEdDecisVozbDelo')" ref="FrmEdDecisVozbDelo"></frm-ed-decis-vozb-delo>

      <frm-ed-ispoln-shtraf v-if="isVisible('FrmEdIspolnShtraf')" ref="FrmEdIspolnShtraf"></frm-ed-ispoln-shtraf>
      <frm-ed-vehs-a-m-t-c v-if="isVisible('FrmEdVehsAMTC')" ref="FrmEdVehsAMTC"></frm-ed-vehs-a-m-t-c>
      <frm-ed-prot-p-z-t-c v-if="isVisible('FrmEdDocsOtherPZTC')" ref="FrmEdDocsOtherPZTC"></frm-ed-prot-p-z-t-c>
      <frm-ed-uchast-f-l v-if="isVisible('FrmEdUchastFL')" ref="FrmEdUchastFL"></frm-ed-uchast-f-l>
      <frm-ed-uchast-f-l v-if="isVisible('FrmEdUchastUL')" ref="FrmEdUchastUL"></frm-ed-uchast-f-l>
      <frm-ed-uchast-f-l v-if="isVisible('FrmEdUchastOther')" ref="FrmEdUchastOther"></frm-ed-uchast-f-l>
      <frm-ed-vu-pred v-if="isVisible('FrmEdVuPred')" ref="FrmEdVuPred"></frm-ed-vu-pred>
      <frm-ed-vu-vyd v-if="isVisible('FrmEdVuVyd')" ref="FrmEdVuVyd"></frm-ed-vu-vyd>
      <frm-ed-ispoln-post-uvedom v-if="isVisible('FrmEdIspolnPostUvedom')" ref="FrmEdIspolnPostUvedom"></frm-ed-ispoln-post-uvedom>
      <dlg-ed-foto-material v-if="isVisible('DlgEdFotoMaterial')" ref="DlgEdFotoMaterial"></dlg-ed-foto-material>
      <frm-ed-docs-prot v-if="isVisible('FrmEdDocsProt')" ref="FrmEdDocsProt"></frm-ed-docs-prot>
      <dlg-advice v-if="isVisible('DlgAdvice')" ref="DlgAdvice"></dlg-advice>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DeloInnerForm",
    props: {
      currentInnerBean: Object
    },
    components: {
      DlgAdvice: () => import('~/components/delo/DlgAdvice'),
      DlgEdFotoMaterial: () => import('~/components/delo/DlgEdFotoMaterial/DlgEdFotoMaterial'),
      FrmEdIspolnPostUvedom: () => import('~/components/delo/FrmEdIspolnPostUvedom'),
      FrmEdVuPred: () => import('~/components/delo/FrmEdVuPred'),
      FrmEdVuVyd: () => import('~/components/delo/FrmEdVuVyd'),
      FrmEdDocsOpred: () => import('~/components/delo/FrmEdDocsOpred'),
      FrmEdDocsPost: () => import('~/components/delo/FrmEdDocsPost'),
      FrmEdDecisShtraf: () => import('~/components/delo/decis/FrmEdDecisShtraf'),
      FrmEdDecisLish: () => import('~/components/delo/decis/FrmEdDecisLish'),
      FrmEdDecisVozbDelo: () => import('~/components/delo/decis/FrmEdDecisVozbDelo'),

      FrmEdIspolnShtraf: () => import('~/components/delo/FrmEdIspolnShtraf'),
      FrmEdVehsAMTC: () => import('~/components/delo/FrmEdVehsAMTC'),
      FrmEdProtPZTC: () => import('~/components/delo/FrmEdProtPZTC'),
      FrmEdUchastFL: () => import('~/components/delo/FrmEdUchastFL'),
      FrmEdDocsProt: () => import('~/components/delo/FrmEdDocsProt'),
      FrmEdDelo: () => import('~/components/delo/FrmEdDelo'),
    },
    updated() {
      if (this.currentInnerBean) {
        let currentForm = this.$refs[this.currentInnerBean.beanName];
        if (currentForm) {
          this.currentInnerBean.tag = currentForm.$vnode.componentOptions.tag;
        }

        let currentBean = this.currentBean;
        if (currentForm && currentBean && currentBean.tag === this.currentInnerBean.tag && currentBean.cid !== this.currentInnerBean.cid) {
          currentForm.init();
        }
        this.currentBean = this.currentInnerBean;
      }
    },
    data() {
      return {
        currentBean: null
      }
    },
    methods: {
      isVisible(beanName) {
        return this.currentInnerBean.beanName === beanName;
      },
      getMainDelo(mainDeloId) {
        this.$emit('getMainDelo', mainDeloId);
      },
      addForm(form) {
        this.$emit('addForm', form);
      },
    }
  }
</script>
