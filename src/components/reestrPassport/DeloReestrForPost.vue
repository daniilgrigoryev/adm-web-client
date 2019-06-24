<template>
  <div>
    <div class="breadcrumbs">
      <div class="content">
        Реестры / Формирование постановлений
      </div>
    </div>
    <div class="adm-search-filter-panel adm-form">
      <div class="content">
        <div class="adm-form__item">
          <div class="adm-form__item-label">Тег дела *</div>
          <CustomSelect class="adm-input adm-input--big" v-model="filter.tag">
            <Option :value="4">Эвакуация</Option>
            <Option :value="5">Такси</Option>
            <Option :value="6">Зеленых насаждений</Option>
            <Option :value="7">Погрузки и разгрузки</Option>
          </CustomSelect>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">ГРЗ</div>
          <Input class="adm-input adm-input--big" v-model="filter.regno" clearable/>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Название участника</div>
          <Input class="adm-input adm-input--big"  v-model="filter.name" placeholder="ФИО или название организации" clearable />
        </div>
        <div class="buttons-wrap">
          <Button @click="filterClick" type="default" class="adm-btn adm-btn--blue">Найти</Button>
          <Button @click="clearFilterSort" type="default" class="adm-btn">Очистить</Button>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Период рассмотрения *</div>
          <DateRangePickerMask class="adm-input adm-input--big adm-input-data" :valueFirst="filter.dateBegRasm" :valueSecond="filter.dateEndRasm"
                                clearable type="date" placeholder="дд/мм/гггг" @change="changeDateRasm"
                                momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DateRangePickerMask>
        </div>
         <div class="adm-form__item">
          <div class="adm-form__item-label">Период нарушения</div>
          <DateRangePickerMask class="adm-input adm-input--big adm-input-data" :valueFirst="filter.dateBegViol" :valueSecond="filter.dateEndViol"
                                clearable type="date" placeholder="дд/мм/гггг" @change="changeDateViol"
                                momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DateRangePickerMask>
        </div>
      </div>
    </div>
    <div v-if="!isEmptyData()" class="bg-white">
      <div class="content">
        <div class="flex-parent flex-parent--center-cross flex-parent--space-between-main py6 bg-white-light">
          <div class="flex-parent flex-parent--center-cross">
            <p class="adm-txt-regular color-dark-medium ml18" v-if="data.length > 0"> {{
              declOfNum(dataStore.deloList.length, ['Найдена', 'Найдено', 'Найдены'])}} {{ dataStore.deloList.length}}
              {{ declOfNum(dataStore.deloList.length, ['запись', 'записи', 'записей']) }}</p>
            <Page v-if="dataStore.deloList.length > limit" :total="dataStore.deloList.length" :current="currentPage"
                  :page-size="limit" class="ml12" @on-change="changePage"/>
          </div>

          <Dropdown trigger="custom" :visible="columnsOptionsVisible" placement="bottom-end">
            <Button type="text" class="block border--0 bg-transparent-on-hover" style="box-shadow: none; " @click="toggleColumnsOption">
              <!-- <span class='link color-dark-medium adm-text-small txt-underline-on-hover'>показ колонок</span> -->
              <Icon type="md-settings" size="18" class="ml18"></Icon>
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list" class="wmin240">
              <DropdownItem v-for="column in tableColumnsForOptions" :key="column.id" class="px0 py0">
                <Checkbox v-model="column.visible" class="adm-text-small py6 align-middle ml12">
                  <span class="mx6">{{column.title}}</span>
                </Checkbox>
              </DropdownItem>
              <div class="flex-parent flex-parent--center-main">
                <Button type="primary" @click="toggleColumnsOption" class="ml12 mr12 mt6 w-full mb6 py12 adm-btn-primary--free adm-btn-small color-white">Закрыть</Button>
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Table class="custom-table custom-table--sort" ref="selection" :columns="tableFilteredColumns" :data="data" size="large"
               :stripe="false" :height="tableHeight" @on-row-dblclick="getDelo" @on-row-click="toggleSelected" @on-sort-change="sortClick"></Table>
        <div v-if="selectedListOnPage.length" ref="actionBar" class="action-bar">
          <div class="action-bar__body">
            <Button type="primary" @click="createPost()">Сформировать Постановления</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as funcUtils from "~/assets/js/utils/funcUtils";
