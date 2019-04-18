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

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item 
            label="Уникальный почтовый идентификатор" 
            :value="body.upi" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/letter.svg')"
          />
          <view-data-item 
            label="Номер реестра" 
            :value="body.reestrN" 
            style="grid-column: span 2;"
          />
          <hr>
          <view-data-item 
            label="Дата отправки" 
            :value="body.dateOtpravVu | formatDateTime('DD.MM.YYYY')"
            :icon="require('../../assets/images/time.svg')"
          />
          <view-data-item 
            label="Участник дела" 
            :value="body.uchastName" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Место исполнения" 
            :value="body.placeIspoln.placeFull" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/map.svg')"
          />
          <view-data-item 
            label="Уведомление направлено по адресу" 
            :value="dopData.sendingAddress" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/map.svg')"
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
    name: "FrmEdIspolnPostUvedom",
    components: {
      ViewDataItem: () => import('~/components/shared/ui/view-data-item'),
    },
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
      dopData() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.dopData;
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
