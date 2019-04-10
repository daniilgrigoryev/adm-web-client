<template>
  <div v-if="body" class="ml18">
    <div class="amd-title amd-title--sticky px36 pt24 pb18">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getDocsProtEdit()" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Протокол об АНП</b>
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
                  <p class="adm-14 color-dark-lighter mb6">Пункт НПА</p>
                  <p class="adm-text-big color-dark-base">{{body.pnpaName || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Статья КРФоАП</p>
                  <p class="adm-text-big color-dark-base">{{body.stotvName || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Дата и время нарушения</p>
                  <p class="adm-text-big color-dark-base">{{body.dateNar | formatDateTime('DD.MM.YYYY HH:mm') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Место нарушения</p>
                  <p class="adm-text-big color-dark-base">{{body.placeNar.placeFull || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Должностное лицо</p>
                  <p class="adm-text-big color-dark-base">{{body.inspSostName, body.inspSostDolz | concatByDelimiter(' ') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Подразделение</p>
                  <p class="adm-text-big color-dark-base">{{body.organSostName || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Место вынесения</p>
                  <p class="adm-text-big color-dark-base">{{body.placeSost.placeFull || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Дата и время рассмотрения</p>
                  <p class="adm-text-big color-dark-base">{{body.dateRasm | formatDateTime('DD.MM.YYYY HH:mm') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Орган рассмотрения</p>
                  <p class="adm-text-big color-dark-base">{{body.organRasmName || 'нет информации'}}</p>
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
    name: "FrmEdDocsProt",
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
        await this.$store.dispatch('frmEdDocsProtSetCid', currentForm.cid);

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
        this.$store.watch(this.$store.getters.frmEdDocsProtGetCommand, async () => {
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
      this.$store.dispatch('frmEdDocsProtSetCid', null);
      this.$store.dispatch('frmEdDocsProtSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDocsProtGetData'
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
      getDocsProtEdit() {
        try {
          let current = formStack.getCurrent();
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          let currentForm = innerFormStack.getCurrent(uid);
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDocsProtEdit,
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
  .adm-form__label {
    min-width: 180px;
  }
</style>
