<template>
  <div v-if="body" class="ml18">


    <div class="adm-title px36 py24">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getVuPredEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Документ участника</b>
        </div>
        <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button> -->
      </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
          <div class="ml60">
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Тип документа</p>
                  <p class="adm-text-big color-dark-base">{{body.docTipName || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Номер</p>
                  <p class="adm-text-big color-dark-base">{{body.vuN || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Дата выдачи</p>
                  <p class="adm-text-big color-dark-base">{{body.dateVyd | formatDateTime('DD.MM.YYYY') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Кем выдан</p>
                  <p class="adm-text-big color-dark-base">{{body.ogaiVydName || 'нет информации'}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdVuPred",
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
        await this.$store.dispatch('frmEdVuPredSetCid', currentForm.cid);

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
        this.$store.watch(this.$store.getters.frmEdVuPredGetCommand, async () => {
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
      this.$store.dispatch('frmEdVuPredSetCid', null);
      this.$store.dispatch('frmEdVuPredSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdVuPredGetData'
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
      getVuPredEdit() {
        try {
          let current = formStack.getCurrent();
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          let currentForm = innerFormStack.getCurrent(uid);
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdVuPredEdit,
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
    padding-top: 12px;
    padding-bottom: 12px;
    // min-height: 90px;
    // outline: 1px solid;
  }
  .adm-form__label{
    padding: 0;
    min-width: 140px;
    padding-right: 12px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
