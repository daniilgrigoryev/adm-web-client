<template>
  <div v-if="body" class="ml18"><!-- wmax1280 mx-auto -->
    <!-- постановление по делу -->

    <div class="amd-title amd-title--sticky px36 pt24 pb18"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button  @click="getDocsPostEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Постановление по делу № {{ body.docN }} от {{ body.dateSost | formatDateTime('DD.MM.YYYY') }}</b>
        </div>
        <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button> -->
      </div>
      <!-- <div class="adm-nav-jump">
        <a href='#regulation' class='link color-blue-base adm-txt-regular mx18 inline-block'>Постановление составил</a>
        <a href='#violation' class='link color-blue-base adm-txt-regular mx18 inline-block'>Нарушение</a>
        <a href='#decision' class='link color-blue-base adm-txt-regular mx18 inline-block'>Решение по делу</a>
      </div> -->
    </div>


    <div class="view-data">
      <div class="view-data__container">


          <div class="flex-parent flex-parent--center-cross">
            <div class="s40 mt12">
              <img src="../../assets/images/case_decision.svg" class="mx-auto block" style="filter: grayscale(100%);" alt="">
            </div>
            <div class="ml18 w-full">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Пункт НПА</p>
                  <p class="adm-text-big color-dark-base">{{body.pnpaKod, body.pnpaName | concatByDelimiter(',') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="ml60">
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Статья КРФоАП</p>
                  <p class="adm-text-big color-dark-base">{{body.stotvKod, body.stotvName | concatByDelimiter(',') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
          </div>

            <div class="flex-parent">
              <div class="s40 mt18">
                <img src="../../assets/images/ispolnUved.png" class="mx-auto block" style="filter: grayscale(100%); width: 35px;" alt="">
              </div>
              <div class="ml18 w-full" style="border-top: 1px solid #CCCCCC; border-bottom: 1px solid #CCCCCC;">
                <div class="my12">
                  <div class="grid">
                    <div class="col col--12">
                      <p class="adm-14 color-dark-lighter mb6">Дата вручения</p>
                      <p class="adm-text-big color-dark-base">{{body.datUved | formatDateTime('DD.MM.YYYY') || 'нет информации'}}</p>
                    </div>
                  </div>
                </div>
                <div class="my12">
                  <div class="grid">
                    <div class="col col--12">
                      <p class="adm-14 color-dark-lighter mb6">Дата вступления</p>
                      <p class="adm-text-big color-dark-base">{{body.dateSost | formatDateTime('DD.MM.YYYY') || 'нет информации'}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="flex-parent">
             <div class="s40 mt18">
                <img src="../../assets/images/police.svg" class="mx-auto block" style="filter: grayscale(100%); width: 30px;" alt="">
              </div>
              <div class="ml18 w-full">
                <div class="mt12">
                  <div class="grid">
                    <div class="col col--12">
                      <p class="adm-14 color-dark-lighter mb6">Должностное лицо</p>
                      <p class="adm-text-big color-dark-base">{{body.inspSostName, body.inspSostDolz, body.inspSostRang | concatByDelimiter(',') || 'нет информации'}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div class="ml60">
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
    name: "FrmEdDocsPost",
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
        await this.$store.dispatch('frmEdDocsPostSetCid', currentForm.cid);

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
        this.$store.watch(this.$store.getters.frmEdDocsPostGetCommand, async () => {
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
      this.$store.dispatch('frmEdDocsPostSetCid', null);
      this.$store.dispatch('frmEdDocsPostSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDocsPostGetData'
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
      getDocsPostEdit() {
        try {
          let current = formStack.getCurrent();
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          let currentForm = innerFormStack.getCurrent(uid);
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDocsPostEdit,
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
    min-height: 80px;
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
