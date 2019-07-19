<template>
  <div v-if="body">
    <div class="amd-title amd-title--sticky px36 pt24 pb18">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getDocsProtEdit()" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/icons/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">{{ title }}</b>
        </div>
        <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/icons/wiki.svg' class="wmax-none">
        </Button> -->
      </div>
    </div>
    <!-- {{body}} -->


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
          <view-data-item
            label="Пункт НПА"
            :value="body.pnpaKod, body.pnpaName | concatByDelimiter(', ')"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/reshenie-variant-2_1.svg')"
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
            :icon="require('../../assets/images/icons/map.svg')"
          />
          <view-data-item
            label="Должностное лицо"
            :value="body.inspSostName, body.inspSostDolz, body.inspSostRang | concatByDelimiter(', ')"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/police.svg')"
          />
          <view-data-item
            label="Подразделение"
            :value="body.organSostName"
            style="grid-column: span 2;"
          />

          <hr v-if="!isTaxi && !isCargo && !isGreen">
          <view-data-item v-if="!isTaxi && !isCargo && !isGreen"
            label="Было снятие ТС с эвакуатора"
            :value="isRemovedFromEvac"
            style="grid-column: span 2;"
          />
          <div v-if="isTaxi && body.annexesList && body.annexesList.length > 0" style="grid-column: span 2;margin: 5px 0;padding-left: 60px;">
            <p class="adm-14 color-dark-lighter ">Список приложений</p>
            <div v-for="(item, index) in body.annexesList" :key="index" >
              <p class="adm-text-big color-dark-base">{{ item.name }} <span v-if="item.sheets_quantity">(Количество листов - {{item.sheets_quantity}})</span></p>
            </div>
          </div>

          <div v-if="isTaxi" class="items-wrap">
            <view-data-item
              label="Номер разрешения такси"
              :value="body.tlNumber"
              style="grid-column: span 2;"
            />
            <view-data-item
              label="Дата начала срока действия разрешения такси"
              :value="body.tlDateBeg | formatDateTime('DD.MM.YYYY')"
              style="grid-column: span 2;"
              :icon="require('../../assets/images/icons/time.svg')"
            />
            <view-data-item
              label="Дата окончания срока действия разрешения такси"
              :value="body.tlDateEnd | formatDateTime('DD.MM.YYYY')"
              style="grid-column: span 2;"
              :icon="require('../../assets/images/icons/time.svg')"
            />
            <view-data-item
              label="Владелец разрешения такси"
              :value="body.tlLicenseeName"
              style="grid-column: span 2;"
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
    name: "FrmEdDocsProt",
    props: {
      delo: Object
    },
    components: {
      ViewDataItem: () => import('~/components/shared/ui/view-data-item')
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDocsProtGetCommand, async () => {
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
      this.$store.dispatch('frmEdDocsProtSetCid', null);
      this.$store.dispatch('frmEdDocsProtSetData', null);
    },
    computed: {
      isRemovedFromEvac(){
        return this.body.isRemovedFromEvac ? 'да' : 'нет'
      },
      ...mapGetters({
        dataStore: 'frmEdDocsProtGetData'
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
      isCargo() {
        let res = null;
        if (this.dataStore) {
          res = funcUtils.isNotEmpty(this.dataStore.deloTag) && this.dataStore.deloTag.includes(constants.TAG_CARGO);
        }
        return res;
      },
      isGreen() {
        let res = null;
        if (this.dataStore) {
          res = funcUtils.isNotEmpty(this.dataStore.deloTag) && this.dataStore.deloTag.includes(constants.TAG_GREEN);
        }
        return res;
      },
      title() {
        let res = 'Протокол об АПН';
        if (this.dataStore) {
          if (this.isCargo) {
            res += ' погрузки и разгрузки ';
          } else if (this.isGreen) {
            res += ' по зеленым насаждениям ';
          }
          res += ' ' + (this.body.docN ? '№' + this.body.docN : '') + ' от ' + funcUtils.parseDateTime(this.body.dateSost, 'DD.MM.YYYY');
        }
        return res;
      },
    },
    methods: {
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
          await this.$store.dispatch('frmEdDocsProtSetCid', currentForm.cid);

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
      getDocsProtEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params,
            title: 'Дело №' + this.delo.deloN,
          };

          formStack.toNext({
            module: this.$store.state.frmEdDocsProtEdit,
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

