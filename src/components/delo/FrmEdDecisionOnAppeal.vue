<template>
  <div v-if="body" class="mb18">
    <div class="adm-title amd-title--sticky px36 py24">
        <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
          <div class="flex-parent flex-parent--center-cross">
            <Button  type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24 bg-transparent" title="Редактировать">
              <!-- <img src='../../assets/images/icons/pen.svg' class="wmax-none"> -->
            </Button>
            <b class="adm-text-big color-dark-lighter">Решения по жалобе</b>
          </div>
        </div>
    </div>


    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item
            label="Дата решения по жалобе"
            :value="body.dateSost"
          />
          <!-- TODO -->
          <view-data-item
            label="Решение по жалобе/статус"
            :value="body.vxodNumb"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdDecisionOnAppeal",
    props: {
      delo: Object
    },
    components: {
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDecisionOnAppealGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
          }
        });
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdDecisionOnAppealSetCid', null);
      this.$store.dispatch('frmEdDecisionOnAppealSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDecisionOnAppealGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
    },
    methods: {
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
          await this.$store.dispatch('frmEdDecisionOnAppealSetCid', currentForm.cid);

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
    }
  }
</script>
