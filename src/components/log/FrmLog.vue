<template>
  <div class="adm-form">
    <div class="adm-form__container">
      <div class="adm-form__item">
        <small class="adm-form__label">Начало периода</small>
        <div class="adm-form__item_content">
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.startDate" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
            </Col>
          </Row>
        </div>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Конец периода</small>
        <div class="adm-form__item_content">
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.endDate" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
            </Col>
          </Row>
        </div>
      </div>
      <div v-if="tables.length > 0" class="adm-form__item">
        <small class="adm-form__label">Список логирующих таблиц</small>
        <div class="adm-form__item_content">
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <span v-for="(key, item, index) in tables" :key="index">
                {{key}} - {{item}}
              </span>
            </Col>
          </Row>
        </div>
      </div>

      <Button @click="init" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Получить лог">Получить лог</Button>
    </div>

    <div v-if="records" class="view-data">
      <div class="view-data__container">
        <div class="items-wrap" style="display: flex; flex-direction: column;">
          <div v-for="(item, index) in records" :key="index">

            <span style="color: red;" @click="item.visible = !item.visible">Дата изменения - {{item.date | formatDateTime('DD.MM.YYYY HH:mm')}}</span>
            <span style="color: red;" @click="item.visible = !item.visible">Исполнитель - {{item.operIspName}}</span>
            <span style="color: red;" @click="item.visible = !item.visible">Действие - {{item.operation}}</span>

            <div v-if="item.visible" v-for="(logItem, key) in item.items" :key="key" style="display: flex; flex-direction: column;">
              <hr />
              <span>Имя поля - {{logItem.fieldName}}</span>
              <span>Описание поля - {{logItem.fieldDesc}}</span>
              <span>Старое значение - {{logItem.oldValue}}</span>
              <span>Новое значение - {{logItem.newValue}}</span>
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
  import RequestApi from "~/assets/js/api/requestApi";
  import {mapGetters} from 'vuex';

  export default {
    name: "FrmLog",
    components: {
      ViewDataItem: () => import('~/components/shared/ui/view-data-item'),
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask'),
    },
    async created() {
      await this.getTables();
      await this.init();
    },
    async destroyed() {
      this.$store.dispatch('frmLogSetCid', null);
      this.$store.dispatch('frmLogSetData', null);
    },
    data() {
      return {
        tables: [],
        data: {
          node: null,
          tabName: null,
          id: null,
          startDate: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7)),
          endDate: new Date(),
          ispId: null,
          deloId: null
        }
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmLogGetData'
      }),
      records() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.records;
          for (let i = 0; i < res.length; i++) {
            this.$set(res[i], 'visible', false);
          }
        }
        return res;
      },
    },
    methods: {
      async init() {
        try {
          let current = formStack.getCurrent();
          await this.$store.dispatch('frmLogSetCid', current.cid);
          let prepareParams = {
            method: 'restore'
          };
          let node = current.params.node;
          if (funcUtils.isNotEmpty(node)) {
            delete current.params.deloId;
            formStack.updateCurrent(current);
            this.data.node = node;
            prepareParams.method = 'getData';
            prepareParams.params = this.data;
          }

          let eventResponse = await RequestApi.prepareData(prepareParams);
          await this.$store.dispatch('fillModule', {'event': eventResponse});
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message.error,});
        }
      },
      async getTables() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getTables'
        });
        this.tables = JSON.parse(eventResponse.response).data;
      },
    },
  }
</script>

<style scoped>

</style>
