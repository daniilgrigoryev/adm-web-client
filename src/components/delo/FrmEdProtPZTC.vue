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
        <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>
    </div>

    <div class="adm-form">
      <div class="adm-form__container">
        <div class="items-wrap">
          <view-data-item 
            label="№ НПА" 
            :value="body.pnpaKod, body.pnpaName | concatByDelimiter(',')" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="№ статьи" 
            :value="body.stotvKod, body.stotvName | concatByDelimiter(',')" 
            style="grid-column: span 2;"
          />
          <hr>
          <view-data-item 
            label="Дата и время нарушения" 
            :value="body.dateNar | formatDateTime('DD.MM.YYYY HH:mm')" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Место нарушения" 
            :value="body.placeNar.placeFull" 
            style="grid-column: span 2;"
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
            label="Место составления" 
            :value="body.placeSost.placeFull" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Дата составления акта" 
            :value="body.evacActTime | formatDateTime('DD.MM.YYYY')" 
          />
          <view-data-item 
            label="№ акта эвакуации" 
            :value="body.evacActNumber" 
          />
          <view-data-item 
            label="Организация эвакуатора" 
            :value="body.evacOrgName" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/truck.png')"
          />
          <view-data-item 
            label="Представитель" 
            :value="body.evacAgentName" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/owner.svg')"
          />
          <view-data-item 
            label="ГРЗ эвакуатора" 
            :value="body.evacRegno" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Штрафстоянка" 
            :value="body.impoundLotName" 
            style="grid-column: span 2;"
          />
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
  import ViewDataItem from "~/components/shared/ui/view-data-item.vue";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdProtPZTC",
    components: {
      ViewDataItem,
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
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
        }
        delete currentForm['restore'];
        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch('fillModule', {'event': eventResponse});

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdProtPZTCGetCommand, async () => {
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
      getProtPZTCEdit() {
        try {
          let current = formStack.getCurrent();
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          let currentForm = innerFormStack.getCurrent(uid);
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
          alert(e.message);
        }
      },
    }
  }
</script>


<style scoped lang="scss"> 
  .--gcs2 {
    grid-column: span 2;
  }
  .adm-form__container {
    margin-top: 6px;
    .items-wrap {
      padding: 36px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 18px;
      hr {
        height: 1px;
        width: 100%;
        color: #cccccc;
        background: #cccccc;
        grid-column: span 2;
      }
    }
  }
</style>
