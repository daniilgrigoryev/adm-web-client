<!-- prettier-ignore -->
<template>
  <aside-template v-if="dataStore && body" :listSectionNav="listSectionNav">
    <div class="layout-wrap">
      <div class="adm-form">
        <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">
              Почтовый реестр №{{body.curIssue}}
              <div class="buttons-wrap">
                <Button @click="putSendingsInCover" :disabled="body.status !== 3" type="primary">Разложить отправления по конвертам</Button>
                <Button @click="sendReestr" :disabled="body.status !== 1 && body.status !== 2" type="primary">Подготовить к отправке</Button>
                <Button @click="sendReestr" :disabled="body.status !== 3" type="primary">Отправить</Button>
              </div>
            </h2>
          <div class="view-data">
            <div class="view-data__container">
              <div class="items-wrap">
                <view-data-item
                  label="Исходящий номер"
                  :value="body.curIssue"
                  style="grid-column: span 2;"
                />
                <view-data-item
                  label="Время создания реестра"
                  :value="body.creationDate | formatDateTime('DD.MM.YYYY HH:mm')"
                  style="grid-column: span 2;"
                  :icon="require('../../assets/images/icons/time.svg')"
                />
                <view-data-item
                  label="Автор, создавший реестр"
                  :value="body.authorName"
                  style="grid-column: span 2;"
                />
                <view-data-item
                  label="Тип реестра"
                  :value="body.regTypeName"
                  style="grid-column: span 2;"
                  :icon="require('../../assets/images/icons/reshenie-variant-2_1.svg')"
                />
                <view-data-item
                  label="Статус реестра"
                  :value="body.statusName"
                  style="grid-column: span 2;"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="adm-form__container">
          <h2 class="adm-form__headding" id="creating-shipments">Создание отправлений</h2>
          <div class="creating-shipments">
            <div class="creating-shipments__head">
              <DateRangePickerMask class="adm-input adm-input--big adm-input-data" :valueFirst="findDeloListDateBeg" :valueSecond="findDeloListDateEnd"
                                  clearable type="date" placeholder="дд/мм/гггг" @change="changeDateRange"
                                  momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DateRangePickerMask>
              <Button class="append-custom" icon="ios-search" @click="findDeloList" type="primary" :disabled="!findDeloListDateBeg || !findDeloListDateEnd">Найти список дел для создания отправлений</Button>
              <div v-if="freeSlotCount && sendingDeloList && sendingDeloList.length" class="count-free-slots">Количество свободных слотов в реестре: {{ freeSlotCount }}</div>
            </div>
            <table v-if="sendingDeloList && sendingDeloList.length" class="table">
              <tr class="head">
                <th>Автор</th>
                <th>Дата создания</th>
                <th>Дело</th>
                <th>Получатель</th>
              </tr>
              <tr v-for="(item, index) in sendingDeloList"
                  :key="index"
                  class="item"
                  :class="{selected: item.select}"
                  @click="toggleSelecedItem(item)"
              >
                <td>{{item.createIspName}}</td>
                <td>{{item.createTime | formatDateTime('DD.MM.YYYY HH:mm')}}</td>
                <td>
                  <div>Дело № {{item.deloN}}</div>
                  <div v-if="item.checked"
                      class="status"
                      :class="[
                        {red:item.hasWarning},
                        {orange:item.hasError},
                        {limegreen:!item.hasError && !item.hasWarning}
                      ]"
                  >
                    {{ !item.hasError && !item.hasWarning? 'Успешно': item.Error || item.warning}}
                  </div>
                </td>
                <td>{{item.uchastName}}</td>
              </tr>
            </table>
          </div>
        </div> -->

        <div class="adm-form__container">
          <h2 class="adm-form__headding" id="list-sendings">Список отправлений</h2>
          <table v-if="sendings && sendings.length" class="table">
            <tr class="head">
              <th>Статус</th>
              <th>Адрес получателя</th>
              <th>Описание дела</th>
              <th>Описание участника</th>
              <th>Время выгрузки</th>
              <th>Конверт</th>
            </tr>
            <tr v-for="(item, index) in sendings"
                :key="index"
                class="item"
                @click="getSending(item.id)"
            >
              <td>{{item.unloadStateName}}</td>
              <td>{{item.addrFull}}</td>
              <td>{{item.deloDescr}}</td>
              <td>{{item.uchastName}}</td>
              <td>{{item.unloadDate | formatDateTime('DD.MM.YYYY HH:mm')}}</td>
              <td>{{item.cover ? item.cover.upi :""}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="bot-wrap">
      <Button v-if="sendingDeloList && sendingDeloList.length" :disabled="!listSelectedItems.length || allSelectedItemsAllowed" @click="checkDeloFromRegistry" type="primary">Проверить выбранные дела на возможность включения в реестр</Button>
      <Button v-if="sendingDeloList && sendingDeloList.length" :disabled="!listSelectedItems.length || !allSelectedItemsAllowed" @click="addDeloToRegistry" type="primary">Добавить выбранные дела в реестр</Button>
    </div>
  </aside-template>
</template>

<script>
import * as funcUtils from "~/assets/js/utils/funcUtils";
import * as formStack from "~/assets/js/api/formStack";
import RequestApi from "~/assets/js/api/requestApi";
import { mapGetters } from "vuex";

export default {
  name: "RegistryReestrItem",
  components: {
    DateRangePickerMask: () =>
      import("~/components/shared/dateTimeRangePicker/DateRangePickerMask"),
    AsideTemplate: () => import("~/components/templates/AsideTemplate")
  },
  async created() {
    await this.init();
    let vm = this;
    this.$store.watch(
      this.$store.getters.registryReestrItemGetCommand,
      async () => {
        try {
          await vm.init();
        } catch (e) {
          this.$store.dispatch("errorsModal/changeContent", {
            title: e.message
          });
        }
      }
    );
  },
  async destroyed() {
    this.$store.dispatch("registryReestrItemSetCid", null);
    this.$store.dispatch("registryReestrItemSetData", null);
  },
  data() {
    return {
      findDeloListDateBeg: null,
      findDeloListDateEnd: null,
      sendingDeloList: null,
      freeSlotCount: null,
      listSelectedItems: [],
      listSectionNav: [
        {
          title: "Почтовый реестр",
          name: "head"
        },
        // {
        //   title: "Создание отправлений",
        //   name: "creating-shipments"
        // },
        {
          title: "Список отправлений",
          name: "list-sendings"
        },
      ]
    };
  },
  computed: {
    ...mapGetters({
      dataStore: "registryReestrItemGetData"
    }),
    body() {
      let res = null;
      if (this.dataStore) {
        res = this.dataStore.body;
      }
      return res;
    },
    sendings() {
      let res = [];
      if (this.dataStore) {
        for (let i = 0; i < this.dataStore.sendings.length; i++) {
          let item = this.dataStore.sendings[i];
          res.push(item);
        }
      }
      return res;
    },
    allSelectedItemsAllowed() {
      return (
        this.listSelectedItems.filter(
          el => el.select && el.checked && !el.hasError
        ).length === this.listSelectedItems.length
      );
    }
  },
  methods: {
    async init() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch("registryReestrItemSetCid", current.cid);
        let prepareParams = {
          method: "restore"
        };
        let id = this.$route.params.id;
        if (funcUtils.isNotEmpty(id)) {
          prepareParams.method = "getData";
          prepareParams.params = {
            id: id
          };
        }

        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch("fillModule", { event: eventResponse });

        await this.fillFreeSlotCount();
      } catch (e) {
        this.$store.dispatch("errorsModal/changeContent", { title: e.message });
      }
    },
    toggleSelecedItem(item) {
      item.select = item.hasError ? false : !item.select;
      if (item.select) {
        this.listSelectedItems.push(item);
      } else {
        this.listSelectedItems.splice(this.listSelectedItems.indexOf(item), 1);
      }
    },
    changeDateRange(e) {
      this.findDeloListDateBeg = e.valueFirst;
      this.findDeloListDateEnd = e.valueSecond;
    },
    async fillFreeSlotCount() {
      let eventResponse = await RequestApi.prepareData({
        method: "getFreeSlotCount"
      });
      let responseData = JSON.parse(eventResponse.response).data;
      if (responseData) {
        this.freeSlotCount = responseData;
      }
    },
    async putSendingsInCover() {
      let eventResponse = await RequestApi.prepareData({
        method: "putSendingsInCover"
      });
      let responseData = JSON.parse(eventResponse.response).data;
      if (responseData) {
        this.init();
      }
    },
    async sendReestr() {
      let eventResponse = await RequestApi.prepareData({
        method: "sendReestr"
      });
      let responseData = JSON.parse(eventResponse.response).data;
      if (responseData) {
        this.init();
      }
    },
    async findDeloList() {
      this.listSelectedItems = [];
      let eventResponse = await RequestApi.prepareData({
        method: "getSendingDeloList",
        params: {
          dateBeg: this.findDeloListDateBeg,
          dateEnd: this.findDeloListDateEnd
        }
      });
      let responseData = JSON.parse(eventResponse.response).data;
      if (responseData) {
        this.sendingDeloList = responseData.body;
      }
    },
    async checkDeloFromRegistry() {
      for (let i = 0; i < this.sendingDeloList.length; i++) {
        let sendingDelo = this.sendingDeloList[i];
        if (sendingDelo.select && !sendingDelo.checked) {
          let eventResponse = await RequestApi.prepareData({
            method: "checkDeloFromRegistry",
            params: {
              deloId: sendingDelo.deloId
            }
          });
          let responseData = JSON.parse(eventResponse.response).data;
          if (responseData) {
            sendingDelo.checked = true;
            switch (responseData.res) {
              case 1: {
                sendingDelo.hasWarning = true;
                sendingDelo.warning = responseData.warning;
                break;
              }
              case 2: {
                sendingDelo.hasError = true;
                sendingDelo.Error = responseData.Error;
                break;
              }
            }
          }
        }
      }
    },
    addDeloToRegistry() {
      this.listSelectedItems.forEach(async el => {
        await RequestApi.prepareData({
          method: "addDeloToRegistry",
          params: {
            delo: el
          }
        });
      });
    },
    getSending(id) {
      let params = {
        id: id,
        title: `Почтовый реестр №${this.body.curIssue}`
      };
      formStack.toNext({
        module: this.$store.state.postSendingItem,
        vm: this,
        notRemoved: false,
        params: params,
        withCreate: true
      });
    },
    async getPrev() {
      try {
        await formStack.toPrev({
          vm: this
        });
      } catch (e) {
        this.$store.dispatch("errorsModal/changeContent", { title: e.message });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.delo__headding {
  border-bottom: 2px solid transparent;
}

.delo__headding:hover {
  border-bottom: 2px solid #00b1ff;
}
.view-data__container {
  background: transparent;
  border: none;
}

.creating-shipments {
  .creating-shipments__head {
    position: sticky;
    top: 0;
    background: #f3f3f3;
    z-index: 5;
    padding: 15px 46px;
    display: flex;
    align-items: center;
    .count-free-slots {
      margin-left: auto;
    }
    button {
      margin-left: 20px;
    }
  }
}
.table {
  background: #fff;
  width: 100%;
  border: none;
  font-size: 14px;
  .head {
    background: #f3f3f3;
    position: sticky;
    top: 90px;
    th {
      border: none;
      padding: 15px;
      white-space: nowrap;
      font-weight: 600;
    }
  }
  .item {
    border-bottom: 1px solid #e4e4e4;
    box-sizing: border-box;
    cursor: pointer;
    &.selected {
      background: #e4e4e4;
    }
    td {
      border: none;
      border-bottom: 1px solid #e4e4e4;
      padding: 8px 15px;
      .status {
        max-width: 150px;
        &.red {
          color: red;
        }
        &.orange {
          color: orange;
        }
        &.limegreen {
          color: limegreen;
        }
      }
    }
  }
}
main .bot-wrap {
  justify-content: space-between;
}
.adm-form__headding {
  display: flex;
  justify-content: space-between;
  .buttons-wrap {
    display: flex;
    button {
      margin: 0 10px;
    }
  }
}

</style>
