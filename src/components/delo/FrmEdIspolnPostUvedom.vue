<template>
  <div v-if="body">

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
            :icon="require('../../assets/images/icons/izveschenie.svg')"
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
            :icon="require('../../assets/images/icons/time.svg')"
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
            :icon="require('../../assets/images/icons/map.svg')"
          />
          <view-data-item
            label="Уведомление направлено по адресу"
            :value="dopData.sendingAddress"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/map.svg')"
          />
        </div>
      </div>
    </div>

    <div class="errors-table errors-table--v2" v-if="dopData.postOpers">
      <div class="errors-table__container">
        <h2  @click="hideMore = !hideMore" class="adm-form__headding bg-white cursor-pointer flex-parent flex-parent--space-between-main">
          <span class="adm-h4 color-dark-lighter" style="line-height: inherit;">Сведения о прохождении почтового отправления</span>
          <Button type="text" class="bg-transparent" style="box-shadow: none;">
            <Icon v-if="hideMore" type="md-remove" class="color-gray" :size="25" title="свернуть" />
            <Icon v-else type="md-add" class="color-gray" :size="25" title="развернуть"/>
          </Button>
        </h2>
        <div class="errors-table__content" v-show="hideMore">
          <div class="view-data__container border--0">
            <div class="items-wrap">
              <view-data-item
                v-for="(item, index) in this.dopData.postOpers.slice().reverse()"
                :key="item.postOperName"
                :label="item.operTime, item.organIspolnName | concatByDelimiter('-')"
                :value="item.id"
                style="grid-column: span 2;"
                :icon="require('../../assets/images/icons/izveschenie.svg')"
              />
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
    name: "FrmEdIspolnPostUvedom",
    props: {
      delo: Object
    },
    data() {
      return {
        hideMore: false,
      }
    },
    components: {
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdIspolnPostUvedomGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            this.$store.dispatch('errors/changeContent', {title: e.message,});
          }
        });
      } catch (e) {
        this.$store.dispatch('errors/changeContent', {title: e.message,});
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
    methods: {
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
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
            currentForm.restore = true;
          } else {
            delete currentForm['restore'];
          }
          innerFormStack.updateCurrent(currentForm);
          let eventResponse = await RequestApi.prepareData(prepareParams);
          await this.$store.dispatch('fillModule', {'event': eventResponse});
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

  .errors-table{
    .table td{
      border-bottom: 0;
    }
    margin-top: 30px;
    .error-th{
      width: 60px;
    }
    .adm-table-simple thead tr th{
      padding: 8px 12px;
    }
    .adm-form__headding{
      height: 40px;
      line-height: 40px;
      padding-left: 40px;
    }
  }
  .errors-table--v2 .errors-table__container{
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.26), 0 0 4px 0 rgba(0,0,0,0.16);
    background: #fff;
  }
</style>
