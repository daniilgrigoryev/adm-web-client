<template>
  <div v-if="body" class="ml18">

    <div class="amd-title amd-title--sticky px36 pt24 pb18">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <!-- <Button @click="getPrev" type="text" style="outline: 0!important;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus" title="редактирование постановления">
            <Icon type="ios-arrow-dropleft" class=" " :size="35" />
          </Button> -->
          <b class="adm-text-big color-dark-lighter">Почтовое уведомление</b>
        </div>
      </div>
    </div>

    <div class="adm-form">
      <div class="adm-form__container my0 mx0 py12 px36">
        <div class="adm-form__content">
          <div class="ml60">
            <div class="w-full">
              <div class="my12">
                <div class="grid">
                  <div class="col col--12">
                    <p class="adm-14 color-dark-lighter mb6">Уникальный почтовый идентификатор</p>
                    <p class="adm-text-big color-dark-base">{{body.upi || 'нет информации'}}</p>
                  </div>
                </div>
              </div>
              <div class="my12">
                <div class="grid">
                  <div class="col col--12">
                    <p class="adm-14 color-dark-lighter mb6">Номер реестра</p>
                    <p class="adm-text-big color-dark-base">{{body.reestrN || 'нет информации'}}</p>
                  </div>
                </div>
              </div>
              <div class="my12">
                <div class="grid">
                  <div class="col col--12">
                    <p class="adm-14 color-dark-lighter mb6">Дата отправки</p>
                    <p class="adm-text-big color-dark-base">{{body.dateOtpravVu | formatDateTime('DD.MM.YYYY') || 'нет информации'}}</p>
                  </div>
                </div>
              </div>
              <div class="my18" style="border-top: 1px solid #CCCCCC;">
                <div class="my12">
                  <div class="grid">
                    <div class="col col--12">
                      <p class="adm-14 color-dark-lighter mb6">Участник дела</p>
                      <p class="adm-text-big color-dark-base">{{body.uchastName || 'нет информации'}}</p>
                    </div>
                  </div>
                </div>
                <div class="my12">
                  <div class="grid">
                    <div class="col col--12">
                      <p class="adm-14 color-dark-lighter mb6">Место исполнения</p>
                      <p class="adm-text-big color-dark-base">{{body.placeIspoln.placeFull || 'нет информации'}}</p>
                    </div>
                  </div>
                </div>

                <div class="my12">
                  <div class="grid">
                    <div class="col col--12">
                      <p class="adm-14 color-dark-lighter mb6">Уведомление направлено по адресу</p>
                      <p class="adm-text-big color-dark-base">{{body.placeIspoln.placeFull || 'нет информации'}}</p>
                    </div>
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
    name: "FrmEdIspolnPostUvedom",
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
        await this.$store.dispatch('frmEdIspolnPostUvedomSetCid', currentForm.cid);

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
        this.$store.watch(this.$store.getters.frmEdIspolnPostUvedomGetCommand, async () => {
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
      this.$store.dispatch('frmEdIspolnPostUvedomSetCid', null);
      this.$store.dispatch('frmEdIspolnPostUvedomSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdIspolnPostUvedomGetData'
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
    min-width: 210px;
    padding-right: 12px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
