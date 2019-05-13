<template>
  <div v-if="currentInnerBean">
    <div class="hmin360">
      <component :is="currentTabComponent" :ref="currentTabComponent" @getMainDelo="getMainDelo"></component>
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
      FrmEdMediaMaterial: () => import('~/components/delo/FrmEdMediaMaterial'),
      FrmEdIspolnPostUvedom: () => import('~/components/delo/FrmEdIspolnPostUvedom'),
      FrmEdVuPred: () => import('~/components/delo/FrmEdVuPred'),
      FrmEdVuVyd: () => import('~/components/delo/FrmEdVuVyd'),
      FrmEdDocsOpred: () => import('~/components/delo/FrmEdDocsOpred'),
      FrmEdDocsPost: () => import('~/components/delo/FrmEdDocsPost'),

      FrmEdDecisShtraf: () => import('~/components/delo/decis/FrmEdDecisShtraf'),
      FrmEdDecisRasm: () => import('~/components/delo/decis/FrmEdDecisRasm'),
      FrmEdDecisLish: () => import('~/components/delo/decis/FrmEdDecisLish'),
      FrmEdDecisVozbDelo: () => import('~/components/delo/decis/FrmEdDecisVozbDelo'),
      FrmEdDecisPredup: () => import('~/components/delo/decis/FrmEdDecisPredup'),
      FrmEdDecisPost: () => import('~/components/delo/decis/FrmEdDecisPost'),

      FrmEdIspolnShtraf: () => import('~/components/delo/FrmEdIspolnShtraf'),
      FrmEdVehsAMTC: () => import('~/components/delo/FrmEdVehsAMTC'),
      FrmEdProtPZTC: () => import('~/components/delo/FrmEdProtPZTC'),
      FrmEdUchastFL: () => import('~/components/delo/FrmEdUchastFL'),
      FrmEdDocsProt: () => import('~/components/delo/FrmEdDocsProt'),
      FrmEdDelo: () => import('~/components/delo/FrmEdDelo'),
    },
    computed: {
      currentTabComponent() {
        let res = null;
        switch (this.currentInnerBean.beanName) {
          case 'FrmEdDelo': {
            res = 'FrmEdDelo';
            break;
          }
          case 'FrmEdUchastFL':
          case 'FrmEdUchastUL':
          case 'FrmEdUchastOther': {
            res = 'FrmEdUchastFL';
            break;
          }
          case 'FrmEdVuPred': {
            res = 'FrmEdVuPred';
            break;
          }
          case 'FrmEdVuVyd': {
            res = 'FrmEdVuVyd';
            break;
          }
          case 'DlgAdvice': {
            res = 'DlgAdvice';
            break;
          }
          case 'DlgEdFotoMaterial': {
            res = 'DlgEdFotoMaterial';
            break;
          }
          case 'FrmEdDocsPost': {
            res = 'FrmEdDocsPost';
            break;
          }
          case 'FrmEdDocsOpred': {
            res = 'FrmEdDocsOpred';
            break;
          }
          case 'FrmEdDecisShtraf': {
            res = 'FrmEdDecisShtraf';
            break;
          }
          case 'FrmEdDecisRasm': {
            res = 'FrmEdDecisRasm';
            break;
          }
          case 'FrmEdDecisLish': {
            res = 'FrmEdDecisLish';
            break;
          }
          case 'FrmEdDecisPredup': {
            res = 'FrmEdDecisPredup';
            break;
          }
          case 'FrmEdDecisArest': {
            res = 'FrmEdDecisArest';
            break;
          }
          case 'FrmEdDecisMandWork': {
            res = 'FrmEdDecisMandWork';
            break;
          }
          case 'FrmEdDecisPost': {
            res = 'FrmEdDecisPost';
            break;
          }
          case 'FrmEdIspolnShtraf': {
            res = 'FrmEdIspolnShtraf';
            break;
          }
          case 'FrmEdVehsAMTC': {
            res = 'FrmEdVehsAMTC';
            break;
          }
          case 'FrmEdDocsOtherPZTC': {
            res = 'FrmEdProtPZTC';
            break;
          }
          case 'FrmEdDocsProt': {
            res = 'FrmEdDocsProt';
            break;
          }
          case 'FrmEdIspolnPostUvedom': {
            res = 'FrmEdIspolnPostUvedom';
            break;
          }
          case 'FrmEdDecisVozbDelo': {
            res = 'FrmEdDecisVozbDelo';
            break;
          }
          case 'FrmEdMediaMaterial': {
            res = 'FrmEdMediaMaterial';
            break;
          }
        }
        let component = this.$refs[res];
        if (component) {
          component.init();
        }
        return res;
      }
    },
    methods: {
      getMainDelo(mainDeloId) {
        this.$emit('getMainDelo', mainDeloId);
      },
      addForm(form) {
        this.$emit('addForm', form);
      },
    }
  }
</script>
