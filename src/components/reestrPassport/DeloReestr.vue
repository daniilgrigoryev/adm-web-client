<template>
  <div v-if="dataStore">
    <div class="bg-gray-faint py24 px12">
      <div class="wmax1920 mx-auto"><!-- wmax1920 -->
        <a href="#" @click="getOffense">sdfdsf</a>
        <Form inline label-position="top">
          <Row type="flex" justify="start" :gutter="8">
            <Col :xs="24" :md="20" :lg="22">
              <!-- в каждом Row не должно быть больше 4 Col -->
              <Row type="flex" justify="start" :gutter="8">
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Номер дела</div>
                    <Input class="adm-input adm-input--big" v-model="filter.deloN.value" placeholder="Номер дела" clearable></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <Row type="flex" :gutter="6">
                    <Col :xs="12" :md="18" :lg="12">
                      <FormItem class="w-full">
                        <div slot="label" class="adm-text-small color-gray-medium">Дата заведения дела</div>
                        <DatePicker class="w-full adm-input adm-input--big" type="date" format="dd-MM-yyyy" v-model="filter.deloDat.value" placeholder="Дата заведения дела"></DatePicker>
                      </FormItem>
                    </Col>
                    <Col :xs="12" :md="6" :lg="12">
                       <FormItem class="w-full align-center">
                          <div slot="label" class="adm-text-small color-gray-medium">Искать только в текущем году</div>
                          <RadioGroup v-model="filter.flagYear.value">
                            <Radio label="true">Да</Radio>
                            <Radio label="false">Нет</Radio>
                          </RadioGroup>
                        </FormItem>
                    </Col>
                  </Row>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">ГРЗ автомобиля</div>
                    <Input class="adm-input adm-input--big" v-model="filter.regno.value" placeholder="ГРЗ автомобиля" clearable></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Документ прикрепленный к делу</div>
                    <Row type="flex" :gutter="6">
                      <Col :xs="12" :md="12" :lg="12">
                        <Select class="adm-input adm-input--big" placeholder="Выбрать" v-model="filter.docVid.value" filterable clearable>
                          <option value="null"> </option>
                          <Option class="wmax360 txt-break-word" v-for="item in documentVidDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </Col>
                      <Col :xs="12" :md="12" :lg="12">
                        <Input class="adm-input adm-input--big" v-model="filter.docN.value" placeholder="Номер документа"></Input>
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
              </Row>

              <Row type="flex" justify="start" :gutter="8" v-show="hideMore">
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Физическое лицо - ЛВОК</div>
                    <Row type="flex" :gutter="6">
                      <Col :xs="8" :md="8" :lg="8">
                        <Input class="adm-input adm-input--big" v-model="filter.firstName.value" placeholder="Фамилия"></Input>
                      </Col>
                      <Col :xs="8" :md="8" :lg="8">
                        <Input class="adm-input adm-input--big" v-model="filter.secondName.value" placeholder="Имя"></Input>
                      </Col>
                      <Col :xs="8" :md="8" :lg="8">
                        <Input class="adm-input adm-input--big" v-model="filter.thirdName.value" placeholder="Отчество"></Input>
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Стадия дела</div>
                    <Row type="flex" :gutter="6">
                      <Col :xs="24" :md="12" :lg="12">
                        <Select class="adm-input adm-input--big" placeholder="Выбрать" v-model="filter.stadDeloKod.value" filterable clearable>
                          <option value="null"> </option>
                          <Option class="wmax360 txt-break-word" v-for="item in stateDeloDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </Col>
                      <Col :xs="24" :md="12" :lg="12">
                        <Select class="adm-input adm-input--big" placeholder="По статье" v-model="filter.stotvId.value" filterable clearable>
                          <option value="null"> </option>
                          <Option class="wmax360 txt-break-word" v-for="item in articleProcDict" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                        </Select>
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Юридическое лицо - ЛВОК</div>
                    <Input class="adm-input adm-input--big" v-model="filter.ulName.value" placeholder="Название организации"></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Номер УПИ</div>
                    <Input class="adm-input adm-input--big" v-model="filter.upi.value" placeholder="Номер УПИ"></Input>
                  </FormItem>
                </Col>
              </Row>

              <Row type="flex" justify="start" :gutter="8" v-show="hideMore">
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Приоритет ошибки</div>
                    <Input class="adm-input adm-input--big" v-model="filter.checkPriority.value" placeholder="Приоритет ошибки"></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Дата рождения</div>
                    <input-mask v-model="filter.birthday.value" :maskProps="maskProps" :value="filter.birthday.value" :inputProps="inputProps"></input-mask>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col :xs="24" :md="4" :lg="2">
              <div class="h-full flex-parent flex-parent--column flex-parent--center-cross flex-parent--center-main">
                <Button @click="filterClick" type="primary" class="my-auto">Фильтровать</Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col :xs="24" :md="24" :lg="24">
              <Button @click="createWizardScenarioPost" type="primary" class="mx6">Создать постановление</Button>
              <a href='#Links' @click="hideMore = !hideMore" class='link color-blue-base adm-btn-small txt-underline-on-hover my-auto px0 py0 mb0'>
                <span v-if="hideMore">Меньше параметров</span>
                <span v-else>Больше параметров</span>
              </a>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <div class="bg-white">
      <div class="wmax1920 mx-auto">
        <div class="flex-parent flex-parent--end-main">
          <Dropdown trigger="custom" :visible="columnsOptionsVisible" placement="bottom-end">
            <a href="javascript:void(0)" class="block py12" @click="toggleColumnsOption">
              <span class='link color-blue-base adm-btn-small txt-underline-on-hover'>Настроить показ колонок</span>
              <Icon style="margin-left: 10px;" type="md-settings" size="18"></Icon>
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem v-for="column in tableColumnsForOptions">
                <Checkbox v-model="column.visible">{{ column.title }}</Checkbox>
              </DropdownItem>
              <Button type="primary" @click="toggleColumnsOption" style="margin: 8px  16px;">Закрыть</Button>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Table class="custom-table" ref="selection" :columns="tableFilteredColumns" :data="cases" size="large" :stripe="false" :height="tableHeight"></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import InputMask from "../InputMask";
  import {mapGetters} from 'vuex';

  export default {
    name: "DeloReestr",
    components: {
      InputMask
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        let cid = funcUtils.getfromLocalStorage(this.$store.state.deloReestr.moduleName);
        let eventResponse;

        this.fillStateDeloDict();
        this.fillDocumentVidDict();
        this.fillArticleProcDict();

        if (funcUtils.isNull(cid)) {
          funcUtils.addToLocalStorage(this.$store.state.deloReestr.moduleName, current.cid);
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
        await this.$store.dispatch('fillModule', {'event': eventResponse});
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
        columnsOptionsVisible: false,
        hideMore: false,
        stateDeloDict: [],
        documentVidDict: [],
        articleProcDict: [],
        filter: {
          flagYear: {
            name: 'Искать только в текущем году',
            value: null
          },
          deloN: {
            name: 'Номер дела',
            value: null
          },
          deloDat: {
            name: 'Дата дела',
            value: null
          },
          docVid: {
            name: 'Тип документа',
            value: null
          },
          stadDeloKod: {
            name: 'Стадия дела',
            value: null
          },
          stotvId: {
            name: 'Ст.ответственности',
            value: null
          },
          checkPriority: {
            name: 'Приоритет ошибки',
            value: null
          },
          docN: {
            name: '№ документа',
            value: null
          },
          ulName: {
            name: 'Наименование ЮЛ',
            value: null
          },
          firstName: {
            name: 'Фамилия',
            value: null
          },
          secondName: {
            name: 'Имя',
            value: null
          },
          thirdName: {
            name: 'Отчество',
            value: null
          },
          birthday: {
            name: 'Дата рождения',
            value: null
          },
          regno: {
            name: 'Рег.знак',
            value: null
          },
          upi: {
            name: 'УПИ (ШПИ)',
            value: null
          }
        },
        inputProps: {
          class: 'adm-input adm-input--big'
        },
        maskProps: {
          alias: "datetime",
          inputFormat: 'dd/mm/yyyy'
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
        if (this.dataStore) {
          res = this.dataStore.data.data;
        }
        return res;
      },
      tableFilteredColumns() {
        return this.columnsOptions.filter(column => {
          return column.visible === true;
        })
      },
      tableColumnsForOptions() {
        return this.columnsOptions.filter(column => {
          return column.key;
        })
      },
    },
    watch: {
      dataStore() {
        this.fillColumnsOptions();
      }
    },
    methods: {
      fillColumnsOptions() {
        if (this.dataStore) {
          this.columnsOptions = [];
          this.dataStore.data.fields.forEach((item) => {
            switch (item) {
              case 'deloId': {
                this.columnsOptions.push({
                  title: 'Номер дела',
                  key: 'deloId',
                  minWidth: 160,
                  ellipsis: true,
                  visible: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'birthday': {
                this.columnsOptions.push({
                  title: 'Дата рождения',
                  key: 'birthday',
                  minWidth: 160,
                  ellipsis: true,
                  visible: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'checkPriority': {
                this.columnsOptions.push({
                  title: 'Приоритет ошибки',
                  key: 'checkPriority',
                  minWidth: 190,
                  ellipsis: true,
                  visible: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'DateStadIspolnLast': {
                this.columnsOptions.push({
                  title: 'Дата посл.ст.исп.',
                  key: 'dateStadIspolnLast',
                  minWidth: 200,
                  ellipsis: true,
                  visible: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  },
                  render: (h, params) => {
                    let parsedDate = funcUtils.isNotEmpty(params.row.dateStadIspolnLast) ? funcUtils.parseDateTime(params.row.dateStadIspolnLast, 'DD/MM/YYYY') : '';
                    return h('div', {}, [
                      h('p', parsedDate)
                    ])
                  }
                });
                break;
              }
              case 'decisDateFirst': {
                this.columnsOptions.push({
                  title: 'Дата решения',
                  key: 'decisDateFirst',
                  minWidth: 180,
                  ellipsis: true,
                  visible: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  },
                  render: (h, params) => {
                    let parsedDate = funcUtils.isNotEmpty(params.row.decisDateFirst) ? funcUtils.parseDateTime(params.row.decisDateFirst, 'DD/MM/YYYY') : '';
                    return h('div', {}, [
                      h('p', parsedDate)
                    ])
                  }
                });
                break;
              }
              case 'decisDateLast': {
                this.columnsOptions.push({
                  title: 'Дата посл.реш.',
                  key: 'decisDateLast',
                  minWidth: 180,
                  ellipsis: true,
                  visible: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  },
                  render: (h, params) => {
                    let parsedDate = funcUtils.isNotEmpty(params.row.decisDateLast) ? funcUtils.parseDateTime(params.row.decisDateLast, 'DD/MM/YYYY') : '';
                    return h('div', {}, [
                      h('p', parsedDate)
                    ])
                  }
                });
                break;
              }
              case 'decisNameFirst': {
                this.columnsOptions.push({
                  title: 'Перв.реш.',
                  key: 'decisNameFirst',
                  minWidth: 180,
                  ellipsis: true,
                  visible: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'decisNameLast': {
                this.columnsOptions.push({
                  title: 'Посл.реш.',
                  key: 'decisNameLast',
                  minWidth: 180,
                  ellipsis: true,
                  visible: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
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
                  minWidth: 180,
                  ellipsis: true,
                  visible: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  },
                  render: (h, params) => {
                    let parsedDate = funcUtils.isNotEmpty(params.row.deloDate) ? funcUtils.parseDateTime(params.row.deloDate, 'DD/MM/YYYY') : '';
                    return h('div', {}, [
                      h('p', parsedDate)
                    ])
                  }
                });
                break;
              }
              case 'deloN': {
                this.columnsOptions.push({
                  title: 'Номер дела',
                  key: 'deloN',
                  minWidth: 180,
                  ellipsis: true,
                  visible: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'deloVidName': {
                this.columnsOptions.push({
                  title: 'Вид дела',
                  key: 'deloVidName',
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
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
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
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
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
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
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'opredN': {
                this.columnsOptions.push({
                  title: 'Определение/Доп.прот.',
                  key: 'opredN',
                  minWidth: 220,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'postN': {
                this.columnsOptions.push({
                  title: 'Постан./ПК',
                  key: 'postN',
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'protN': {
                this.columnsOptions.push({
                  title: 'Протокол АПН',
                  key: 'protN',
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'regno': {
                this.columnsOptions.push({
                  title: 'РегЗнак',
                  key: 'regno',
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'stadDeloName': {
                this.columnsOptions.push({
                  title: 'Стадия',
                  key: 'stadDeloName',
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'stadIspolnNameLast': {
                this.columnsOptions.push({
                  title: 'Посл.ст.исп.',
                  key: 'stadIspolnNameLast',
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'stotv': {
                this.columnsOptions.push({
                  title: 'Статья',
                  key: 'stotv',
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'stotvKod': {
                this.columnsOptions.push({
                  title: 'Ст.-основание',
                  key: 'stotvKod',
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'uchastName': {
                this.columnsOptions.push({
                  title: 'Участник',
                  key: 'uchastName',
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
                        },
                      }, params.column.title)
                    ])
                  }
                });
                break;
              }
              case 'ulName': {
                this.columnsOptions.push({
                  title: 'Участник',
                  key: 'ulName',
                  minWidth: 180,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('div', [
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-big': true,
                          'adm-font-light': true,
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
            this.columnsOptions.push({
              title: "Действия",
              width: 130,
              align: "center",
              visible: true,
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
                        'color-gray-medium': true,
                        'adm-text-big': true,
                        'adm-font-light': true,
                      },
                    }, params.column.title),
                  ])
                ])
              },
              render: (h, params) => {
                return h("Icon", {
                  props: {
                    type: "ios-open-outline",
                    size: 18,
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
                      this.getDelo(params.row.deloId);
                    }
                  }
                });
              },
            });
          }
        }
      },
      toggleColumnsOption() {
        this.columnsOptionsVisible = !this.columnsOptionsVisible;
      },
      changeTableHeight() {
        let tableBounds = this.$refs.selection.$el.getBoundingClientRect();
        this.tableHeight = window.innerHeight - tableBounds.y;
      },
      getFilterFields() {
        let filterObj = {};
        let filter = this.filter;
        for (let prop in filter) {
          if (filter.hasOwnProperty(prop)) {
            let propObj = filter[prop];
            if (funcUtils.isNotEmpty(propObj.value) && (propObj.value === "null" || propObj.value.length === 0)) {
              propObj.value = null;
            }
            filterObj[prop] = propObj.value;
          }
        }

        return filterObj;
      },
      changeBirthday() {
        let v = this.filter.birthday.value;

        if (funcUtils.isNotEmpty(v)) {
          let express1 = /^\d{1,2}$/;
          let express2 = /^(\d{2})\/(\d{1,2})$/;
          let express3 = /^(\d{2})\/(\d{2})\/(\d{1,4})$/;
          let regs1 = v.match(express1);
          let regs2 = v.match(express2);
          let regs3 = v.match(express3);

          if (v.length === 2 && regs1 && regs1[0] >= 1 && regs1[0] <= 31) {
            this.filter.birthday.value = v + '/';
          } else if (v.length === 2 && !regs1) {
            if (express1.test(v[0]) && v[0] > 0 && v[0] < 12) {
              this.filter.birthday.value = '0' + v[0] + '/';
            } else {
              this.$refs.filterBirthday.currentValue = v[0].trim();
              this.filter.birthday.value = v[0].trim();
            }
          } else if (v.length === 2 && !regs1 || (regs1 && (regs1[0] < 0 || regs1[0] > 31))) {
            this.$refs.filterBirthday.currentValue = null;
            this.filter.birthday.value = null;
          } else if (v.length === 3 && v[2] !== '/') {
            this.$refs.filterBirthday.currentValue = this.filter.birthday.value.substr(0, 2) + '/';
            this.filter.birthday.value = this.filter.birthday.value.substr(0, 2) + '/';
          } else if (v.length <= 2 && !regs1) {
            this.$refs.filterBirthday.currentValue = null;
            this.filter.birthday.value = null;
          }

          else if (v.length === 5 && regs2 && regs2[2] >= 1 && regs2[2] <= 12) {
            this.filter.birthday.value = v + '/';
          } else if (v.length === 5 && !regs2) {
            if (express1.test(v[3]) && v[3] > 0 && v[3] < 12) {
              this.filter.birthday.value = this.filter.birthday.value.substr(0, 3) + '0' + v[3] + '/';
            } else {
              this.$refs.filterBirthday.currentValue = this.filter.birthday.value.substr(0, 3) + v[3].trim();
              this.filter.birthday.value = this.filter.birthday.value.substr(0, 3) + v[3].trim();
            }
          } else if (v.length === 5 && !regs2 || (regs2 && (regs2[2] < 0 || regs2[2] > 12))) {
            this.$refs.filterBirthday.currentValue = this.filter.birthday.value.substr(0, 2) + '/';
            this.filter.birthday.value = this.filter.birthday.value.substr(0, 2) + '/';
          } else if (v.length === 6 && v[5] !== '/') {
            this.$refs.filterBirthday.currentValue = this.filter.birthday.value.substr(0, 5) + '/';
            this.filter.birthday.value = this.filter.birthday.value.substr(0, 5) + '/';
          } else if (v.length === 4 && !regs2) {
            this.$refs.filterBirthday.currentValue = this.filter.birthday.value.substr(0, 2) + '/';
            this.filter.birthday.value = this.filter.birthday.value.substr(0, 2) + '/';
          }

          else if (!regs3) {
            this.$refs.filterBirthday.currentValue = this.filter.birthday.value.substr(0, 6);
            this.filter.birthday.value = this.filter.birthday.value.substr(0, 6);
          } else if (v.length === 10 && regs3 && (regs3[3] < 1902 || regs3[3] > new Date().getFullYear())) {
            this.$refs.filterBirthday.currentValue = this.filter.birthday.value.substr(0, 6);
            this.filter.birthday.value = this.filter.birthday.value.substr(0, 6);
          }
        }
      },
      parseFilter(filter) {
        if (funcUtils.isNotEmpty(filter)) {
          for (let prop in filter) {
            if (filter.hasOwnProperty(prop)) {
              let item = filter[prop];
              if (this.filter[prop] && funcUtils.isNotEmpty(item)) {
                switch (prop) {
                  case 'flagYear': {
                    this.filter[prop].value = item + '';
                    break;
                  }
                  case 'deloN': {
                    this.filter[prop].value = item;
                    break;
                  }
                  case 'deloDat': {
                    this.filter[prop].value = new Date(item);
                    break;
                  }
                  case 'docVid': {
                    this.filter[prop].value = item + '';
                    break;
                  }
                  case 'stadDeloKod': {
                    this.filter[prop].value = item + '';
                    break;
                  }
                  case 'stotvId': {
                    this.filter[prop].value = item + '';
                    break;
                  }
                  case 'checkPriority': {
                    this.filter[prop].value = item;
                    break;
                  }
                  case 'docN': {
                    this.filter[prop].value = item;
                    break;
                  }
                  case 'ulName': {
                    this.filter[prop].value = item;
                    break;
                  }
                  case 'firstName': {
                    this.filter[prop].value = item;
                    break;
                  }
                  case 'secondName': {
                    this.filter[prop].value = item;
                    break;
                  }
                  case 'birthday': {
                    this.filter[prop].value = item;
                    break;
                  }
                  case 'regno': {
                    this.filter[prop].value = item;
                    break;
                  }
                  case 'upi': {
                    this.filter[prop].value = item;
                    break;
                  }
                }
              }
            }
          }
        }
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
            value: item.values['STOTV_KOD'],
            id: item.values['STOTV_ID'] + ''
          })
        });
        this.articleProcDict = articleProcDict;
      },
      async filterClick() {
        let filter = this.getFilterFields();
        let eventResponse = await RequestApi.prepareData({
          method: 'getData',
          params: {
            find: filter,
            kind: null
          }
        });
        await this.$store.dispatch('fillModule', {'event': eventResponse});
      },
      getDelo(deloId) {
        try {
          let params = {
            deloId: deloId
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
      getOffense() {
        try {
          formStack.toNext({
            module: this.$store.state.offense,
            vm: this,
            notRemoved: false,
            params: false,
            withCreate: true
          });
        } catch (e) {
          alert(e.message);
        }
      },
      createWizardScenarioPost() {
        try {
          let params = {
            scenarioName: 'CreatePost'
          };

          formStack.toNext({
            module: this.$store.state.wizardExecuter,
            vm: this,
            notRemoved: true,
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
