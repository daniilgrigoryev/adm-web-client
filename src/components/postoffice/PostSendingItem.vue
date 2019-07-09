<!-- prettier-ignore -->
<template>
  <aside-template v-if="dataStore && body" :listSectionNav="listSectionNav">
    <div v-if="pdfData" class="pdf-viewer">
      <Icon @click="pdfData = null" type="md-close" size="23" class="color-blue-base absolute right mr18 cursor-pointer"/>
      <embed class="pdf-data" :src="pdfData" />
    </div>
    <div class="layout-wrap">
      <div class="adm-form">
        <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">
              Почтовое отправление №{{body.id}}
            </h2>
          <div class="view-data">
            <div class="view-data__container">
              <div class="items-wrap">
                <view-data-item
                  label="Статус"
                  :value="body.unloadStateName"
                  style="grid-column: span 2;"
                />
                <view-data-item
                  label="Адрес получателя"
                  :value="body.addrFull"
                  style="grid-column: span 2;"
                />
                <view-data-item
                  label="Описание дела"
                  :value="body.deloDescr"
                  style="grid-column: span 2;"
                />
                <view-data-item
                  label="Описание участника"
                  :value="body.uchastName"
                  style="grid-column: span 2;"
                />
                <view-data-item
                  label="Время выгрузки"
                  :value="body.unloadDate | formatDateTime('DD.MM.YYYY HH:mm')"
                  style="grid-column: span 2;"
                />
                <view-data-item
                  label="Конверт"
                  :value="body.cover ? body.cover.upi :''"
                  style="grid-column: span 2;"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="adm-form__container">
          <h2 class="adm-form__headding" id="attachment-list">Список вложений</h2>
          <table v-if="enclosures && enclosures.length" class="table">
            <tr class="head">
              <th>Имя</th>
              <th>Тип вложения</th>
              <th>Идентификатор сформированного PDF</th>
            </tr>
            <tr v-for="(item, index) in enclosures"
                :key="index"
                class="item"
            >
              <td>{{item.name}}</td>
              <td>{{item.enclTypeName}}</td>
              <td>
                <Icon v-if="item.mediaId" type="ios-bookmarks-outline" @click="getMediaBody(item.mediaId)"></Icon>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="bot-wrap">
    </div>
  </aside-template>
</template>

<script>
import * as funcUtils from "~/assets/js/utils/funcUtils";
import * as formStack from "~/assets/js/api/formStack";
import RequestApi from "~/assets/js/api/requestApi";
import { mapGetters } from "vuex";

export default {
  name: "PostSendingItem",
  components: {
    DateRangePickerMask: () =>
      import("~/components/shared/dateTimeRangePicker/DateRangePickerMask"),
    AsideTemplate: () => import("~/components/templates/AsideTemplate")
  },
  async created() {
    await this.init();
    let vm = this;
    this.$store.watch(
      this.$store.getters.postSendingItemGetCommand,
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
    this.$store.dispatch("postSendingItemSetCid", null);
    this.$store.dispatch("postSendingItemSetData", null);
  },
  data() {
    return {
      freeSlotCount: null,
      pdfData: null,
      listSectionNav: [
        {
          title: "Почтовый реестр",
          name: "head"
        },
        {
          title: "Список вложений",
          name: "attachment-list"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      dataStore: "postSendingItemGetData"
    }),
    body() {
      let res = null;
      if (this.dataStore) {
        res = this.dataStore.body;
      }
      return res;
    },
    enclosures() {
      let res = null;
      if (this.dataStore) {
        res = this.dataStore.enclosures;
      }
      return res;
    }
  },
  methods: {
    async init() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch("postSendingItemSetCid", current.cid);
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
      } catch (e) {
        this.$store.dispatch("errorsModal/changeContent", { title: e.message });
      }
    },
    async getMediaBody(mediaId) {
      let { response } = await RequestApi.prepareData({
        method: "getMediaBody",
        params: {
          mediaId: mediaId
        }
      });
      if (response) {
        
      }
      
      this.pdfData = 'data:application/pdf;base64,' + JSON.parse(response).data;
      console.log(this.pdfData);
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
.view-data__container {
  background: transparent;
  border: none;
}

.pdf-viewer {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 99;
  background: rgb(82, 86, 89);

  i {
    top: 10px;
    color: #fff;
  }

  .pdf-data {
    position: relative;
    width: 100%;
    height: 100%;
    top: 40px;
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
</style>
