<template>
  <div v-if="currentInnerBeanName">
    <div class="hmin360">
      <frm-ed-delo v-if="isVisible('FrmEdDelo')" @getMainDelo="getMainDelo" ref="FrmEdDelo"></frm-ed-delo>
      <frm-ed-docs-post v-if="isVisible('FrmEdDocsPost')" ref="FrmEdDocsPost"></frm-ed-docs-post>
      <frm-ed-docs-opred v-if="isVisible('FrmEdDocsOpred')" ref="FrmEdDocsOpred"></frm-ed-docs-opred>
      <frm-ed-decis-shtraf v-if="isVisible('FrmEdDecisShtraf')" ref="FrmEdDecisShtraf"></frm-ed-decis-shtraf>
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
      currentInnerBeanName: String
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
    methods: {
      isVisible(beanName) {
        return this.currentInnerBeanName === beanName;
      },
      initInnerForm(beanName) {
        let innerForm = this.$refs[beanName];
        if (innerForm) {
          innerForm.init();
        }
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
