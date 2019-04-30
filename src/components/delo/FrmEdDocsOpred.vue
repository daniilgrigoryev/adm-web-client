<template>
  <div v-if="body" class="ml18">
    <div class="amd-title amd-title--sticky px36 pt24 pb18">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getDocsOpredEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Определение о возбуждении административного расследования</b>
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
          <view-data-item 
            label="Пункт НПА" 
            :value="body.pnpaKod, body.pnpaName | concatByDelimiter(', ')" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/case_decision_gray.svg')"
          />
          <view-data-item 
            label="Статья КРФоАП" 
            :value="body.stotvKod, body.stotvName | concatByDelimiter(', ')" 
            style="grid-column: span 2;"
          />
          <hr>
          <view-data-item 
            label="Место вынесения" 
            :value="body.placeSost.placeFull | concatByDelimiter(', ')" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/map.svg')"
          />
          <view-data-item 
            label="Должностное лицо" 
            :value="body.inspSostName, body.inspSostDolz, body.inspSostRang | concatByDelimiter(', ')" 
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
            label="Дата и время рассмотрения" 
            :value="body.dateRasm | formatDateTime('DD.MM.YYYY HH:mm')" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/time.svg')"
          />
          <view-data-item 
            label="Орган рассмотрения" 
            :value="body.organRasmName" 
            style="grid-column: span 2;"
          />

          <div v-if="isTaxi">
            <view-data-item
              label="Тип источника"
              :value="body.vsTypeName"
              style="grid-column: span 2;"
            />
            <view-data-item
              v-if="body.vsTypeId === 1"
              label="Фамилия"
              :value="body.vsFlFirstName"
              style="grid-column: span 2;"
            />
            <view-data-item
              v-if="body.vsTypeId === 1"
              label="Имя"
              :value="body.vsFlSecondName"
              style="grid-column: span 2;"
            />
            <view-data-item
              v-if="body.vsTypeId === 1"
              label="Отчество"
              :value="body.vsFlThirdName"
              style="grid-column: span 2;"
            />
            <view-data-item
              v-if="body.vsTypeId === 1"
              label="Пол"
              :value="body.vsFlSex"
              style="grid-column: span 2;"
            />
            <view-data-item
              v-if="body.vsTypeId !== 1"
              label="Наименование источника данных о нарушении"
              :value="body.vsName"
              style="grid-column: span 2;"
            />
            <view-data-item
              label="Вхоящий номер документа, полученного от источника данных о нарушении"
              :value="body.vsIncomingNumber"
              style="grid-column: span 2;"
            />
            <view-data-item
              label="Входящая дата документа, полученного от источника данных о нарушении"
              :value="body.vsIncomingDate | formatDateTime('DD.MM.YYYY')"
              style="grid-column: span 2;"
              :icon="require('../../assets/images/time.svg')"
            />
            <view-data-item
              v-if="body.vsTypeId !== 1"
              label="Номер разрешения такси"
              :value="body.tlNumber"
              style="grid-column: span 2;"
            />
            <view-data-item
              label="Дата начала срока действия разрешения такси"
              :value="body.tlDateBeg | formatDateTime('DD.MM.YYYY')"
              style="grid-column: span 2;"
              :icon="require('../../assets/images/time.svg')"
            />
            <view-data-item
              label="Дата окончания срока действия разрешения такси"
              :value="body.tlDateEnd | formatDateTime('DD.MM.YYYY')"
              style="grid-column: span 2;"
              :icon="require('../../assets/images/time.svg')"
            />
            <view-data-item
              label="Организация, выдавшая разрешение такси"
              :value="body.tlLicensor"
              style="grid-column: span 2;"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as constants from "~/assets/js/utils/constants";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdDocsOpred",
    components: {
      ViewDataItem: () => import('~/components/shared/ui/view-data-item')
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDocsOpredGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
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
      this.$store.dispatch('frmEdDocsOpredSetCid', null);
      this.$store.dispatch('frmEdDocsOpredSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDocsOpredGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
      isTaxi() {
        let res = null;
        if (this.dataStore) {
          res = funcUtils.isNotEmpty(this.dataStore.deloTag) &&  this.dataStore.deloTag.includes(constants.TAG_TAXI);
        }
        return res;
      },
    },
    methods: {
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
          await this.$store.dispatch('frmEdDocsOpredSetCid', currentForm.cid);

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
          alert(e.message);
        }
      },
      getDocsOpredEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDocsOpredEdit,
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

