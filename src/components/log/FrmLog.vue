<template>
  <aside-template :listSectionNav="[]" title="Логи">
    <div class="layout-wrap">
      <div class="layout">
        <div class="adm-form logs">
          <div class="adm-form__container">
            <h2 v-if="data.node" id="data-source" class="adm-form__headding" v-html="data.node.name"></h2>
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

              <table class="logs__body">
                <tr>
                  <th>Имя файла</th>
                  <th>Дата изменения</th>
                  <th>Исполнитель</th>
                  <th>Тип действия</th>
                </tr>
                <div v-for="(item, index) in records" :key="index" class="logs-item" :class="operation[item.operation || 'default'].color">
                  <tr class="logs-item__head" @click="item.visible = !item.visible" :class="{open: item.visible}">
                    <td>{{tables[item.tabName]}}</td>
                    <td>{{item.date | formatDateTime('DD.MM.YYYY HH:mm')}}</td>
                    <td>{{item.operIspName}}</td>
                    <td>{{operation[item.operation || "default"].text}}</td>
                  </tr>
                  <tr v-if="item.visible">
                    <td colspan="4" style="padding: 0">
                      <table class="logs-item__body" >
                        <tr>
                          <th>Имя поля </th>
                          <th>Описание поля</th>
                          <th>Старое значение</th>
                          <th>Новое значение</th>
                        </tr>
                        <tr v-for="(logItem, key) in item.items" :key="key">
                          <td>{{logItem.fieldName}}</td>
                          <td>{{logItem.fieldDesc}}</td>
                          <td>{{logItem.oldValue}}</td>
                          <td>{{logItem.newValue}}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot-wrap">
      <Button @click="getPrev" type="text">Назад</Button>
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
        tables: [],
        data: {
          node: null,
          tabName: null,
          id: null,
          startDate: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7)),
          endDate: new Date(),
          ispId: null,
          deloId: null
        },
        operation: {
          I: {
            text: "Добавление",
            color: "green",
          },
          U: {
            text: "Изменение",
            color: "orange",
          },
          default: {
            text: "Неопределено",
            color: "grey",
          },
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
            delete current.params.node;
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

<style>
  h2 b {
    padding: 0 5px;
  }
</style>

<style lang="scss" scoped>
  @supports (display: contents) {
    .logs-item { display: contents; }
  }

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
      width: 100%;
      margin: 20px 0;
    }
  }
  table {
    border-collapse: collapse;
  }
  th {
    padding: 5px;
    border: 1px solid #e4e4e4;
    vertical-align: middle;
  }
  td {
    padding: 5px;
    border: 1px solid #e4e4e4;
  }
  .logs-item {
    padding: 2px 0;
    display: table-footer-group;
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
    &.grey {
      .logs-item__head {
        color: grey;
      }
    }
    .logs-item__head {
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
      &.open {
        background: #e4e4e4;
      }
      td {
        text-align: center;
      }
    }

    .logs-item__body {
      padding: 10px 0;
      width: 100%;
    }
  }
</style>
