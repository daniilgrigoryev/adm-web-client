<template>
  <div v-if="body" class="ml18">
    <div class="amd-title amd-title--sticky px36 pt24 pb18"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getDecisEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Исполнение по решению - Оплата штрафа</b>
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
            <img src="../../assets/images/rub.svg" class="mx-auto block" style="filter: grayscale(100%);" alt="">
          </div>
          <div class="ml18 w-full">
            <div class="grid">
              <div class="col col--12">
                <p class="adm-14 color-dark-lighter mb6">Сумма оплаты штрафа</p>
                <p class="adm-text-big color-dark-base">{{body.sumOpl || 'нет информации'}}</p>
              </div>
            </div>
          </div>
        </div>



        
        <div class="ml60 mt12" style="border-top: 1px solid #CCCCCC;">
          <div class="my12">
            <div class="grid">
              <div class="col col--12">
                <p class="adm-14 color-dark-lighter mb6">Дата оплаты штрафа</p>
                <p class="adm-text-big color-dark-base">{{body.dateStadIspoln | formatDateTime('DD.MM.YYYY HH:mm') || 'нет информации'}}</p>
              </div>
            </div>
          </div>
          <div class="my12">
            <div class="grid">
              <div class="col col--12">
                <p class="adm-14 color-dark-lighter mb6">УИП</p>
                <p class="adm-text-big color-dark-base">{{body.uip || 'нет информации'}}</p>
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
    name: "FrmEdIspolnShtraf",
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
        await this.$store.dispatch('frmEdIspolnShtrafSetCid', currentForm.cid);

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
        this.$store.watch(this.$store.getters.frmEdIspolnShtrafGetCommand, async () => {
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
      this.$store.dispatch('frmEdIspolnShtrafSetCid', null);
      this.$store.dispatch('frmEdIspolnShtrafSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdIspolnShtrafGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
    },
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
    min-width: 150px;
    padding-right: 12px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
