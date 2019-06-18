<template>
  <div v-if="body"><!-- class="px36 pb6" -->
    <frm-ed-uchast-f-l-individ v-if="body.individ.id" :delo="delo"></frm-ed-uchast-f-l-individ>
    <frm-ed-uchast-f-l-organization v-if="body.organization.id" :delo="delo"></frm-ed-uchast-f-l-organization>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdUchastFL",
    props: {
      delo: Object
    },
    components: {
      FrmEdUchastFLIndivid: () => import('~/components/delo/FrmEdUchastFLIndivid'),
      FrmEdUchastFLOrganization: () => import('~/components/delo/FrmEdUchastFLOrganization')
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdUchastFLGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let resp = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': resp});
          } catch (e) {
            this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
          }
        });
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdUchastFLSetCid', null);
      this.$store.dispatch('frmEdUchastFLSetData', null);
    },
    data() {
      return {}
    },
    methods: {
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
          await this.$store.dispatch('frmEdUchastFLSetCid', currentForm.cid);

          let prepareParams = {
            method: 'restore',
            cid: currentForm.cid
          };
          if (funcUtils.isEmpty(currentForm.restore)) {
            prepareParams.method = 'getData';
            prepareParams.params = {
              'node': currentForm.params
            };
            currentForm.restore = true;
          } else {
            delete currentForm['restore'];
          }
          innerFormStack.updateCurrent(currentForm);
          let eventResponse = await RequestApi.prepareData(prepareParams);
          await this.$store.dispatch('fillModule', {'event': eventResponse});
        } catch (e) {
          this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
        }
      },
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdUchastFLGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      }
    },
  }
</script>

<style scoped>

</style>
