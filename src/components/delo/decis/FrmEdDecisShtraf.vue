<template>
  <div v-if="body" class="ml18">

    <div class="amd-title amd-title--sticky px36 pt24 pb18">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getDecisEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Решение по делу - {{body.decisName }}</b>
        </div>
      </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item
            label="Сумма штрафа"
            :value="body.sumShtraf"
            style="grid-column: span 2;"
            :icon="require('../../../assets/images/penalty_gray.svg')"
          />
          <hr>
          <view-data-item 
            label="Дата решения" 
            :value="body.decisDate | formatDateTime('DD.MM.YYYY')" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Дата вручения" 
            :value="body.dateUved | formatDateTime('DD.MM.YYYY')" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Дата вступления" 
            :value="body.dateVstup | formatDateTime('DD.MM.YYYY')" 
            style="grid-column: span 2;"
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
    name: "FrmEdDecisShtraf",
    components: {
      ViewDataItem: () => import('~/components/shared/ui/view-data-item'),
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDecisShtrafGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            this.$store.dispatch('errors/changeContent', {title: e.message.error,});
          }
        });
      } catch (e) {
        this.$store.dispatch('errors/changeContent', {title: e.message.error,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdDecisShtrafSetCid', null);
      this.$store.dispatch('frmEdDecisShtrafSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDecisShtrafGetData'
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
          await this.$store.dispatch('frmEdDecisShtrafSetCid', currentForm.cid);

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
          this.$store.dispatch('errors/changeContent', {title: e.message.error,});
        }
      },
      getDecisEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDecisEdit,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message.error,});
        }
      },
    }
  }
</script>