import * as formStack from "~/assets/js/api/formStack";
import RequestApi from "~/assets/js/api/requestApi";
import { mapGetters } from "vuex";

export default {
  name: "DeloReestrForPost",
  components: {
    DateRangePickerMask: () =>
      import("~/components/shared/dateTimeRangePicker/DateRangePickerMask")
  },
  async created() {
    await this.init();
    let vm = this;
    this.$store.watch(
      this.$store.getters.deloReestrForPostGetCommand,
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
  updated() {
    try {
      this.$nextTick(() => {
        this.changeTableHeight();
      });
      window.addEventListener("resize", () => {
        this.changeTableHeight();
      });
    } catch (e) {
      this.$store.dispatch("errorsModal/changeContent", { title: e.message });
    }
  },
  destroyed() {
    this.$store.dispatch("deloReestrForPostSetCid", null);
    this.$store.dispatch("deloReestrForPostSetData", null);
  },
  data() {
    return {
      tableHeight: 0,
      from: 0,
      to: 40,
      limit: 40,
      delta: 40,
      currentPage: 1,
      columnsOptionsVisible: false,
      filter: {
        dateBegViol: null,
        dateEndViol: null,
        tag: null,
        regno: null,
        dateBegRasm: null,
        dateEndRasm: null,
        name: null
      },
      sort: {},
      columnsOptions: [
        {
          title: "Статус",
          key: "check",
          maxWidth: 50,
          ellipsis: true,
          referenceName: "check",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("Checkbox", {
              class: ["amd-checkbox"],
              attrs: {
                value: !this.columnChecked
              },
              on: {
                "on-change": () => {
                  this.toggleSelectedColumn();
                }
              }
            });
          },
          render: (h, params) => {
            return h("Checkbox", {
              class: ["amd-checkbox"],
              style: {
                "pointer-events": "none"
              },
              attrs: {
                value: params.row.selected
              }
            });
          }
        },
        {
          title: "ГРЗ", // Исходящий номер
          key: "regno",
          minWidth: 180,
          ellipsis: true,
          referenceName: "regno",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [
              h("p", { class: { "color-blue": true } }, params.row.regno)
            ]);
          }
        },
        {
          title: "Дело №",
          key: "deloN",
          minWidth: 180,
          ellipsis: true,
          referenceName: "deloN",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                params.row.deloN
              )
            ]);
          }
        },
        {
          title: "Стадия исполнения",
          key: "stadDeloName",
          minWidth: 180,
          ellipsis: true,
          referenceName: "stadDeloName",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                params.row.stadDeloName
              )
            ]);
          }
        },
        {
          title: "Последнее решение",
          key: "decisNameLast",
          minWidth: 180,
          ellipsis: true,
          referenceName: "decisNameLast",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [h("p", params.row.decisNameLast)]);
          }
        },
        {
          title: "Участник",
          key: "uchastName",
          minWidth: 180,
          ellipsis: true,
          referenceName: "uchastName",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [h("p", params.row.uchastName || params.row.ulName)]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      dataStore: "deloReestrForPostGetData"
    }),
    data() {
      let res = [];
      if (!this.isEmptyData()) {
        for (let i = this.from; i < this.to; i++) {
          let item = this.dataStore.deloList[i];
          if (item) {
            res.push(item);
          }
        }
      }
      return res;
    },
    tableFilteredColumns() {
      return this.columnsOptions.filter(column => column.visible === true);
    },
    tableColumnsForOptions() {
      return this.columnsOptions.filter(
        column => !["status"].includes(column.key)
      );
    },
    selectedList() {
      return this.dataStore.deloList.filter(el => el.selected);
    },
    selectedListOnPage() {
      // Выбранные в текущей странице
      return this.data.filter(el => el.selected);
    },
    columnChecked() {
      return this.selectedListOnPage.length !== this.data.length;
    }
  },
  methods: {
    async init() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch("deloReestrForPostSetCid", current.cid);
        let cid = funcUtils.getfromLocalStorage("admDeloReestrForPost");
        let eventResponse;

        if (funcUtils.isNull(cid)) {
          funcUtils.addToLocalStorage("admDeloReestrForPost", current.cid);
          eventResponse = await RequestApi.prepareData({
            method: "getData",
            params: {
              find: null,
              sort: null
            }
          });
        } else {
          eventResponse = await RequestApi.prepareData({
            method: "restore"
          });
          let filter = JSON.parse(eventResponse.response).data.find;
          this.parseFilter(filter);
        }
        await this.fillModule(eventResponse);
      } catch (e) {
        this.$store.dispatch("errorsModal/changeContent", { title: e.message });
      }
    },
    async fillModule(eventResponse) {
      await this.$store.dispatch("fillModule", { event: eventResponse });
      let sort = JSON.parse(eventResponse.response).data.sort;
      this.parseSort(sort);
      this.getSelectId();
    },
    isEmptyData() {
      return (
        funcUtils.isEmpty(this.dataStore) ||
        funcUtils.isEmpty(this.dataStore.deloList)
      );
    },

    computeName(e) {
      console.log(e.target.value);
    },
    toggleSelected(item) {
      this.$store.commit("deloReestrForPostToggleSelected", item);
      this.setSelectId();
    },
    toggleSelectedColumn() {
      let columnItemsSelected = this.data.filter(el => el.selected);
      this.$store.commit("deloReestrForPostChangeSelectionItems", {
        items: this.data,
        action: this.columnChecked
      });
      this.setSelectId();
    },
    setSelectId() {
      RequestApi.prepareData({
        method: "setSelectId",
        params: {
          selectId: this.selectedList.map(el => el.deloId)
        }
      });
    },
    async getSelectId() {
      let eventResponse = await RequestApi.prepareData({
        method: "getSelectId"
      });
      eventResponse = JSON.parse(eventResponse.response);
      if (!eventResponse.data.length) {
        return;
      }
      let items = this.dataStore.deloList.filter(el =>
        eventResponse.data.includes(el.deloId)
      );
      this.$store.commit("deloReestrForPostChangeSelectionItems", {
        items: items,
        action: true
      });
    },
    declOfNum(number, titles) {
      let data = [2, 0, 1, 1, 1, 2];
      number = Math.abs(number);
      return titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : data[number % 10 < 5 ? number % 10 : 5]
      ];
    },
    changePage(nextPage) {
      this.to = this.delta * nextPage;
      this.from = this.delta * nextPage - this.delta;
      this.currentPage = nextPage;
    },
    parseFilter(filter) {
      if (funcUtils.isNotEmpty(filter)) {
        for (let prop in filter) {
          if (filter.hasOwnProperty(prop)) {
            let item = filter[prop];
            if (funcUtils.isNotEmpty(item)) {
              switch (prop) {
                case "dateBegRasm":
                case "dateEndRasm":
                case "dateBegViol":
                case "dateEndViol": {
                  this.filter[prop] = new Date(item);
                  break;
                }
                default: {
                  this.filter[prop] = item;
                  break;
                }
              }
            }
          }
        }
      }
    },
    parseSort(sort) {
      if (funcUtils.isNotEmpty(sort) && funcUtils.isNotEmpty(sort.sort)) {
        sort.sort.forEach(item => {
          this.sort[item.field] = item.desc;
          this.columnsOptions.forEach(col => {
            if (
              funcUtils.isNotEmpty(col) &&
              funcUtils.isNotEmpty(col.referenceName)
            ) {
              let colNames = col.referenceName.split(",");
              colNames.forEach(colName => {
                if (colName === item.field) {
                  this.$set(col, "sortType", item.desc ? "desc" : "asc");
                }
              });
            }
          });
        });
      }
    },
    changeDateRasm(e) {
      this.filter.dateBegRasm = e.valueFirst;
      this.filter.dateEndRasm = e.valueSecond;
    },
    changeDateViol(e) {
      this.filter.dateBegViol = e.valueFirst;
      this.filter.dateEndViol = e.valueSecond;
    },
    toggleColumnsOption() {
      this.columnsOptionsVisible = !this.columnsOptionsVisible;
    },
    changeTableHeight() {
      let height = window.innerHeight;
      if (this.$refs.selection) {
        height -= this.$refs.selection.$el.getBoundingClientRect().top;
      }
      if (this.$refs.actionBar) {
        height -= this.$refs.actionBar.getBoundingClientRect().height;
      }
      this.tableHeight = height;
    },
    async createPost() {
      
      let nodeList = await RequestApi.prepareData({
        method: "getSelectNodes",
      });
      nodeList = JSON.parse(nodeList.response).data
      try {
        let params = {
          scenarioName: "CreateProtDecisDeloList",
          node: nodeList,
          title: 'Создание постановлений',
          newDelo: false
        };

        formStack.toNext({
          module: this.$store.state.wizardExecuter,
          vm: this,
          notRemoved: true,
          params: params,
          withCreate: true
        });
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    getFilterFields() {
      let filterObj = {};
      let filter = this.filter;
      for (let prop in filter) {
        if (filter.hasOwnProperty(prop)) {
          let propObj = filter[prop];
          if (
            funcUtils.isNotEmpty(propObj) &&
            (propObj === "null" || propObj.length === 0)
          ) {
            propObj = null;
          }
          filterObj[prop] = propObj;
        }
      }
      return filterObj;
    },
    getSortedFields() {
      let sortObj = {
        sort: []
      };
      let fields = this.sort;
      for (let prop in fields) {
        if (fields.hasOwnProperty(prop)) {
          let propObj = fields[prop];
          if (!funcUtils.isNull(propObj)) {
            sortObj.sort.push({
              field: prop,
              desc: propObj
            });
          }
        }
      }
      return sortObj;
    },
    async clearFilterSort() {
      this.from = 0;
      this.to = 40;
      this.limit = 40;
      this.delta = 40;
      this.currentPage = 1;
      this.columnsOptionsVisible = false;
      for (let prop in this.filter) {
        if (this.filter.hasOwnProperty(prop)) {
          this.filter[prop] = null;
        }
      }
      let eventResponse = await RequestApi.prepareData({
        method: "getData",
        params: {
          find: null,
          sort: this.getSortedFields()
        }
      });
      await this.fillModule(eventResponse);
    },
    async sortClick(name) {
      this.from = 0;
      let fields = this.sort;
      let nameArr = name.column.referenceName.split(",");
      nameArr.forEach(item => {
        switch (name.order) {
          case "asc": {
            fields[item] = false;
            break;
          }
          case "desc": {
            fields[item] = true;
            break;
          }
          case "normal": {
            fields[item] = null;
            break;
          }
        }
      });

      let sortedFields = this.getSortedFields();
      let filterFields = this.getFilterFields();
      let eventResponse = await RequestApi.prepareData({
        method: "getData",
        params: {
          find: filterFields,
          sort: sortedFields
        }
      });
      await this.fillModule(eventResponse);
    },
    async filterClick() {
      this.from = 0;
      this.to = 40;
      this.limit = 40;
      this.delta = 40;
      this.currentPage = 1;
      this.columnsOptionsVisible = false;
      let filter = this.getFilterFields();
      let sort = this.getSortedFields();
      let eventResponse = await RequestApi.prepareData({
        method: "getData",
        params: {
          find: filter,
          sort: sort
        }
      });
      await this.fillModule(eventResponse);
    },
    getDelo(delo, e) {
      try {
        let params = {
          deloId: delo.deloId,
          title: 'Поиск дел',
        };

        formStack.toNext({
          module: this.$store.state.deloTreeCardView,
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
};
</script>
<style lang='scss' scoped>
.breadcrumbs {
  height: 46px;
  color: #6b94c2;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  background: #fff;
  border-bottom: 1px solid #cccccc;
  .content {
    padding: 0 24px;
  }
}
.adm-search-filter-panel {
  .content {
    display: grid;
    grid-template-columns: repeat(3, 250px) 140px;
    grid-gap: 0 35px;
  }
  .adm-form__item {
    display: block;
    .adm-form__item-label {
      height: 18px;
    }
  }
  .buttons-wrap {
    grid-row: span 2;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: column;
    align-items: flex-end;
    justify-content: flex-start;
    grid-gap: 0 20px;
    .adm-btn {
      width: 140px;
      height: 45px;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px 0;
      padding: 0;
      &.adm-btn--blue {
        text-transform: uppercase;
        color: #fff;
        background: #1888cc;
      }
    }
  }
}
.action-bar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  .action-bar__title {
    border-bottom: 1px solid #e8eaec;
    height: 46px;
    display: flex;
    align-items: center;
    color: #6b94c2;
    padding: 0 34px;
    font-size: 16px;
    font-weight: 600;
  }
  .action-bar__body {
    padding: 0 34px;
    height: 80px;
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      margin: 0 20px;
    }
  }
}
</style>
