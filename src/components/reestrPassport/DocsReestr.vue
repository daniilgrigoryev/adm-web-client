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
          <div class="adm-form__item-label">Тип документа *</div>
          <CustomSelect class="adm-input adm-input--big" v-model="filter.docType" filterable clearable @on-enter="filterClick">
            <Option v-for="item in docTipDict" :value="item.value" :key="item.value">{{ item.label}}</Option>
          </CustomSelect>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Название участника</div>
          <Input class="adm-input adm-input--big"  v-model="filter.name" @on-enter="filterClick" placeholder="ФИО или название организации" clearable />
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">ГРЗ</div>
          <Input class="adm-input adm-input--big" v-model="filter.regno" @on-enter="filterClick" clearable/>
        </div>
        <div class="buttons-wrap">
          <Button @click="filterClick" type="default" class="adm-btn adm-btn--blue">Найти</Button>
          <Button @click="clearFilterSort" type="default" class="adm-btn">Очистить</Button>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Статус подписания *</div>
          <CustomSelect class="adm-input adm-input--big" v-model="filter.sign" @on-enter="filterClick">
            <Option :value="0">Все</Option>
            <Option :value="1">Не подписанные</Option>
            <Option :value="2">Подписанные</Option>
          </CustomSelect>
        </div>
        <div class="adm-form__item">
          <div class="adm-form__item-label">Период документа *</div>
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
               :stripe="false" :height="tableHeight" @on-row-dblclick="getDelo" @on-sort-change="sortClick"></Table>
        <div v-if="selectedToSignList.length || selectedToReestrList.length" ref="actionBar" class="action-bar">
          <div class="action-bar__title">Подписать выбранные документы</div>
          <div class="action-bar__body">
            <div class="select-items-count-wrap">
              <div class="count-block" v-if="selectedToSignList.length">
                <small class="adm-form__label">На подписание</small>
                <b>{{selectedToSignList.length}}</b>
              </div>
              <div class="count-block" v-if="selectedToReestrList.length">
                <small class="adm-form__label">В реестр</small>
                <b>{{selectedToReestrList.length}}</b>
              </div>
            </div>
            <template v-if="selectedToSignList.length">
              <small class="adm-form__label">Имя подписи</small>
              <CustomSelect class="adm-input adm-input--regular wmax360 wmin180" placeholder="" v-model="sertificateNumber" clearable filterable @on-open-change="openSings" @on-enter="signData">
                <Option class="wmax360 " v-for="item in signList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </CustomSelect>
            </template>
            <div class="button-wrap">
              <Button :disabled="!sertificateNumber && !selectedToReestrList.length" type="primary" @click="submit">
                {{ selectedToSignList.length && selectedToReestrList.length 
                  ? "Подписать и добавить"
                  : selectedToSignList.length
                    ? "Подписать"
                    : "Добавить"
                }}
              </Button>
            </div>
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
import { mapGetters, mapActions, mapMutations } from "vuex";
import 'crypto-pro';

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
        let tableBodyTr = document.querySelectorAll(".ivu-table-body tr");
        if (tableBodyTr) {
          tableBodyTr.forEach(item => {
            item.addEventListener("contextmenu", e => {
              e.preventDefault();
              let deloId = item.querySelector("ul[id]").id;
              this.onContextMenuClick(e, deloId);
            });
          });
        }
        this.changeTableHeight();
      });
      window.addEventListener("resize", () => {
        this.changeTableHeight();
      });
    } catch (e) {
      this.$Notice.warning({
        title: "Ошибка получения данных",
        desc: e.message,
        duration: 10
      });
    }
  },
  destroyed() {
    this.$store.dispatch("docsReestrSetCid", null);
    this.$store.dispatch("docsReestrSetData", null);
    this.$store.dispatch("deloReestrForPostSetDeloErrors", []);
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
          title: "На подписание",
          key: "toSign",
          width: 180,
          ellipsis: true,
          referenceName: "toSign",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                class: ["amd-checkbox"],
                attrs: {
                  value: this.AllSelectedToSign,
                  disabled: !this.columnSigned
                },
                on: {
                  "on-change": (e) => {
                    this.docsReestrToggleSelectedToSignAll(e);
                  }
                }
              }),
              h("span", params.column.title),
            ]);
          },
          render: (h, params) => {
            return h("Checkbox", {
              class: ["amd-checkbox"],
              attrs: {
                value: params.row.selected.toSign,
                disabled: funcUtils.isNotEmpty(params.row.signTime)
              },
              on: {
                "on-change": () => {
                  this.docsReestrToggleSelectedToSign(params.row);
                }
              }
            });
          }
        },
        {
          title: "В реестр",
          key: "toReestr",
          width: 150,
          ellipsis: true,
          referenceName: "toReestr",
          visible: true,
          tooltip: true,
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                class: ["amd-checkbox"],
                attrs: {
                  value: this.AllSelectedToReestr,
                },
                on: {
                  "on-change": (e) => {
                    this.docsReestrToggleSelectedToReestrAll(e);
                  }
                }
              }),
              h("span", params.column.title),
            ]);
          },
          render: (h, params) => {
            return h("Checkbox", {
              class: ["amd-checkbox"],
              attrs: {
                value: params.row.selected.toReestr,
              },
              on: {
                "on-change": () => {
                  this.docsReestrToggleSelectedToReestr(params.row);
                }
              }
            });
          }
        },
        {
          title: "№ Документа",
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
                "a",
                {
                  domProps: {
                    href: "javascript:void(0)"
                  },
                  class: { "color-blue": true },
                  on: {
                    click: e => {
                      this.getDelo(params.row, e);
                    }
                  }
                },
                params.row.docN
              ),
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
            let items = [
              {
                name: `Открыть дело с документом №${params.row.docN} в новой вкладке`
              }
            ];
            let date = this.$options.filters.formatDateTime(
              params.row.signTime,
              "DD.MM.YYYY HH:mm"
            );
            let status = params.row.signTime
              ? "Подписан " + date
              : "не подписано";
            return h("div", [
              h(
                "a",
                {
                  domProps: {
                    href: "javascript:void(0)"
                  },
                  class: { "color-blue": true },
                  on: {
                    click: e => {
                      this.getDelo(params.row, e);
                    }
                  }
                },
                params.row.regno
              ),
              h("p", status),
              h(
                "ul",
                {
                  domProps: {
                    id: params.row.deloId
                  },
                  class: {
                    "context-menu": true
                  },
                  on: {
                    mouseleave: this.outsideContextMenuClick
                  }
                },
                [
                  items.map(item => {
                    return h("li", [
                      h(
                        "span",
                        {
                          on: {
                            click: e => {
                              this.getDeloNewTab(params.row);
                            }
                          }
                        },
                        item.name
                      )
                    ]);
                  })
                ]
              )
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
            return h("div", [
              h("p", params.row.uchastName || params.row.ulName)
            ]);
          }
        }
      ],
      signList: [],
      sertificateObj: {},
      sertificateNumber: null,
    };
  },
  computed: {
    ...mapGetters({
      dataStore: "docsReestrGetData",
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

    selectedToSignList() {
      return this.dataStore.deloList.filter(el => el.selected.toSign);
    },
    selectedToReestrList() {
      return this.dataStore.deloList.filter(el => el.selected.toReestr);
    },
    AllSelectedToSign() {
      return this.selectedToSignList.length > 0;
    },
    AllSelectedToReestr() {
      return this.selectedToReestrList.length > 0;
    },
    columnSigned() {
      return this.dataStore.deloList.filter(el => funcUtils.isEmpty(el.signTime)).length > 0;
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
        await this.docsReestrGetSelectToSign();
        await this.docsReestrGetSelectToReestr();
        await this.fillModule(eventResponse);
        await this.fillDocTipDict();
      } catch (e) {
        this.$store.dispatch("errorsModal/changeContent", { title: e.message });
      }
    },
    async fillModule(eventResponse) {
      await this.$store.dispatch("fillModule", { event: eventResponse });
      let sort = JSON.parse(eventResponse.response).data.sort;
      this.parseSort(sort);
    },
    isEmptyData() {
      return (
        funcUtils.isEmpty(this.dataStore) ||
        funcUtils.isEmpty(this.dataStore.deloList)
      );
    },
    ...mapActions([
      "docsReestrToggleSelectedToSign",
      "docsReestrToggleSelectedToSignAll",
      "docsReestrToggleSelectedToReestr",
      "docsReestrToggleSelectedToReestrAll",
      "docsReestrGetSelectToSign",
      "docsReestrGetSelectToReestr",
      "docsReestrSetItemSignTime",
    ]),

    async submit() {
      await this.signData()
    },
    async fillSignList() {
      try {
        let signList = await this.getSignList();
        let sName = signList['SubjectName'];
        let sNumber = signList['SerialNumber'];
        let vFromDate = signList['ValidFromDate'];
        let vToDate = signList['ValidToDate'];

        let nameSplit = sName.split(";");
        let numberSplit = sNumber.split(";");
        let fDateSplit = vFromDate.split(";");
        let tDateSplit = vToDate.split(";");

        this.signList = [];
        for (let i = 0; i < nameSplit.length; i++) {
          if (numberSplit[i].length > 0) {
            this.signList.push({
              label: nameSplit[i] + "; " + numberSplit[i] + "; " + fDateSplit[i] + "; " + tDateSplit[i],
              value: numberSplit[i]
            });
            this.sertificateObj[numberSplit[i]] = {
              IssuerName: '',
              SubjectName: nameSplit[i],
              SerialNumber: numberSplit[i],
              ValidFromDate: fDateSplit[i],
              ValidToDate: tDateSplit[i]
            }
          }
        }
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e,});
      }
    },
    getSignList() {
      let CADESCOM_CADES_BES = 1;
      let CAPICOM_CURRENT_USER_STORE = 2;
      let CAPICOM_MY_STORE = "My";
      let CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
      let CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;

      return new Promise(function (resolve, reject) {
        cadesplugin.async_spawn(function* (args) {
          try {
            let oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
            yield oStore.Open(CAPICOM_CURRENT_USER_STORE, CAPICOM_MY_STORE,
              CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

            let CertificatesObj = yield oStore.Certificates;

            let cnt = yield CertificatesObj.Count;
            let res = {};
            res.SubjectName = '';
            res.SerialNumber = '';
            res.ValidFromDate = '';
            res.ValidToDate = '';
            for (let i = 1; i <= cnt; i++) {
              let oCertificates = yield CertificatesObj.Item(i);
              let name = yield oCertificates.SubjectName;
              name = name.replace(new RegExp("\\n", 'g'), ',');
              res.SubjectName = res.SubjectName + ';' + name;
              let num = yield oCertificates.SerialNumber;
              res.SerialNumber = res.SerialNumber + ';' + num;
              let fdate = yield oCertificates.ValidFromDate;
              res.ValidFromDate = res.ValidFromDate + ';' + fdate;
              let tdate = yield oCertificates.ValidToDate;
              res.ValidToDate = res.ValidToDate + ';' + tdate;
            }

            yield oStore.Close();

            args[0](res);
          } catch (e) {
            args[1]("Failed to create signature. Error: " + cadesplugin.getLastError(e));
          }
        }, resolve, reject);
      });
    },
    openSings(opened) {
      if (opened) {
        this.fillSignList();
      }
    },
    signCreate(certSerialNumber, dataToSign) {
      let CADESCOM_CADES_BES = 1;
      let CAPICOM_CURRENT_USER_STORE = 2;
      let CAPICOM_MY_STORE = "My";
      let CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
      let CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;

      return new Promise(function (resolve, reject) {
        cadesplugin.async_spawn(function* (args) {
          try {
            let oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
            yield oStore.Open(CAPICOM_CURRENT_USER_STORE, CAPICOM_MY_STORE,
              CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

            let CertificatesObj = yield oStore.Certificates;
            let oCertificate = {};
            let cnt = yield CertificatesObj.Count;
            for (let i = 1; i <= cnt; i++) {
              let vCertificate = yield CertificatesObj.Item(i);
              let num = yield vCertificate.SerialNumber;
              if (certSerialNumber == num) {
                oCertificate = vCertificate;
                break;
              }
            }

            let oSigner = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
            yield oSigner.propset_Certificate(oCertificate);

            let oSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
            yield oSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
            yield oSignedData.propset_Content(dataToSign);

            let resObj = {};

            let sSignedMessage = yield oSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES, true);

            resObj.Message = sSignedMessage;
            resObj.SubjectName = yield oCertificate.SubjectName;
            resObj.SerialNumber = yield oCertificate.SerialNumber;
            resObj.IssuerName = yield oCertificate.IssuerName;
            resObj.ValidFromDate = yield oCertificate.ValidFromDate;
            resObj.ValidToDate = yield oCertificate.ValidToDate;

            yield oStore.Close();

            args[2](resObj);
          } catch (e) {
            args[3]("Failed to create signature. Error: " + cadesplugin.getLastError(e));
          }
        }, certSerialNumber, dataToSign, resolve, reject);
      });
    },
    async signData() {
      try {
        let successSignCount = 0;
        for (const selectedObj of this.selectedToSignList) {
          let signObjectResponse = await RequestApi.prepareData({
            method: "getSignObj",
            params: {
              cardId: selectedObj.cardId
            }
          });
          let signObj = JSON.parse(signObjectResponse.response);
          if (signObj.data) {
            let dataToSign = window.btoa(unescape(encodeURIComponent(signObj.data.sourceData)));
            let sign = await this.signCreate(this.sertificateNumber, dataToSign);
            if (sign) {
              this.sertificateObj[this.sertificateNumber].IssuerName = sign.IssuerName;
              signObj.data.signDataBase64 = sign.Message;
              signObj.data.certSerialNumber = sign.SerialNumber;
              signObj.data.certSubject = sign.SubjectName;
              signObj.data.certIssuer = sign.IssuerName;
              signObj.data.certValidFrom = sign.ValidFromDate;
              signObj.data.certValidTo = sign.ValidToDate;

              let saveSignResponse = await RequestApi.prepareData({
                method: "saveSign",
                params: {
                  sign: signObj.data
                }
              });
              let saveSign = JSON.parse(saveSignResponse.response);
              if (!saveSign.data) {
                this.$store.dispatch('errorsModal/changeContent', {title: 'Не удалось подписать документ' + (selectedObj.docN !== null ? '№ ' + selectedObj.docN : '') + '<br />' + saveSign.error.errorMsg + '<br />' + 'Подписано документов успешно ' + successSignCount, desc: saveSign.error.errorDesc});
                return;
              } else {
                this.docsReestrToggleSelectedToSign(selectedObj)
                this.docsReestrSetItemSignTime(selectedObj)
                successSignCount++;
              }
            }
          } else {
            this.$store.dispatch('errorsModal/changeContent', {title: 'Не удалось подписать документ' + (selectedObj.docN !== null ? '№ ' + selectedObj.docN : '') + '<br />' + signObj.error.errorMsg + '<br />' + 'Подписано документов успешно ' + successSignCount, desc: signObj.error.errorDesc});
            return;
          }
        };
        if (successSignCount > 0) {
          this.$store.dispatch('dialogModal/changeContent', {title: 'Документы успешно подписаны: ' + successSignCount});
          await this.docsReestrGetSelectToSign();
          await this.filterClick();
        }
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e, desc: e,});
      }
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
      let height = window.innerHeight;
      if (this.$refs.selection) {
        height -= this.$refs.selection.$el.getBoundingClientRect().top;
      }
      if (this.$refs.actionBar) {
        height -= this.$refs.actionBar.getBoundingClientRect().height;
      }
      this.tableHeight = height;
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
      this.filter.sign = 0;
      let eventResponse = await RequestApi.prepareData({
        method: "getData",
        params: {
          find: null,
          sort: this.getSortedFields()
        }
      });
      await RequestApi.prepareData({
        method: 'setSelectId',
        params: {
          selectId: [],
        },
      });
      await RequestApi.prepareData({
        method: 'setSelectPostId',
        params: {
          selectPostId: [],
        },
      });
      await this.docsReestrGetSelectToSign();
      await this.docsReestrGetSelectToReestr();
      await this.fillModule(eventResponse);
    },
    async fillDocTipDict() {
      let eventResponse = await RequestApi.prepareData({
        method: "getDocTipDict"
      });
      let { data } = JSON.parse(eventResponse.response);
      this.docTipDict = data.map(item => {
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
      let eventResponse = await RequestApi.prepareData({
        method: "getData",
        params: {
          find: filter,
          sort: sort
        }
      });
      await this.docsReestrGetSelectToSign();
      await this.docsReestrGetSelectToReestr();
      await this.fillModule(eventResponse);
    },
    getDelo(delo, e) {
      try {
        if (e && e.ctrlKey) {
          this.getDeloNewTab(delo);
          return;
        }
        let params = {
          deloId: delo.deloId,
          title: "Поиск дел"
        };
        formStack.toNext({
          module: this.$store.state.deloTreeCardView,
          vm: this,
          notRemoved: false,
          params: params,
          withCreate: true
        });
      } catch (e) {
        this.$store.dispatch("errorsModal/changeContent", { title: e.message });
      }
    },
    outsideContextMenuClick(e) {
      let menus = document.querySelectorAll(".context-menu");
      menus.forEach(item => {
        item.style.display = "none";
      });
    },
    onContextMenuClick(e, id) {
      let menus = document.querySelectorAll(".context-menu");
      menus.forEach(item => {
        item.style.display = "none";
      });

      if (id) {
        let contextMenu = document.getElementById(id);
        contextMenu.style.display = "block";
        contextMenu.style.top = e.y - 15 + "px";
        contextMenu.style.left = e.x - 15 + "px";
      }
    },
    getDeloNewTab(delo) {
      try {
        let params = {
          deloId: delo.deloId,
          title: "Поиск дел"
        };

        formStack.toNextNewTab({
          module: this.$store.state.deloTreeCardView,
          vm: this,
          notRemoved: false,
          params: params,
          withCreate: true,
          withTransition: false
        });
      } catch (e) {
        this.$store.dispatch("errorsModal/changeContent", { title: e.message });
      }
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
    position: relative;
    .select-items-count-wrap {
      position: absolute;
      left: 35px;
      top: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      align-items: center;
      .count-block {
        margin-right: 30px;
        b {
          font-size: 16px;
        }
      }
    }
    .adm-form__label {
      text-align: right;
      font-size: 14px;
      color: #797979;
      line-height: 1;
      font-weight: 500;
      line-height: 16px;
      padding-right: 10px;
    }
    .button-wrap {
      width: 160px;
      margin: 0 20px;
    }
  }
}
</style>
<style lang="scss">
.context-menu {
  background: white;
  position: fixed;
  z-index: 1;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 6px;
  border-color: #515a6e;
  cursor: pointer;
  display: none;

  li {
    padding: 10px;
  }
}
</style>

