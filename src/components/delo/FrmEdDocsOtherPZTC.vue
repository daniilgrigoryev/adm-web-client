<template>
  <div v-if="body">
    <div class="amd-title amd-title--sticky px36 pt24 pb18">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getProtPZTCEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/icons/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">{{ body.docTipName }} {{body.docN ? "№" + body.docN : "" }} от {{ body.dateSost | formatDateTime('DD.MM.YYYY') }}</b>
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
            :icon="require('../../assets/images/icons/time.svg')"
          />
          <view-data-item
            label="Место нарушения"
            :value="body.placeNar.placeFull"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/map.svg')"
          />

          <hr>

          <view-data-item
            label="Пункт НПА"
            :value="body.pnpaKod, body.pnpaName | concatByDelimiter(',')"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/reshenie-variant-2_1.svg')"
          />
          <view-data-item
            label="Статья КРФоАП"
            :value="body.stotvKod, body.stotvName | concatByDelimiter(',')"
            style="grid-column: span 2;"
          />
          <view-data-item
            label="Тип фиксации совершения процессуальных действий"
            :value="body.proceedingsFixingTypeName"
            style="grid-column: span 2;"
          />
          <div v-if="body.seizedThingsList && body.seizedThingsList.length > 0" style="grid-column: span 2;margin: 5px 0;padding-left: 60px;">
            <p class="adm-14 color-dark-lighter ">Изъятые вещи и документы</p>
            <div v-for="(item, index) in body.seizedThingsList" :key="index" >
              <p class="adm-text-big color-dark-base">{{ item.name }}</p>
            </div>
          </div>
          <div v-if="body.usedTechnicalMeansList && body.usedTechnicalMeansList.length > 0" style="grid-column: span 2;margin: 5px 0;padding-left: 60px;">
            <p class="adm-14 color-dark-lighter ">Использованные технические средства</p>
            <div v-for="(item, index) in body.usedTechnicalMeansList" :key="index" >
              <p class="adm-text-big color-dark-base">{{ item.name }}</p>
            </div>
          </div>
          <div v-if="body.annexesList && body.annexesList.length > 0" style="grid-column: span 2;margin: 5px 0;padding-left: 60px;">
            <p class="adm-14 color-dark-lighter ">Список приложений</p>
            <div v-for="(item, index) in body.annexesList" :key="index" >
              <p class="adm-text-big color-dark-base">{{ item.name }} <span v-if="item.sheets_quantity">(Количество листов - {{item.sheets_quantity}})</span></p>
            </div>
          </div>
          <hr>
          <view-data-item
            label="Место составления"
            :value="body.placeSost.placeFull"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/map.svg')"
          />
          <view-data-item
            label="Должностное лицо"
            :value="body.inspSostName, body.inspSostDolz, body.inspSostRang | concatByDelimiter(',')"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/police.svg')"
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
            :icon="require('../../assets/images/icons/time.svg')"
          />
          <view-data-item
            label="№ акта эвакуации"
            :value="body.evacActNumber"
          />
          <view-data-item
            label="Организация эвакуатора"
            :value="body.evacOrgName"
            :icon="require('../../assets/images/icons/truck.png')"
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
            :icon="require('../../assets/images/icons/owner.svg')"
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
    name: "FrmEdDocsOtherPZTC",
    props: {
      delo: Object
    },
    components: {
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDocsOtherPZTCGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
          }
        });
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdDocsOtherPZTCSetCid', null);
      this.$store.dispatch('frmEdDocsOtherPZTCSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDocsOtherPZTCGetData'
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
          await this.$store.dispatch('frmEdDocsOtherPZTCSetCid', currentForm.cid);

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
          this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
        }
      },
      getProtPZTCEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params,
            title: 'Дело №' + this.delo.deloN,
          };

          formStack.toNext({
            module: this.$store.state.frmEdDocsOtherPZTCEdit,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
        }
      },
    }
  }
</script>
