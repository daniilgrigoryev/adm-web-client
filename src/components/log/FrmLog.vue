<template>
  <aside-template :listSectionNav="listSectionNav" title="Логи">
    <div class="layout-wrap">
      <div class="layout">
        <div class="adm-form logs">
          <div class="adm-form__container">
            <h2 id="data-source" class="adm-form__headding">Логи по делу №</h2>
            <div class="adm-form__content">
              <div class="logs__filter">
                <div class="adm-form__item">
                  <small class="adm-form__label">Начало периода</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="14" :lg="16">
                        <DatePickerMask class="adm-input adm-input--regular wmin180 wmax180" v-model="data.startDate" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Конец периода</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="14" :lg="16">
                        <DatePickerMask class="adm-input adm-input--regular wmin180 wmax180" v-model="data.endDate" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                      </Col>
                    </Row>
                  </div>
                </div>
                <Button @click="init" :disabled="!data.startDate || !data.endDate" type="primary" title="Получить лог">Получить лог</Button>
              </div>
              <div v-if="tables.length > 0" class="adm-form__item">
                <small class="adm-form__label">Список логирующих таблиц</small>
                <div class="adm-form__item_content">
                  <span v-for="(key, item, index) in tables" :key="index">
                    {{key}} - {{item}}
                  </span>
                </div>
              </div>
              <div class="logs__body">
                <div v-for="(item, index) in records" :key="index" class="logs-item" :class="operationTypeClass(item.operation)">
                  <div class="logs-item__head" @click="item.visible = !item.visible">
                    Дата изменения - {{item.date | formatDateTime('DD.MM.YYYY HH:mm')}}
                    Исполнитель - {{item.operIspName}}
                  </div>
                  <div class="logs-item__body">
                    <div v-if="item.visible" v-for="(logItem, key) in item.items" :key="key" class="logs-item__block">
                      <div>Имя поля - {{logItem.fieldName}}</div>
                      <div>Описание поля - {{logItem.fieldDesc}}</div>
                      <div>Старое значение - {{logItem.oldValue}}</div>
                      <div>Новое значение - {{logItem.newValue}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </aside-template>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import {mapGetters} from 'vuex';

  export default {
    name: "FrmLog",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
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
        listSectionNav: [],
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
      operationTypeClass(operation) {
        switch (operation) {
          case "I":
            return "green"
            break;
          case "U":
            return "orange"
            break;
          default:
            return "green"
            break;
        }
      },
      async getTables() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getTables'
        });
        this.tables = JSON.parse(eventResponse.response).data;
      },
      getPrev() {
        try {
          formStack.toPrev({
            vm: this
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .logs {
    .logs__filter {
      width: 100%;
      display: flex;
      align-items: center;
      button {
        padding: 0 15px;
        height: 32px;
        margin-left: auto;
      }
    }
    .logs__body {
      padding: 20px 0;
    }
  }
  .logs-item {
    padding: 2px 0;
    &.green {
      .logs-item__head {
        color: green;
      }
    }
    &.orange {
      .logs-item__head {
        color: orange;
      }
    }
    .logs-item__head {
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
    }
    .logs-item__body {
      .logs-item__block {
        padding: 10px 0;
        border-bottom: 1px solid #e4e4e4;
      }
    }
  }
</style>
