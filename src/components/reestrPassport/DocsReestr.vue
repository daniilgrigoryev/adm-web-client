<template>
  <div>
    <div class="breadcrumbs">
      <div class="content">
        Реестры / Документы на подписание
      </div>
    </div>
    <div class="adm-search-filter-panel adm-form">
      <div class="content">
        <div class="adm-form__item">
          <div class="adm-form__item-label">Тип документа</div>
          <CustomSelect class="adm-input adm-input--big" v-model="filter.docType" filterable clearable>
            <Option v-for="item in docTipDict" :value="item.value" :key="item.value">{{ item.label}}</Option>
          </CustomSelect>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Фамилия</div>
          <Input class="adm-input adm-input--big" placeholder="Фамилия" clearable/>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Имя</div>
          <Input class="adm-input adm-input--big" placeholder="Имя" clearable/>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Отчество</div>
          <Input class="adm-input adm-input--big" placeholder="Отчество" clearable/>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">ГРЗ</div>
          <Input class="adm-input adm-input--big" v-model="filter.regno" clearable/>
        </div>
        <div class="buttons-wrap">
          <Button @click="filterClick" type="default" class="adm-btn adm-btn--blue">Найти</Button>
          <Button @click="clearFilterSort" type="default" class="adm-btn">Очистить</Button>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Статус подписания</div>
          <CustomSelect class="adm-input adm-input--big" v-model="filter.sign" filterable clearable>
            <Option :value="0">Все</Option>
            <Option :value="1">Не подписанные</Option>
            <Option :value="2">Подписанные</Option>
          </CustomSelect>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Наименование организации</div>
          <Input class="adm-input adm-input--big" clearable/>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Период нарушения</div>
          <DateRangePickerMask class="adm-input adm-input--big adm-input-data" :valueFirst="filter.docDateBeg" :valueSecond="filter.docDateEnd"
                                clearable type="date" placeholder="дд/мм/гггг" @change="changedocDate"
                                momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DateRangePickerMask>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Период подписания</div>
          <DateRangePickerMask class="adm-input adm-input--big adm-input-data" :valueFirst="filter.signDateBeg" :valueSecond="filter.signDateEnd"
                                clearable type="date" placeholder="дд/мм/гггг" @change="changeSignDate"
                                momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DateRangePickerMask>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Период рассмотрения</div>
          <DateRangePickerMask class="adm-input adm-input--big adm-input-data" 
                                clearable type="date" placeholder="дд/мм/гггг" 
                                momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DateRangePickerMask>
        </div>
      </div>
    </div>
    <div v-if="!isEmptyData()" class="bg-white">
      <div class="content">
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
               :stripe="false" :height="tableHeight" @on-sort-change="sortClick"></Table>
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
  name: "DocsReestr",
  components: {
    DateRangePickerMask: () =>
      import("~/components/shared/dateTimeRangePicker/DateRangePickerMask")
  },
  async created() {
    await this.init();
    let vm = this;
    this.$store.watch(this.$store.getters.docsReestrGetCommand, async () => {
      try {
        await vm.init();
      } catch (e) {
        this.$store.dispatch("errorsModal/changeContent", { title: e.message });
      }
    });
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
    this.$store.dispatch("docsReestrSetCid", null);
    this.$store.dispatch("docsReestrSetData", null);
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
      docTipDict: [],
      postRegStatusDict: [],
      filter: {
        docType: null,
        docDateBeg: null,
        docDateEnd: null,
        tag: null,
        regno: null,
        signDateBeg: null,
        signDateEnd: null,
        sign: 0
      },
      sort: {},
      columnsOptions: [
        {
          title: "",
          key: "status",
          align: "center",
          width: 25,
          ellipsis: true,
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", {}, params.column.title)]);
          },
          render: (h, params) => {
            let color = this.changeClass(params.row.status);
            return h("div", {}, [
              h("div", {
                class: [
                  "round-full",
                  "w12",
                  "h12",
                  "inline-block",
                  "cursor-pointer",
                  color
                ],
                attrs: {
                  title: params.row.status
                }
              })
            ]);
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
            return h("div", [
              h("p", params.column.title),
              h(
                "p",
                {
                  class: {
                    "color-dark-base": true,
                    "adm-12": true,
                    "line-height100": true,
                    "txt-truncate": true,
                    "txt-normal": true
                  }
                },
                "Статус подписания"
              )
            ]);
          },
          render: (h, params) => {
            let date = this.$options.filters.formatDateTime(
              params.row.signTime,
              "DD.MM.YYYY HH:mm"
            );
            let status = params.row.signTime
              ? "Подписан " + date
              : "не подписано";
            return h("div", [
              h("p", { class: { "color-blue": true } }, params.row.regno),
              h("p", status)
            ]);
          }
        },
        {
          title: "Дата и время составления",
          key: "authorName",
          minWidth: 180,
          ellipsis: true,
          referenceName: "authorName",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                this.$options.filters.formatDateTime(
                  params.row.datSost,
                  "DD.MM.YYYY HH:mm"
                )
              )
            ]);
          }
        },
        {
          title: "Составил",
          key: "inspSostName",
          minWidth: 180,
          ellipsis: true,
          referenceName: "inspSostName",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [h("p", params.row.inspSostName)]);
          }
        },
        {
          title: "ФИО нарушителя",
          key: "FIO",
          minWidth: 180,
          ellipsis: true,
          referenceName: "FIO",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", [h("p", params.row.uchastName)]);
          }
        },
        {
          title: "Просмотреть",
          key: "actions",
          minWidth: 180,
          ellipsis: true,
          referenceName: "actions",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [h("p", params.column.title)]);
          },
          render: (h, params) => {
            return h("div", []);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      dataStore: "docsReestrGetData"
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
    }
  },
  methods: {
    async init() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch("docsReestrSetCid", current.cid);
        let cid = funcUtils.getfromLocalStorage("admDocsReestr");
        let eventResponse;

        if (funcUtils.isNull(cid)) {
          funcUtils.addToLocalStorage("admDocsReestr", current.cid);
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
        await this.fillDocTipDict();
      } catch (e) {
        this.$store.dispatch("errorsModal/changeContent", { title: e.message });
      }
    },
    isEmptyData() {
      return (
        funcUtils.isEmpty(this.dataStore) ||
        funcUtils.isEmpty(this.dataStore.deloList)
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
                case "docDateBeg":
                case "docDateEnd":
                case "signDateBeg":
                case "signDateEnd": {
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
    changedocDate(e) {
      this.filter.docDateBeg = e.valueFirst;
      this.filter.docDateEnd = e.valueSecond;
    },
    changeSignDate(e) {
      this.filter.signDateBeg = e.valueFirst;
      this.filter.signDateEnd = e.valueSecond;
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
      let filter = this.filter;
      for (let prop in filter) {
        if (filter.hasOwnProperty(prop)) {
          filter[prop] = null;
        }
      }
      let eventResponse = await RequestApi.prepareData({
        method: "getData",
        params: {
          filter: null,
          sort: this.getSortedFields()
        }
      });
      await this.fillModule(eventResponse);
    },
    async fillDocTipDict() {
      let eventResponse = await RequestApi.prepareData({
        method: "getDocTipDict"
      });
      let docTipDict = JSON.parse(eventResponse.response).data;
      this.docTipDict = docTipDict.map(item => {
        return {
          label: item.DOC_TIP_NAME,
          value: item.DOC_TIP
        };
      });
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
      console.log(filter);
      let eventResponse = await RequestApi.prepareData({
        method: "getData",
        params: {
          find: filter,
          sort: sort
        }
      });
      await this.fillModule(eventResponse);
    }
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
    grid-template-columns: repeat(5, 1fr) 140px;
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
</style>
