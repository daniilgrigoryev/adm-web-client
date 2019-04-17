<template>
  <div v-if="body" class="ml18">

    <div class="amd-title amd-title--sticky px36 pt24 pb18"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getDecisEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Решение по делу - Штраф</b>
        </div>
        <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button> -->
      </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="flex-parent flex-parent--center-cross">
          <div class="s40 mt12">
            <img src="../../assets/images/penalty.svg" class="mx-auto block" style="filter: grayscale(100%);" alt="">
          </div>
          <div class="ml18 w-full">
            <div class="grid">
              <div class="col col--12">
                <p class="adm-14 color-dark-lighter mb6">Сумма штрафа</p>
                <p class="adm-text-big" :class="{'color-dark-base' : body.sumShtraf != null, 'color-gray-medium' : body.sumShtraf == null}">{{body.sumShtraf || 'нет информации'}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="ml60 mt12" style="border-top: 1px solid #CCCCCC;">
          <div class="my12">
            <div class="grid">
              <div class="col col--12">
                <p class="adm-14 color-dark-lighter mb6">Дата решения</p>
                <p class="adm-text-big" :class="{'color-dark-base' : body.decisDate != null, 'color-gray-medium' : body.decisDate == null}">{{body.decisDate | formatDateTime('DD.MM.YYYY') || 'нет информации'}}</p>
              </div>
            </div>
          </div>
          <div class="my12">
            <div class="grid">
              <div class="col col--12">
                <p class="adm-14 color-dark-lighter mb6">Дата вручения</p>
                <p class="adm-text-big" :class="{'color-dark-base' : body.dateUved != null, 'color-gray-medium' : body.dateUved == null}">{{body.dateUved | formatDateTime('DD.MM.YYYY') || 'нет информации'}}</p>
              </div>
            </div>
          </div>
          <div class="my12">
            <div class="grid">
              <div class="col col--12">
                <p class="adm-14 color-dark-lighter mb6">Дата вступления</p>
                <p class="adm-text-big" :class="{'color-dark-base' : body.dateVstup != null, 'color-gray-medium' : body.dateVstup == null}">{{body.dateVstup | formatDateTime('DD.MM.YYYY') || 'нет информации'}}</p>
              </div>
            </div>
          </div>
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
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
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
        }
        delete currentForm['restore'];
        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch('fillModule', {'event': eventResponse});

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDecisShtrafGetCommand, async () => {
          try {
            let current = formStack.getCurrent();
            let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
            let currentForm = innerFormStack.getCurrent(uid);
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            alert(e.message);
          }
        });
      } catch (e) {
        alert(e.message);
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
      getDecisEdit() {
        try {
          let current = formStack.getCurrent();
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          let currentForm = innerFormStack.getCurrent(uid);
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
          alert(e.message);
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .adm-form-content{
    // border: 1px solid #000;
  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    // min-height: 90px;
    // outline: 1px solid;
  }
  .adm-form__label{
    padding: 0;
    min-width: 130px;
    padding-right: 12px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
