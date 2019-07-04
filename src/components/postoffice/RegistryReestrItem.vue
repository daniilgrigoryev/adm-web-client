<!-- prettier-ignore -->
<template>
  <aside-template v-if="dataStore && body" :listSectionNav="listSectionNav">
    <div class="layout-wrap">
      <div class="adm-form">
        <div class="adm-form__container">
          <div class="flex-parent flex-parent--space-between-main adm-form__headding">
            <h2 class="adm-form__headding" id="head">Почтовый реестр №{{body.curIssue}}</h2>
            <div>
              <Button @click="putSendingsInCover" :disabled="body.status !== 3" type="primary">Разложить отправления по конвертам</Button>
              <Button @click="sendReestr" :disabled="body.status !== 1 && body.status !== 2" type="primary">Подготовить к отправке</Button>
              <Button @click="sendReestr" :disabled="body.status !== 3" type="primary">Отправить</Button>
            </div>
          </div>
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

                <div v-if="sendings && sendings.length > 0" style="grid-column: span 2;margin: 5px 0;padding-left: 60px;">
                  <p class="adm-14 color-dark-lighter">Список отправлений</p>
                  <div v-for="(item, index) in sendings" :key="index">
                    <p class="adm-text-big color-dark-base">{{ item.addrFull }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="adm-form__container">
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
        {
          title: "Создание отправлений",
          name: "creating-shipments"
        }
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

.delo-menu {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 80px;
  align-items: center;
  @media screen and (max-width: 1300px) {
    grid-gap: 10px;
  }
  .delo-menu--body-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .delo-menu--poptip {
      display: flex;
      align-items: center;
      .search-wrap {
        border-bottom: 1px solid #cccccc;
        height: 40px;
        padding: 5px 15px;
        display: flex;
        align-items: center;
        img {
          margin-right: 10px;
        }
        .search {
          width: 100%;
          height: 100%;
          border: none;
          font-size: 14px;
          &::placeholder {
            font-style: italic;
            color: #cccccc;
          }
        }
      }
      .delo-menu__poptip-list {
        width: 350px;
        padding: 10px 0;
        li {
          display: flex;
          align-items: center;
          button {
            text-align: left;
            white-space: normal;
            border-radius: 0;
            width: 100%;
            margin: 3px 0;
            padding: 3px 15px;
          }
        }
      }
    }
  }
  .action-button {
    display: flex;
    align-items: center;
    color: #1888cc;
    margin: 0 10px;
    transition: 0.3s ease;
    &:disabled {
      opacity: 0.3;
      .ivu-icon-md-arrow-dropdown {
        opacity: 0;
      }
    }
    img {
      width: 1em;
      height: 1em;
      font-size: 36px;
    }
    .text {
      padding: 0 5px 0 5px;
    }
  }
  .special-buttons-wrap {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;
    align-items: center;
    padding: 0 20px;
    button {
      width: 1em;
      height: 1em;
      font-size: 48px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      img {
        position: relative;
      }
      &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 0;
        height: 0;
        transition: 0.3s ease;
        background: #dce4f7;
        border-radius: 50%;
        z-index: -1;
      }
      &:hover {
        &:before {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
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
}
main .bot-wrap {
  justify-content: space-between;
}
</style>
