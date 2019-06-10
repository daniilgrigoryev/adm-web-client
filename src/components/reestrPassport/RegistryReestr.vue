<template>
  <div>
    <div class="breadcrumbs">
      Реестры / Почтовые реестры
    </div>
    <div class="adm-search-filter-panel adm-form">
      <div class="adm-form__item">
        <div class="adm-form__item-label">Тип реестра</div>
        <CustomSelect class="adm-input adm-input--big" v-model="filter.type" filterable clearable>
          <Option v-for="item in postRegTypeDict" :value="item.value" :key="item.value">{{ item.label}}</Option>
        </CustomSelect>
      </div>
      <div class="adm-form__item">
        <div class="adm-form__item-label">Статус</div>
        <CustomSelect class="adm-input adm-input--big" v-model="filter.status" filterable clearable>
          <Option v-for="item in postRegStatusDict" :value="item.value" :key="item.value">{{ item.label}}</Option>
        </CustomSelect>
      </div>
      <div class="adm-form__item">
        <div class="adm-form__item-label">Период</div>
        <DateRangePickerMask class="adm-input adm-input--big adm-input-data" :valueFirst="filter.begDate" :valueSecond="filter.endDate"
                              clearable type="date" placeholder="дд/мм/гггг" @change="changeDateRange"
                              momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DateRangePickerMask>
      </div>
      <div class="buttons-wrap">
        <Button @click="filterClick" type="default" class="adm-btn adm-btn--blue">Найти</Button>
        <Button @click="clearFilterSort" type="default" class="adm-btn">Очистить</Button>
        <Button @click="createRegistry" type="default" class="adm-btn">Создать запись</Button>
      </div>
      <div class="adm-form__item">
        <div class="adm-form__item-label">Автор</div>
        <Input class="adm-input adm-input--big" clearable/>
      </div>
      <div class="adm-form__item">
        <div class="adm-form__item-label"></div>
        <Input class="adm-input adm-input--big" clearable/>
      </div>
      <div class="adm-form__item">
        <div class="adm-form__item-label"></div>
        <Input class="adm-input adm-input--big" clearable/>
      </div>
    </div>
    <div v-if="!isEmptyData()" class="bg-white">
      <div class="wmax1920 mx-auto">
        <div class="flex-parent flex-parent--center-cross flex-parent--space-between-main py6 bg-white-light">
          <div class="flex-parent flex-parent--center-cross">
            <p class="adm-txt-regular color-dark-medium ml18" v-if="data.length > 0"> {{
              declOfNum(data.length, ['Найдена', 'Найдено', 'Найдены'])}} {{ data.length}}
              {{ declOfNum(data.length, ['запись', 'записи', 'записей']) }}</p>
            <Page v-if="data.length > limit" :total="data.length" :current="currentPage"
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
               :stripe="false" :height="tableHeight" @on-row-dblclick="editRegistry" @on-sort-change="sortClick"></Table>
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
  name: "RegistryReestr",
  components: {
    DateRangePickerMask: () =>
      import("~/components/shared/dateTimeRangePicker/DateRangePickerMask")
  },
  async created() {
    await this.init();
    let vm = this;
    this.$store.watch(
      this.$store.getters.registryReestrGetCommand,
      async () => {
        try {
          await vm.init();
        } catch (e) {
          this.$store.dispatch("errors/changeContent", { title: e.message });
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
      this.$store.dispatch("errors/changeContent", { title: e.message });
    }
  },
  destroyed() {
    this.$store.dispatch("registryReestrSetCid", null);
    this.$store.dispatch("registryReestrSetData", null);
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
      postRegTypeDict: [],
      postRegStatusDict: [],
      filter: {
        type: null,
        status: null,
        begDate: null,
        endDate: null
      },
      sort: {},
      columnsOptions: [
        {
          title: '',
          key: 'status',
          align: 'center',
          width: 25,
          ellipsis: true,
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h('div', [
              h('p', {
                class: {
                  'color-dark-lighter': true,
                  'adm-text-big': true,
                  'txt-normal': true,
                },
              }, params.column.title)
            ])
          },
          render: (h, params) => {
            let color = this.changeClass(params.row.status);
            return h('div', {}, [
              h('div', {
                class: ['round-full', 'w12', 'h12', 'inline-block', 'cursor-pointer', color],
                attrs: {
                  title: params.row.status
                }
              }),
            ])
          }
        },
        {
          title: "№", // Исходящий номер
          key: "curIssue",
          minWidth: 180,
          ellipsis: true,
          referenceName: "curIssue",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h('div', [
              h('p', {
                class: {
                  'color-dark-medium': true,
                  'adm-text-big': true,
                  'txt-normal': true,
                },
              }, params.column.title),
              h('p', {
                class: {
                  'color-dark-base': true,
                  'adm-12': true,
                  'line-height100': true,
                  'txt-truncate': true,
                  'txt-normal': true
                },
              }, 'Статус'),
            ])
          },
          render: (h, params) => {
            return h("div", [
              h("p",{class:{"color-blue": true}}, params.row.curIssue),
              h("p", params.row.statusName)
            ]);
          }
        },
        {
          title: "Автор",
          key: "authorName",
          minWidth: 100,
          ellipsis: true,
          referenceName: "authorName",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [h("p", params.row.authorName)]);
          }
        },
        {
          title: "Контракт",
          key: "contractName",
          minWidth: 180,
          ellipsis: true,
          referenceName: "contractName",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [h("p", params.row.contractName)]);
          }
        },
        {
          title: "Дата создания",
          key: "creationDate",
          minWidth: 180,
          ellipsis: true,
          referenceName: "creationDate",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [h("p", this.$options.filters.formatDateTime(params.row.creationDate, "DD.MM.YYYY HH:MM"))]);
          }
        },
        {
          title: "Дата отправки",
          key: "sendDate",
          minWidth: 180,
          ellipsis: true,
          referenceName: "sendDate",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [h("p", this.$options.filters.formatDateTime(params.row.sendDate, "DD.MM.YYYY HH:MM"))]);
          }
        },
        {
          title: "Отправления",
          key: "sendingsNum",
          minWidth: 180,
          ellipsis: true,
          referenceName: "sendingsNum",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [h("p", params.row.sendingsNum)]);
          }
        },
        {
          title: "Дата выгрузки",
          key: "unloadDate",
          minWidth: 180,
          ellipsis: true,
          referenceName: "unloadDate",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [h("p", this.$options.filters.formatDateTime(params.row.unloadDate, "DD.MM.YYYY HH:MM"))]);
          }
        },
        {
          title: "Состояние выгрузки",
          key: "unloadState",
          minWidth: 180,
          ellipsis: true,
          referenceName: "unloadState",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [h("p", params.row.unloadState)]);
          }
        },
      ]
    };
  },
  computed: {
    ...mapGetters({
      dataStore: "registryReestrGetData"
    }),
    data() {
      let res = [];
      if (!this.isEmptyData()) {
        for (let i = this.from; i < this.to; i++) {
          let item = this.dataStore.body[i];
          if (item) {
            res.push(item);
          }
        }
      }
      return res;
    },
    tableFilteredColumns() {
      return this.columnsOptions.filter(column => column.visible === true);
    }
  },
  methods: {
    async init() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch("registryReestrSetCid", current.cid);
        let cid = funcUtils.getfromLocalStorage("admRegistryReestr");
        let eventResponse;

        if (funcUtils.isNull(cid)) {
          funcUtils.addToLocalStorage("admRegistryReestr", current.cid);
          eventResponse = await RequestApi.prepareData({
            method: "getData",
            params: {
              filter: null,
              sort: null
            }
          });
        } else {
          eventResponse = await RequestApi.prepareData({
            method: "restore"
          });

          let filter = JSON.parse(eventResponse.response).data.filter;
          this.parseFilter(filter);
        }

        await this.fillModule(eventResponse);

        await this.fillPostRegTypeDict();
        await this.fillPostRegStatusDict();
      } catch (e) {
        this.$store.dispatch("errors/changeContent", { title: e.message });
      }
    },
    isEmptyData() {
      return (
        funcUtils.isEmpty(this.dataStore) ||
        funcUtils.isEmpty(this.dataStore.body)
      );
    },
    changeClass(statusId) {
      if (funcUtils.isNotEmpty(statusId)) {
        switch (statusId) {
          // 0-3 - красный
          // 4-7 - жёлтый
          // 8 и выше - зелёный
          case 0: {
            return "bg-red";
          }
          case 1: {
            return "bg-yellow";
          }
          case 2: {
            return "bg-green";
          }
          default: {
            return "bg-green";
          }
        }
      }
    },
    tableColumnsForOptions() {
      return this.columnsOptions.filter(
        column =>
          ![
            "action",
            "deloN",
            "deloDate",
            "stadDeloName",
            "checkPriority",
            "birthday",
            "lvokName",
            "decisNameFirst",
            "decisNameLast",
            "stadIspolnNameLast",
            "lockName"
          ].includes(column.key)
      );
    },
    declOfNum(number, titles) {
      let cases = [2, 0, 1, 1, 1, 2];
      number = Math.abs(number);
      return titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    },
    async fillModule(eventResponse) {
      await this.$store.dispatch("fillModule", { event: eventResponse });

      let sort = JSON.parse(eventResponse.response).data.sort;
      this.parseSort(sort);
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
                case "deloDatStart":
                case "deloDatEnd": {
                  this.filter[prop] = new Date(item);
                  break;
                }
                case "type":
                case "status": {
                  this.filter[prop] = item + "";
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
    changeDateRange(e) {
      this.filter.begDate = e.valueFirst;
      this.filter.endDate = e.valueSecond;
    },
    toggleColumnsOption() {
      this.columnsOptionsVisible = !this.columnsOptionsVisible;
    },
    changeTableHeight() {
      if (this.$refs.selection) {
        let tableBounds = this.$refs.selection.$el.getBoundingClientRect();
        this.tableHeight = window.innerHeight - tableBounds.y;
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
    async clearFilterSort() {
      this.from = 0;
      this.to = 40;
      this.limit = 40;
      this.delta = 40;
      this.currentPage = 1;
      this.columnsOptionsVisible = false;
      let filter = this.filter;
      // let sort = this.sort;
      for (let prop in filter) {
        if (filter.hasOwnProperty(prop)) {
          filter[prop] = null;
        }
      }
      /*for (let prop in sort) {
          if (sort.hasOwnProperty(prop)) {
            switch (prop) {
              case 'deloDate': {
                sort[prop] = true;
                break;
              }
              case 'deloN': {
                sort[prop] = true;
                break;
              }
              default: {
                sort[prop] = null;
                break;
              }
            }
          }
        }*/
      let eventResponse = await RequestApi.prepareData({
        method: "getData",
        params: {
          filter: null,
          sort: this.getSortedFields()
        }
      });
      await this.fillModule(eventResponse);
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
          filter: filterFields,
          sort: sortedFields
        }
      });
      await this.fillModule(eventResponse);
    },
    async fillPostRegTypeDict() {
      let postRegTypeDict = [];
      let eventResponse = await RequestApi.prepareData({
        method: "getPostRegTypeDictionary"
      });
      let postRegTypeList = JSON.parse(eventResponse.response).data;
      postRegTypeList.forEach(item => {
        postRegTypeDict.push({
          label: item.values["NAME"],
          value: item.values["ID"] + ""
        });
      });
      this.postRegTypeDict = postRegTypeDict;
    },
    async fillPostRegStatusDict() {
      let postRegStatusDict = [];
      let eventResponse = await RequestApi.prepareData({
        method: "getPostRegStatusDictionary"
      });
      let postRegStatusList = JSON.parse(eventResponse.response).data;
      postRegStatusList.forEach(item => {
        postRegStatusDict.push({
          label: item.values["NAME"],
          value: item.values["ID"] + ""
        });
      });
      this.postRegStatusDict = postRegStatusDict;
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
          filter: filter,
          sort: sort
        }
      });
      await this.fillModule(eventResponse);
    },
    showRegistry(registry) {
      try {
        let params = {
          id: registry.id,
          title: "Почтовые реестры"
        };

        formStack.toNext({
          module: this.$store.state.registryReestrItem,
          vm: this,
          notRemoved: false,
          params: params,
          withCreate: true
        });
      } catch (e) {
        this.$store.dispatch("errors/changeContent", { title: e.message });
      }
    },
    editRegistry(registry) {
      try {
        let params = {
          id: registry.id,
          title: "Почтовые реестры"
        };

        formStack.toNext({
          module: this.$store.state.postRegistryEdit,
          vm: this,
          notRemoved: false,
          params: params,
          withCreate: true
        });
      } catch (e) {
        this.$store.dispatch("errors/changeContent", { title: e.message });
      }
    },
    createRegistry() {
      try {
        formStack.toNext({
          module: this.$store.state.postRegistryCreate,
          vm: this,
          notRemoved: false,
          withCreate: true,
          params: {
            title: "Почтовые реестры"
          }
        });
      } catch (e) {
        this.$store.dispatch("errors/changeContent", { title: e.message });
      }
    }
  }
};
</script>
<style lang='scss' scoped>

.breadcrumbs {
  height: 46px;
  padding: 0 24px;
  color: #6b94c2;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  background: #fff;
  border-bottom: 1px solid #cccccc;
}
.adm-search-filter-panel {
  display: grid;
  grid-template-columns: repeat(3, 250px) 1fr;
  grid-gap: 0 35px;
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
</style>
