<template>
  <div v-if="body" class="ml18">
    <div class="amd-title amd-title--sticky px36 pt24 pb18"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getIspolnEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/icons/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Стадия исполнения - {{body.stadIspolnName}}</b>
        </div>
      </div>
    </div>


    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item
            label="Дата исполнения"
            :value="body.dateStadIspoln | formatDateTime('DD.MM.YYYY HH:mm')"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/time.svg')"
          />
          <template v-if="[constants.UPL_SHTRAF_GIBDD,constants.UPL_SHTRAF_SSP].includes(body.stadIspolnKod)">
            <view-data-item
              label="Сумма оплаты штрафа"
              :value="body.sumOpl"
              style="grid-column: span 2;"
              :icon="require('../../assets/images/icons/rub_gray.svg')"
            />
            <view-data-item
              label="УИП"
              :value="body.uip"
              style="grid-column: span 2;"
            />
          </template>
          <view-data-item
            label="Статья КРФоАп"
            :value="body.stotvName"
            style="grid-column: span 2;"
          />
          <view-data-item
            label="Место исполнения"
            :value="body.placeIspoln.placeFull"
            style="grid-column: span 2;"
          />
          <hr>
          <view-data-item
            label="Должностное лицо"
            :value="body.inspIspolnName"
            style="grid-column: span 2;"
          />
          <view-data-item
            label="Подразделение"
            :value="body.organIspolnName"
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
  import * as constants from "~/assets/js/utils/constants";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdIspolnShtraf",
    props: {
      delo: Object
    },
    components: {
    },
    data() {
      return {
        constants
      }
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdIspolnShtrafGetCommand, async () => {
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
    methods: {
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
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
      getIspolnEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params,
            title: 'Дело №' + this.delo.deloN,
          };

          formStack.toNext({
            module: this.$store.state.frmEdIspolnEdit,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
    }
  }
</script>
