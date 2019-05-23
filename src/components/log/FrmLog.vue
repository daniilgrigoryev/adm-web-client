<template>
  <div class="logs">
    <div class="logs__fixed-wrap">
      <div class="logs__head">
        <h4>История изменений</h4>
        <button class="close" @click="closeLogs()"></button>
      </div>
      <div class="logs__filter">
        <div class="adm-form__item">
          <small class="adm-form__label">Период:</small>
          <DatePickerMask class="adm-input adm-input--regular" v-model="data.startDate" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">по:</small>
          <DatePickerMask class="adm-input adm-input--regular" v-model="data.endDate" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
        </div>
        <Button @click="getLogs()" :disabled="!data.startDate || !data.endDate" type="primary" title="Обновить">Обновить</Button>
      </div>
    </div>
    <div class="logs__type-groups">
      <div class="logs__type-group" v-for="typeGroup in typeGroups" :key="typeGroup.id">
        <div class="logs__type-group-title" :class="typeGroup.type.colorClass">
          {{ typeGroup.type.text }}
        </div>
        <ul class="logs-items-wrap">
          <li class="logs-item" v-for="(item, key) in typeGroup.items" :key="key">
            <div class="logs-item__head" @click="item.visible = !item.visible">
              <Icon type="md-arrow-dropdown" :size="20" class="arrow-icon" :class="{open: item.visible}"/>
              <div>{{item.date | formatDateTime('DD.MM.YYYY HH:mm')}} - {{item.operIspName}}</div>
              <div></div>
            </div>
            <table class="logs-item__body" v-if="item.visible">
              <tr>
                <th>Описание поля</th>
                <th>Старое значение</th>
                <th>Новое значение</th>
              </tr>
              <tr v-for="(logItem, key) in item.items" :key="key">
                <td>{{logItem.fieldDesc}}</td>
                <td class="old-value">{{logItem.oldValue}}</td>
                <td>{{logItem.newValue}}</td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import {mapGetters} from 'vuex';

  export default {
    name: "FrmLog",
    components: {
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask'),
    },
    async created() {
      window.addEventListener('beforeunload', this.clearData);
      await this.setCid();
      await this.getTables();
    },
    destroyed() {
      this.clearData();
      window.removeEventListener('beforeunload', this.clearData);
    },
    data() {
      return {
        tables: [],
        data: {
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
        },
        typeGroups: [
          {
            type: {
              name: "U",
              text: "Добавлено",
              colorClass: "green",
            },
            items: []
          },
          {
            type: {
              name: "I",
              text: "Изменено",
              colorClass: "orange",
            },
            items: []
          },
          {
            type: {
              name: "O",
              text: "Разное",
              colorClass: "gray",
            },
            items: []
          },
          {
            type: {
              name: "R",
              text: "Удалено",
              colorClass: "red",
            },
            items: []
          },
        ]
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmLogGetData',
        cid: 'frmLogGetCid'
      }),
    },
    watch: {
      dataStore(newValue) {
        if (!!newValue) {
          this.separateLogs(newValue.records);
        }
      }
    },
    methods: {
      separateLogs(payload) {
        payload.forEach(el => {
          this.$set(el, 'visible', false);
          if (!el.operation) {
            this.typeGroups[2].items.push(el);
            return;
          }
          this.typeGroups.forEach(group => {
            if (group.type.name == el.operation) {
              group.items.push(el);
              return;
            }
          });
        });
        this.typeGroups.forEach(group => {
          group.items.sort((a,b) => {
            return a.date-b.date;
          });
        });
      },
      async setCid() {
        let eventResponse = await RequestApi.prepareData({
          beanName: "FrmLog",
          method: null,
          cid: null
        });
        let data = eventResponse.response;
        if (data.length > 0) {
          let dataJson = JSON.parse(data);
          let respData = dataJson.data;
          let respError = dataJson.error;
          if (!funcUtils.isNull(respData)) {
            this.$store.commit('frmLogSetCid', respData.cid);
          } else {
            if (!funcUtils.isNull(respError)) {
              this.$store.dispatch('errors/changeContent', {title: respError.errorMsg,});
            }
          }
        }
        this.getLogs();
      },
      async getLogs() {
        let prepareParams = {
          method: 'getData',
          cid: this.cid,
          params: this.data,
        };
        this.typeGroups.forEach(group => {
          group.items = []
        });
        prepareParams.params.node = innerFormStack.getCurrent().params;
        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch('fillModule', {'event': eventResponse});
      },
      clearData() {
        RequestApi.prepareData({
          beanName: null,
          method: 'removeCID',
          cid: this.cid,
          withSpinner: false
        });
        console.log(this.cid);
        this.$store.commit('frmLogSetCid', null);
        this.$store.commit('frmLogSetData', null);
      },
      async changeNode() {
        await this.clearData();
        await this.setCid();
      },
      async getTables() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getTables',
        });
        // this.tables = JSON.parse(eventResponse.response).data;
      },
      closeLogs() {
        this.$emit("closeLogs");
      }
    },
  }
