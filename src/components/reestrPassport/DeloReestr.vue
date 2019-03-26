<template>
  <div>
    <div class="adm-search-filter-panel">
      <div class="wmax1920 mx-auto">
        <div class="adm-form">
          <Row type="flex" justify="start" :gutter="8">
            <Col :xs="24" :md="20" :lg="21">
              <!-- в каждом Row не должно быть больше 4 Col -->
              <Row type="flex" justify="start" :gutter="20">
                <Col :xs="24" :md="24" :lg="12">
                  <Row type="flex" justify="start" :gutter="20">
                    <Col :xs="24" :md="24" :lg="6">
                      <div class="flex-parent flex-parent--end-cross h-full">
                        <div class="adm-form__item my12 w-full">
                          <!-- <div class="adm-text-small color-gray-medium my6"></div> -->
                          <Input class="adm-input adm-input--big" v-model="filter.deloN" placeholder="Номер дела"
                                 clearable></Input>
                        </div>
                      </div>
                    </Col>
                    <Col :xs="24" :md="24" :lg="12">
                      <Row type="flex" justify="start" :gutter="20">
                        <Col :xs="12" :md="12" :lg="14">
                          <div class="flex-parent flex-parent--end-cross h-full">
                            <div class="w-full adm-form__item my12">
                              <div class="adm-12 color-dark-lighter my6">Дата заведения дела</div>
                              <DatePickerMask class="adm-input adm-input--big adm-input-data" v-model="filter.deloDat"
                                              clearable type="date" placeholder="дд/мм/гггг"
                                              momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                            </div>
                          </div>
                        </Col>
                        <Col :xs="12" :md="12" :lg="10">
                          <div class="flex-parent flex-parent--column flex-parent--end-cross h-full">
                            <div class="w-full adm-form__item my12">
                              <div class="adm-12 color-dark-lighter my6 w-full">В текущем году</div>
                              <Select class="adm-input adm-input--big" v-model="filter.flagYear" clearable>
                                <Option value="true">Да</Option>
                                <Option value="false">Нет</Option>
                              </Select>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col :xs="24" :md="24" :lg="6">
                      <div class="flex-parent flex-parent--end-cross h-full">
                        <div class="w-full adm-form__item my12">
                          <Input class="adm-input adm-input--big" v-model="filter.regno" placeholder="ГРЗ"
                                 clearable></Input>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col :xs="24" :md="12" :lg="12">
                  <div class="flex-parent flex-parent--end-cross h-full">
                    <div class="w-full adm-form__item my12">
                      <div class="adm-12 color-dark-lighter my6">Документ дела</div>
                      <Row type="flex" :gutter="20">
                        <Col :xs="12" :md="12" :lg="12">
                          <Select class="adm-input adm-input--big" v-model="filter.docVid" filterable clearable>
                            <Option v-for="item in documentVidDict" :value="item.value" :key="item.value">{{ item.label
                              }}
                            </Option>
                          </Select>
                        </Col>
                        <Col :xs="12" :md="12" :lg="12">
                          <Input class="adm-input adm-input--big" v-model="filter.docN" placeholder="Номер документа"
                                 clearable></Input>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row type="flex" justify="start" :gutter="20" v-show="hideMore">
                <Col :xs="24" :md="12" :lg="12">
                  <div class="flex-parent flex-parent--end-cross h-full">
                    <div class="w-full adm-form__item my12">
                      <div class="adm-12 color-dark-lighter my6">Физическое лицо</div>
                      <Row type="flex" :gutter="20">
                        <Col :xs="8" :md="8" :lg="8">
                          <masked-input v-model="filter.firstName" @input="changeFIO" :maskProps="maskInputFIO"
                                      inputClass="adm-input adm-input--big" clearable
                                      placeholder="Фамилия"></masked-input>
                        </Col>
                        <Col :xs="8" :md="8" :lg="8">
                          <masked-input v-model="filter.secondName" @input="changeFIO" :maskProps="maskInputFIO"
                                      inputClass="adm-input adm-input--big" clearable placeholder="Имя"></masked-input>
                        </Col>
                        <Col :xs="8" :md="8" :lg="8">
                          <masked-input v-model="filter.thirdName" @input="changeFIO" :maskProps="maskInputFIO"
                                      inputClass="adm-input adm-input--big" clearable
                                      placeholder="Отчество"></masked-input>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>

                <Col :xs="24" :md="12" :lg="12">
                  <div class="flex-parent flex-parent--end-cross h-full">
                    <div class="w-full adm-form__item my12">
                      <div class="adm-12 color-dark-lighter my6">Стадия дела</div>
                      <Row type="flex" :gutter="20">
                        <Col :xs="24" :md="12" :lg="12">
                          <Select class="adm-input adm-input--big" v-model="filter.stadDeloKod" filterable clearable>
                            <Option v-for="item in stateDeloDict" :value="item.value" :key="item.value">{{ item.label
                              }}
                            </Option>
                          </Select>
                        </Col>
                        <Col :xs="24" :md="12" :lg="12">
                          <Select class="adm-input adm-input--big" placeholder="По статье" v-model="filter.stotvId"
                                  filterable clearable>
                            <Option style="max-width: 100%;" v-for="item in articleProcDict" :value="item.id"
                                    :key="item.id">{{ item.value + ', ' + item.label }}
                            </Option>
                          </Select>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row type="flex" justify="start" :gutter="20" v-show="hideMore">
                <Col :xs="24" :md="12" :lg="12">
                  <div class="flex-parent flex-parent--end-cross h-full">
                    <div class="w-full adm-form__item my12 wmax360">
                      <div class="adm-12 color-dark-lighter my6">Юридическое лицо</div>
                      <Input class="adm-input adm-input--big" @input="changeUlName" v-model="filter.ulName"
                             placeholder="Название организации" clearable></Input>
                    </div>
                  </div>
                </Col>
                <Col :xs="24" :md="12" :lg="12">
                  <div class="flex-parent flex-parent--end-cross h-full">
                    <div class="w-full adm-form__item my12 wmax360">
                      <Input class="adm-input adm-input--big" v-model="filter.upi" placeholder="Номер УПИ"
                             clearable></Input>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col :xs="24" :md="4" :lg="3">
              <div class="h-full flex-parent flex-parent--end-main flex-parent--wrap">
                <Button @click="filterClick" type="default"
                        class="adm-btn adm-btn-primary adm-btn-regular color-white  txt-uppercase my-auto w120 mr12">
                  найти
                </Button>
                <Button @click="clearFilter" type="default" class="adm-btn adm-btn-regular my-auto w120 mr12 mt6">
                  Очистить
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <div class="flex-parent flex-parent--end-main">
              <Button type="text" @click="hideMore = !hideMore"
                      class='bg-transparent border--0 link color-blue-base adm-btn-regular txt-underline my-auto px0 py0 mb0'
                      style="box-shadow: none">
                <span v-if="hideMore">Меньше параметров <Icon type="md-arrow-dropup" :size="16"/></span>
                <span v-else>Больше параметров  <Icon type="md-arrow-dropdown" :size="16"/></span>
              </Button>
            </div>
          </Row>
        </div>
      </div>
    </div>
    <div v-if="!isEmptyData()" class="bg-white">
      <div class="wmax1920 mx-auto">
        <div class="flex-parent flex-parent--center-cross flex-parent--space-between-main py6 bg-white-light">

          <div class="flex-parent flex-parent--center-cross">
            <p class="adm-txt-regular color-dark-medium ml18" v-if="dataStore.data.data.length > 0"> {{
              declOfNum(dataStore.data.data.length, ['Найдена', 'Найдено', 'Найдены'])}} {{ dataStore.data.data.length}}
              {{ declOfNum(dataStore.data.data.length, ['запись', 'записи', 'записей']) }}</p>
            <Page v-if="dataStore.data.data.length > limit" :total="dataStore.data.data.length" :current="currentPage"
                  :page-size="limit" class="ml12" @on-change="changePage"/>
          </div>

          <Dropdown trigger="custom" :visible="columnsOptionsVisible" placement="bottom-end">
            <Button type="text" class="block border--0" style="box-shadow: none" @click="toggleColumnsOption">
              <!-- <span class='link color-dark-medium adm-text-small txt-underline-on-hover'>показ колонок</span> -->
              <Icon type="md-settings" size="18" class="ml18"></Icon>
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem v-for="column in tableColumnsForOptions" :key="column.id" class="px0 py0">
                <Checkbox v-model="column.visible" style="padding: 7px 16px; width: 100%; height: 100%; margin: 0;">{{
                  column.title }}
                </Checkbox>
              </DropdownItem>
              <Button type="primary" @click="toggleColumnsOption" style="margin: 8px  16px;">Закрыть</Button>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Table class="custom-table" ref="selection" :columns="tableFilteredColumns" :data="cases" size="large"
               :stripe="false" :height="tableHeight" @on-row-dblclick="getDelo"></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import MaskedInput from "../shared/MaskedInput";
  import {mapGetters} from 'vuex';
  import DatePickerMask from "~/components/shared/DatePickerMask";

  export default {
    name: "DeloReestr",
    components: {
      MaskedInput,
      DatePickerMask
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        let cid = funcUtils.getfromLocalStorage('admDeloReestr');
        let eventResponse;

        if (funcUtils.isNull(cid)) {
          funcUtils.addToLocalStorage('admDeloReestr', current.cid);
          eventResponse = await RequestApi.prepareData({
            method: 'getData',
            params: {
              find: null,
              kind: null
            }
          });
        } else {
          eventResponse = await RequestApi.prepareData({
            method: 'restore'
          });

          let filter = JSON.parse(eventResponse.response).data.find;
          this.parseFilter(filter);
        }

        await this.$store.dispatch('deloReestrSetCid', current.cid);
        await this.fillModule(eventResponse);

        this.fillStateDeloDict();
        this.fillDocumentVidDict();
        this.fillArticleProcDict();
      } catch (e) {
        alert(e.message);
      }
    },
    updated() {
      try {
        this.$nextTick(() => {
          this.changeTableHeight();
        });
        window.addEventListener('resize', () => {
          this.changeTableHeight();
        });
      } catch (e) {
        this.$Notice.warning({
          title: 'Ошибка получения данных',
          desc: e.message,
          duration: 10
        });
      }
    },
    destroyed() {
      this.$store.dispatch('deloReestrSetCid', null);
      this.$store.dispatch('deloReestrSetData', null);
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
        hideMore: false,
        stateDeloDict: [],
        documentVidDict: [],
        articleProcDict: [],
        filter: {
          flagYear: 'true',
          deloN: null,
          deloDat: null,
          docVid: null,
          stadDeloKod: null,
          stotvId: null,
          checkPriority: null,
          docN: null,
          ulName: null,
          firstName: null,
          secondName: null,
          thirdName: null,
          birthday: null,
          regno: null,
          upi: null
        },
        maskInputFIO: {
          regex: '[а-яА-ЯёЁ]+',
          casing: 'upper',
          placeholder: ''
        },
        columnsOptions: []
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'deloReestrGetData'
      }),
      cases() {
        let res = [];
        if (!this.isEmptyData()) {
          for (let i = this.from; i < this.to; i++) {
            let item = this.dataStore.data.data[i];
            if (item) {
              res.push(item);
            }
          }
        }
        return res;
      },
      tableFilteredColumns() {
        return this.columnsOptions.filter(column => column.visible === true)
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
      }
    },
    methods: {
      isEmptyData() {
        return funcUtils.isEmpty(this.dataStore) || funcUtils.isEmpty(this.dataStore.data);
      },
      declOfNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        number = Math.abs(number);
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
      },
      async fillModule(eventResponse) {
        await this.$store.dispatch('fillModule', {'event': eventResponse});
        this.fillColumnsOptions();
      },
      changePage(nextPage) {
        this.to = this.delta * nextPage;
        this.from = (this.delta * nextPage) - this.delta;
        this.currentPage = nextPage;
      },
      parseFilter(filter) {
        if (funcUtils.isNotEmpty(filter)) {
          for (let prop in filter) {
            if (filter.hasOwnProperty(prop)) {
              let item = filter[prop];
              if (funcUtils.isNotEmpty(item)) {
                switch (prop) {
                  case 'deloDat': {
                    this.filter[prop] = new Date(item);
                    break;
                  }
                  case 'docVid':
                  case 'flagYear':
                  case 'stadDeloKod':
                  case 'stotvId':
                  case 'checkPriority': {
                    this.filter[prop] = item + '';
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
      changeFIO() {
        this.filter.ulName = null;
      },
      changeUlName() {
        this.filter.firstName = null;
        this.filter.secondName = null;
        this.filter.thirdName = null;
      },
      fillColumnsOptions() {
        this.columnsOptions = [];
        if (!this.isEmptyData()) {
          this.dataStore.data.fields.forEach((item) => {
            switch (item) {
              case 'deloId': {
                this.columnsOptions.push({
                  title: 'Номер дела', // Индефикационный номер
                  key: 'deloId',
                  position: 6,
                  minWidth: 180,
                  ellipsis: true,
                  visible: false,
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
                      }, 'идентификационный номер'),
                    ])
                  },
                  render: (h, params) => {
                    return h('div', [
                      h('p', params.row.deloId),
                    ])
                  }
                });
                break;
              }
              case 'stotvKod': {
                this.columnsOptions.push({
                  title: 'Статья', // Ст.-основание
                  key: 'stotvKod',
                  minWidth: 160,
                  position: 3,
                  ellipsis: true,
                  tooltip: true,
                  visible: true,
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
                      }, 'Стадия дела'),
                    ])
                  },
                  render: (h, params) => {
                    return h('div', {}, [
                      h('p', params.row.stotvKod),
                      h('p', {
                          class: {
                            'color-dark-base': true,
                            'adm-12': true,
                            'line-height100': true,
                            'txt-truncate': true,
                            'txt-normal': true
                          },
                        },
                        params.row.stadDeloName),
                    ])
                  }
                });
                break;
              }
              case 'birthday': {
                this.columnsOptions.push({
                  title: 'Дата рождения',
                  key: 'birthday',
                  position: 99,
                  minWidth: 160,
                  ellipsis: true,
                  visible: false,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'checkPriority': {
                this.columnsOptions.push({
                  title: '',
                  position: 1,
                  key: 'checkPriority',
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
                    let color = this.changeClass(params.row.checkPriority);
                    return h('div', {}, [
                      h('div', {
                        class: ['round-full', 'w12', 'h12', 'inline-block', 'cursor-pointer', color],
                        attrs: {
                          title: params.row.checkPriority
                        }
                      }),
                    ])
                  }
                });
                break;
              }
              case 'DateStadIspolnLast': {
                this.columnsOptions.push({
                  title: 'Дата после исполнения', // Дата посл.ст.исп.
                  key: 'dateStadIspolnLast',
                  position: 9,
                  minWidth: 280,
                  ellipsis: true,
                  visible: false,
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
                      }, 'решение после истечения исполнения'),
                    ])
                  },
                  render: (h, params) => {
                    let parsedDate = funcUtils.isNotEmpty(params.row.dateStadIspolnLast) ? funcUtils.parseDateTime(params.row.dateStadIspolnLast, 'DD.MM.YYYY') : '';
                    return h('div', {}, [
                      h('p', parsedDate),
                      h('Tooltip', {
                        props: {
                          content: params.row.stadIspolnNameLast,
                          transfer: true,
                          maxWidth: 120,
                        },
                      }, [
                        h('p', {
                          class: {
                            'color-dark-base': true,
                            'adm-12': true,
                            'line-height100': true,
                            'txt-truncate': true,
                            'txt-normal': true
                          }
                        }, params.row.stadIspolnNameLast),
                      ]),
                    ])
                  }
                });
                break;
              }
              case 'decisDateFirst': {
                this.columnsOptions.push({
                  title: 'Дата решения', // дата реш.
                  key: 'decisDateFirst',
                  position: 7,
                  minWidth: 220,
                  ellipsis: true,
                  visible: false,
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
                      }, 'первое решение по делу'),
                    ])
                  },
                  render: (h, params) => {
                    let parsedDate = funcUtils.isNotEmpty(params.row.decisDateFirst) ? funcUtils.parseDateTime(params.row.decisDateFirst, 'DD.MM.YYYY') : '';
                    return h('div', {}, [
                      h('p', parsedDate),
                      h('Tooltip', {
                        props: {
                          content: params.row.decisNameFirst,
                          transfer: true,
                          maxWidth: 120,
                        },
                      }, [
                        h('p', {
                          class: {
                            'color-dark-base': true,
                            'adm-12': true,
                            'line-height100': true,
                            'txt-truncate': true,
                            'txt-normal': true,
                          },
                        }, params.row.decisNameFirst),
                      ]),
                    ])
                  }
                });
                break;
              }
              case 'decisDateLast': {
                this.columnsOptions.push({
                  title: 'Дата последнего решения', // Дата посл.реш.
                  key: 'decisDateLast',
                  position: 8,
                  minWidth: 250,
                  ellipsis: true,
                  visible: false,
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
                      }, 'последнее решение по делу'),
                    ])
                  },
                  render: (h, params) => {
                    let parsedDate = funcUtils.isNotEmpty(params.row.decisDateLast) ? funcUtils.parseDateTime(params.row.decisDateLast, 'DD.MM.YYYY') : '';
                    return h('div', {}, [
                      h('p', parsedDate),
                      h('Tooltip', {
                        props: {
                          content: params.row.decisNameLast,
                          transfer: true,
                          maxWidth: 120,
                        },
                      }, [
                        h('p', {
                          class: {
                            'color-dark-base': true,
                            'adm-12': true,
                            'line-height100': true,
                            'txt-truncate': true,
                            'txt-normal': true,
                          },
                        }, params.row.decisNameLast),
                      ]),
                    ])
                  }
                });
                break;
              }
              case 'decisNameFirst': {
                this.columnsOptions.push({
                  title: 'Первое решение', // Перв.реш.
                  key: 'decisNameFirst',
                  position: 99,
                  minWidth: 180,
                  ellipsis: true,
                  visible: false,
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
                    ])
                  },
                });
                break;
              }
              case 'decisNameLast': {
                this.columnsOptions.push({
                  title: 'После решения', // Посл.реш.
                  key: 'decisNameLast',
                  position: 99,
                  minWidth: 180,
                  ellipsis: true,
                  visible: false,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'deloDate': {
                this.columnsOptions.push({
                  title: 'Дата оформления',
                  key: 'deloDate',
                  position: 99,
                  minWidth: 180,
                  ellipsis: true,
                  visible: false,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  },
                  render: (h, params) => {
                    let parsedDate = funcUtils.isNotEmpty(params.row.deloDate) ? funcUtils.parseDateTime(params.row.deloDate, 'DD.MM.YYYY') : '';
                    return h('div', {}, [
                      h('p', parsedDate)
                    ])
                  }
                });
                break;
              }
              case 'deloN': {
                this.columnsOptions.push({
                  title: '№ дела',
                  key: 'deloN',
                  minWidth: 145,
                  position: 2,
                  ellipsis: true,
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
                      }, 'Дата оформления'),
                    ])
                  },
                  render: (h, params) => {
                    let parsedDate = funcUtils.isNotEmpty(params.row.deloDate) ? funcUtils.parseDateTime(new Date(params.row.deloDate), 'DD.MM.YYYY') : '';
                    return h('div', {
                      on: {
                        click: () => {
                          this.getDelo(params.row);
                        }
                      },
                      class: ['cursor-pointer']
                    }, [
                      h('p', {
                        class: ['txt-underline', 'color-blue']
                      }, params.row.deloN),
                      h('p', {
                          class: {
                            'color-dark-base': true,
                            'adm-12': true,
                            'line-height100': true,
                            'txt-truncate': true,
                            'txt-normal': true
                          },
                        },
                        parsedDate),
                    ])
                  }
                });
                break;
              }
              case 'deloVidName': {
                this.columnsOptions.push({
                  title: 'Вид дела',
                  key: 'deloVidName',
                  position: 99,
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'docN': {
                this.columnsOptions.push({
                  title: 'Протокол',
                  key: 'docN',
                  position: 99,
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'lockName': {
                this.columnsOptions.push({
                  title: 'Блок.дела',
                  key: 'lockName',
                  position: 99,
                  minWidth: 180,
                  visible: false,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'lvokName': {
                this.columnsOptions.push({
                  title: 'ЛВОК',
                  key: 'lvokName',
                  position: 99,
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'opredN': {
                this.columnsOptions.push({
                  title: 'Определение', // Определение/Доп.прот.
                  key: 'opredN',
                  position: 99,
                  minWidth: 220,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'ccolor-dark-medium': true,
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
                      }, 'дополнительный протокол'),
                    ])
                  },
                });
                break;
              }
              case 'postN': {
                this.columnsOptions.push({
                  title: 'Постановление АПН', // Постан./ПК
                  key: 'postN',
                  position: 99,
                  minWidth: 200,
                  ellipsis: true,
                  visible: false,
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
                    ])
                  },
                });
                break;
              }
              case 'protN': {
                this.columnsOptions.push({
                  title: 'Протокол АПН',
                  key: 'protN',
                  position: 99,
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'regno': {
                this.columnsOptions.push({
                  title: 'ГРЗ', // РегЗнак
                  key: 'regno',
                  position: 5,
                  visible: true,
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'stadDeloName': {
                this.columnsOptions.push({
                  title: 'Стадия дела',
                  key: 'stadDeloName',
                  position: 99,
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  visible: false,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'stadIspolnNameLast': {
                this.columnsOptions.push({
                  title: 'Решение после исполнения', // Посл.ст.исп.
                  key: 'stadIspolnNameLast',
                  position: 99,
                  minWidth: 250,
                  visible: false,
                  ellipsis: true,
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
                    ])
                  }
                });
                break;
              }
              case 'stotv': {
                this.columnsOptions.push({
                  title: 'Статья', // статья нарушения
                  key: 'stotv',
                  position: 99,
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'uchastName': {
                this.columnsOptions.push({
                  title: 'ЛВОК', // бывшее - участник
                  key: 'uchastName',
                  position: 4,
                  minWidth: 230,
                  visible: true,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('Tooltip', {
                        props: {
                          content: 'Лицо в отношении которого ведется дело',
                          transfer: true,
                          maxWidth: 100,
                        },
                      }, [
                        h('p', {
                          class: {
                            'color-dark-medium': true,
                            'adm-text-big': true,
                            'txt-normal': true,
                          },
                        }, params.column.title),
                      ]),
                      h('p', {
                        class: {
                          'color-dark-base': true,
                          'adm-12': true,
                          'line-height100': true,
                          'txt-truncate': true,
                          'txt-normal': true
                        },
                      }, 'Дата рождения'),
                    ])
                  },
                  render: (h, params) => {
                    let parsedDate = funcUtils.isNotEmpty(params.row.birthday) ? params.row.birthday.split('/').join('.') + ' г.р.' : '';
                    return h('div', {}, [
                      h('Tooltip', {
                        props: {
                          content: params.row.uchastName,
                          transfer: true,
                          maxWidth: 250,
                          placement: 'left-start'
                        },
                      }, [
                        h('span', {
                          class: {
                            'txt-truncate': true,
                          }
                        }, params.row.uchastName),
                      ]),
                      h('p', {
                          class: {
                            'color-dark-base': true,
                            'adm-12': true,
                            'line-height100': true,
                            'txt-truncate': true,
                            'txt-normal': true
                          },
                        },
                        parsedDate),
                    ])
                  }
                });
                break;
              }
              case 'ulName': {
                this.columnsOptions.push({
                  title: 'Участник',
                  key: 'ulName',
                  position: 99,
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-dark-medium': true,
                          'adm-text-big': true,
                          'txt-normal': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
            }
          });
          if (this.columnsOptions.length > 0) {
            this.columnsOptions = this.columnsOptions.sort((a, b) => {
              return a.position - b.position;
            });
            this.columnsOptions.push({
              title: "Действия",
              width: 120,
              align: "center",
              key: 'action',
              visible: false,
              fixed: "right",
              renderHeader: (h, params) => {
                return h('Tooltip', {
                  props: {
                    placement: 'left',
                    content: params.column.title,
                    transfer: true,
                  }
                }, [
                  h('div', [
                    h('p', {
                      class: {
                        'color-dark-medium': true,
                        'adm-text-big': true,
                        'txt-normal': true,
                      },
                    }, params.column.title),
                  ])
                ])
              },
              render: (h, params) => {
                return h("Icon", {
                  props: {
                    type: "ios-open-outline",
                    size: 22,
                  },
                  style: {
                    cursor: "pointer",
                    color: "#2d8cf0"
                  },
                  attrs: {
                    title: 'открыть'
                  },
                  on: {
                    click: () => {
                      this.getDelo(params.row);
                    }
                  }
                });
              },
            });
          }
        }
      },
      changeClass(errorPriority) {
        if (funcUtils.isNotEmpty(errorPriority)) {
          switch (errorPriority) {
            case 1: {
              return "bg-red";
            }
            case 2: {
              return "bg-orange";
            }
            case 3: {
              return "bg-yellow";
            }
            case 4: {
              return "bg-green";
            }
            case 5: {
              return "bg-blue";
            }
            case 6: {
              return "bg-purple";
            }
            case 7: {
              return "bg-gray";
            }
            case 8: {
              return "bg-black";
            }
            case 9: {
              return "bg-blue-faint";
            }
            default: {
              return "";
            }
          }
        }
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
            if (funcUtils.isNotEmpty(propObj) && (propObj === "null" || propObj.length === 0)) {
              propObj = null;
            }
            filterObj[prop] = propObj;
          }
        }

        return filterObj;
      },
      async clearFilter() {
        let filter = this.filter;
        for (let prop in filter) {
          if (filter.hasOwnProperty(prop)) {
            switch (prop) {
              case 'flagYear': {
                filter[prop] = 'true';
                break;
              }
              default: {
                filter[prop] = null;
                break;
              }
            }
          }
        }
        let eventResponse = await RequestApi.prepareData({
          method: 'getData',
          params: {
            find: null,
            kind: null
          }
        });
        await this.fillModule(eventResponse);
      },
      async fillStateDeloDict() {
        let stateDeloDict = [];
        let eventResponse = await RequestApi.prepareData({
          method: 'getStageDeloDictionary'
        });
        let stateDeloList = JSON.parse(eventResponse.response).data;
        stateDeloList.forEach((item) => {
          stateDeloDict.push({
            label: item.values['STAD_DELO_NAME'],
            value: item.values['STAD_DELO_KOD'] + ''
          })
        });
        this.stateDeloDict = stateDeloDict;
      },
      async fillDocumentVidDict() {
        let documentVidDict = [];
        let eventResponse = await RequestApi.prepareData({
          method: 'getDocumetVidDictionary'
        });
        let documentVidList = JSON.parse(eventResponse.response).data;
        documentVidList.forEach((item) => {
          documentVidDict.push({
            label: item.values['DOC_VID_NAME'],
            value: item.values['DOC_VID'] + ''
          })
        });
        this.documentVidDict = documentVidDict;
      },
      async fillArticleProcDict() {
        let articleProcDict = [];
        let eventResponse = await RequestApi.prepareData({
          method: 'getArticleProcDictionary'
        });
        let articleProcList = JSON.parse(eventResponse.response).data;
        articleProcList.forEach((item) => {
          articleProcDict.push({
            label: item.values['STOTV_NAME'],
            value: item.values['STOTV_KOD'].split(' ').join(''),
            id: item.values['STOTV_ID'] + ''
          })
        });
        this.articleProcDict = articleProcDict;
      },
      async filterClick() {
        this.hideMore = false;
        let filter = this.getFilterFields();
        let eventResponse = await RequestApi.prepareData({
          method: 'getData',
          params: {
            find: filter,
            kind: null
          }
        });
        await this.fillModule(eventResponse);
      },
      getDelo(delo) {
        try {
          let params = {
            deloId: delo.deloId
          };

          formStack.toNext({
            module: this.$store.state.deloTreeCardView,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          alert(e.message);
        }
      },
    }
  }
</script>

<style lang='scss' scoped>
</style>
