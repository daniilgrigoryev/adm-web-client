<template>
  <div v-if="body" class="ml18">
    <div class="amd-title amd-title--sticky px36 pt24 pb18">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getProtPZTCEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Протокол о задержании ТС</b>
        </div>
      </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item 
            label="Дата и время нарушения" 
            :value="body.dateNar | formatDateTime('DD.MM.YYYY HH:mm')" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/time.svg')"
          />
          <view-data-item 
            label="Место нарушения" 
            :value="body.placeNar.placeFull" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/map.svg')"
          />

          <hr>
          
          <view-data-item 
            label="Пункт НПА" 
            :value="body.pnpaKod, body.pnpaName | concatByDelimiter(',')" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/case_decision_gray.svg')"
          />
          <view-data-item 
            label="Статья КРФоАП" 
            :value="body.stotvKod, body.stotvName | concatByDelimiter(',')" 
            style="grid-column: span 2;"
          />
          <hr>
          <view-data-item 
            label="Место составления" 
            :value="body.placeSost.placeFull" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/map.svg')"
          />
          <view-data-item 
            label="Должностное лицо" 
            :value="body.inspSostName, body.inspSostDolz, body.inspSostRang | concatByDelimiter(',')" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/police.svg')"
          />
          <view-data-item 
            label="Подразделение" 
            :value="body.organSostName" 
            style="grid-column: span 2;"
          />
          <hr>

          <view-data-item 
            label="Дата и время составления акта эвакуации" 
            :value="body.evacActTime | formatDateTime('DD.MM.YYYY HH:mm')"
            :icon="require('../../assets/images/time.svg')" 
          />
          <view-data-item 
            label="№ акта эвакуации" 
            :value="body.evacActNumber" 
          />
          <view-data-item 
            label="Организация эвакуатора" 
            :value="body.evacOrgName" 
            :icon="require('../../assets/images/truck.png')"
          />
          <view-data-item 
            label="ГРЗ эвакуатора" 
            :value="body.evacRegno" 
          />
          <view-data-item 
            label="Штрафстоянка" 
            :value="body.impoundLotName" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Представитель" 
            :value="body.evacAgentName" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/owner.svg')"
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
    name: "FrmEdProtPZTC",
    components: {
      ViewDataItem: () => import('~/components/shared/ui/view-data-item'),
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdProtPZTCGetCommand, async () => {
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
      this.$store.dispatch('frmEdProtPZTCSetCid', null);
      this.$store.dispatch('frmEdProtPZTCSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdProtPZTCGetData'
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
          await this.$store.dispatch('frmEdProtPZTCSetCid', currentForm.cid);

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
      getProtPZTCEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdProtPZTCEdit,
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
