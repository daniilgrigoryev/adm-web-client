<template>
  <div v-if="body" class="ml18 mb18">
    <div class="amd-title amd-title--sticky px36 py24"><!-- wmax940 mx-auto -->
        <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
          <div class="flex-parent flex-parent--center-cross">
            <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
              <img src='../../assets/images/pen.svg' class="wmax-none">
            </Button>
            <b class="adm-text-big color-dark-lighter">Извещение</b>
          </div>
          <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
            <img src='../../assets/images/wiki.svg' class="wmax-none">
          </Button> -->
        </div>
    </div>



    <div class="adm-form">
      <div class="adm-form__container my0 mx0 py12 px36">
        <div class="adm-form__content">
          <div class="ml60">
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Номер извещения</p>
                  <p class="adm-text-big color-dark-base">{{body.docN || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Дата составления</p>
                  <p class="adm-text-big color-dark-base">{{body.dateSost | formatDateTime('DD.MM.YYYY') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Рассмотрения</p>
                  <p class="adm-text-big color-dark-base">{{body.dateRasm | formatDateTime('DD.MM.YYYY') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Вручения</p>
                  <p class="adm-text-big color-dark-base">{{body.dateUved | formatDateTime('DD.MM.YYYY') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Код сотрудника - Ф.И.О.</p>
                  <p class="adm-text-big color-dark-base">{{body.inspSostKod, body.inspSostName  | concatByDelimiter('-') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Звание, Должность</p>
                  <p class="adm-text-big color-dark-base">{{body.inspSostRang, body.inspSostDolz | concatByDelimiter(',') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Место составления извещения</p>
                  <p class="adm-text-big color-dark-base">{{body.placeSost.placeFull || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Статья основания</p>
                  <p class="adm-text-big color-dark-base">{{body.stotvKod, body.stotvName | concatByDelimiter(',') || 'нет информации'}}</p>
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
  import {mapGetters} from 'vuex';

  export default {
    name: "DlgAdvice",
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
        await this.$store.dispatch('dlgAdviceSetCid', currentForm.cid);

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
        this.$store.watch(this.$store.getters.dlgAdviceGetCommand, async () => {
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
      this.$store.dispatch('dlgAdviceSetCid', null);
      this.$store.dispatch('dlgAdviceSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'dlgAdviceGetData'
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
      isNotEmptyField(field) {
        if (typeof field === 'string') {
          return funcUtils.isNotEmpty(field) && field.length > 0;
        }
        return funcUtils.isNotEmpty(field);
      },
    }
  }
</script>


<style scoped lang="scss">
  .adm-form-content{

  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
    // outline: 1px solid red;
    padding-bottom: 20px;
    // min-height: 90px;
  }
  .adm-form__label{
    padding: 0;
    padding-right: 12px;
    min-width: 210px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