</script>

<style lang="scss">
  h2 b {
    padding: 0 5px;
  }
  .logs {
    .ivu-input-icon {
      display: none;
    }
    .ivu-input {
      height: 28px;
    }
  }
</style>

<style lang="scss" scoped>
  .logs {
    position: absolute;
    right: 0;
    top: calc(100% - 1px);
    border: 1px solid #CCCCCC;
    background: #fff;
    height: calc(100vh - 126px);
    overflow-y: auto;
    overflow-x: hidden;
    width: 500px;
    .logs__fixed-wrap {
      position: sticky;
      background: #fff;
      top: 0;
      left: 0;
      z-index: 2;
      border-bottom: 1px solid #CCCCCC;
    }
    .logs__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 17px 0;
      h4 {
        color: #1888CC;
        font-size: 16px;
      }
      button.close {
        width: 25px;
        height: 25px;
        position: relative;
        border-radius: 50%;
        transition: .3s ease;
        &:hover {
          background: #f1f1f1;
        }
        &:before,&:after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 70%;
          height: 2px;
          background: #868686;
          transform: rotate(45deg);
        }
        &:after {
          transform: rotate(-45deg);
        }
      }
    }
    .logs__filter {
      width: 100%;
      display: flex;
      padding: 10px 18px;
      align-items: flex-end;
      button {
        padding: 0 15px;
        border-radius: 0;
        height: 28px;
        background: #1888CC;
        transition: .3s ease;
        &:hover {
          background: #2d8cf0;
        }
      }
      .adm-form__item {
        display: flex;
        align-items: center;
        .adm-form__label {
          font-size: 14px;
          color: #808080;
        }
      }
      .adm-input {
        margin: 0 10px;
        width: 120px;
        font-size: 14px;
        
      }
      
    }
  }
  .logs__type-group {
    padding: 10px 13px;
      border-bottom: 1px solid #CCCCCC;
    &:last-child {
      border-bottom: none;
    }
    .logs__type-group-title {
      display: flex;
      align-items: center;
      color: #808080;
      font-size: 14px;
      font-weight: 600;
      &:before {
        content: "";
        display: block;
        width: 12px;
        height: 12px;
        background: #01AA46;
        border-radius: 50%;
        margin-right: 10px;
      }
      &.green:before {
        background: #01AA46;
      }
      &.gray:before {
        background: gray;
      }
      &.orange:before {
        background: #FFC020;
      }
      &.red:before {
        background: #DE6262;
      }
    } 
  }
  .logs-items-wrap {
    padding: 5px 0;
  }
  .logs-item {
    padding: 5px 0;
    .logs-item__head {
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      font-weight: 600;
      color: #1888CC;
      .arrow-icon {
        color: #cccccc;
        margin-left: -5px;
        transition: .3s ease;
        transform: rotate(-90deg);
        &.open {
          transform: rotate(0);
        }
      }
    }
    .logs-item__body {
      padding: 10px 0;
      width: 100%;
      font-size: 12px;
      color: #808080;
      margin: 0 -10px;
      tr {
        th {
          white-space: nowrap;
          padding: 5px 10px;
          font-weight: 600;
          &:nth-child(1) {
            width: 230px;
          }
          &:nth-child(2) {
            width: 105px;
          }
          &:nth-child(3) {
          }
        }
        td {
          padding: 5px 10px;
          &.old-value {
            color: #cccccc;
          }
        }
      }
    }
  }
</style>
