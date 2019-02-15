<template>
  <div v-if="dataStore">
    <div>
      <div class="prose my24">
        <h4 class="my0 px0 inline align-middle">Верстка:</h4>
        <button class="txt-kbd" type="button" @click="admAccounting">админ учет</button>
        <button class="txt-kbd" type="button" @click="admDelo">дело</button>
        <button class="txt-kbd" type="button" @click="admOffense">возбуждение адм. правонарушения</button>
      </div>
      <div>
        <button type="button" @click="filterClick">Фильтровать</button>
        <button type="button" @click="createWizardScenarioPost">Создать постановление</button>
        <button type="button" @click="createWizardScenario2025">Создать 2025</button>
      </div>
    </div>
    <div class="bg-gray-faint py24 px12">
      <div class="wmax1920 mx-auto"><!-- wmax1920 -->
        <Form inline label-position="top">
          <Row type="flex" justify="start" :gutter="8">
            <Col :xs="24" :md="20" :lg="22">
              <!-- в каждом Row не должно быть больше 4 Col -->
              <Row type="flex" justify="start" :gutter="8">
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Номер дела</div>
                    <Input v-model="filter.deloN.value" placeholder="Номер дела"></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <Row type="flex" :gutter="6">
                    <Col :xs="12" :md="18" :lg="12">
                      <FormItem class="w-full">
                        <div slot="label" class="adm-text-small color-gray-medium">Дата заведения дела</div>
                        <DatePicker class="w-full" type="date" format="dd-MM-yyyy" v-model="filter.deloDat.value" placeholder="Дата заведения дела"></DatePicker>
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
                    <Input v-model="filter.regno.value" placeholder="ГРЗ автомобил"></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Документ прикрепленный к делу</div>
                    <Row type="flex" :gutter="6">
                      <Col :xs="12" :md="12" :lg="12">
                        <Select placeholder="Выбрать" v-model="filter.docVid.value" filterable clearable>
                          <option value="null"> </option>
                          <Option class="wmax360 txt-break-word" v-for="item in documentVidDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </Col>
                      <Col :xs="12" :md="12" :lg="12">
                        <Input v-model="filter.docN.value" placeholder="Номер документа"></Input>
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
                        <Input v-model="filter.firstName.value" placeholder="Фамилия"></Input>
                      </Col>
                      <Col :xs="8" :md="8" :lg="8">
                        <Input v-model="filter.secondName.value" placeholder="Имя"></Input>
                      </Col>
                      <Col :xs="8" :md="8" :lg="8">
                        <Input v-model="filter.thirdName.value" placeholder="Отчество"></Input>
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Стадия дела</div>
                    <Row type="flex" :gutter="6">
                      <Col :xs="24" :md="12" :lg="12">
                        <Select placeholder="Выбрать" v-model="filter.stadDeloKod.value" filterable clearable>
                          <option value="null"> </option>
                          <Option class="wmax360 txt-break-word" v-for="item in stateDeloDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </Col>
                      <Col :xs="24" :md="12" :lg="12">
                        <Select placeholder="По статье" v-model="filter.stotvId.value" filterable clearable>
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
                    <Input v-model="filter.ulName.value" placeholder="Название организации"></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Номер УПИ</div>
                    <Input v-model="filter.upi.value" placeholder="Номер УПИ"></Input>
                  </FormItem>
                </Col>
              </Row>

              <Row type="flex" justify="start" :gutter="8" v-show="hideMore">
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Приоритет ошибки</div>
                    <Input v-model="filter.checkPriority.value" placeholder="Приоритет ошибки"></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :md="12" :lg="6">
                  <FormItem class="w-full">
                    <div slot="label" class="adm-text-small color-gray-medium">Дата рождения</div>
                    <Input v-model="filter.birthday.value" placeholder="Дата рождения"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col :xs="24" :md="4" :lg="2">
              <div class="h-full flex-parent flex-parent--center-cross flex-parent--center-main">
                <a href='#Links' @click="hideMore = !hideMore" class='link color-blue-base adm-btn-small txt-underline-on-hover'>
                  <span v-if="hideMore">Меньше параметров</span>
                  <span v-else>Больше параметров</span>
                </a>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <div class="bg-white">
      <div class="wmax1920 mx-auto">
        <Table class="custom-table" ref="selection" :columns="tableColumns" :data="cases" size="large" :stripe="false" :border="false" :height="tableHeight"></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import {mapGetters} from 'vuex';

  export default {
    name: "DeloReestr",
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
        hideMore: true,
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
        columnsOption: []
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
      tableColumns() {
        let res = [];
        if (this.dataStore) {
          this.dataStore.data.fields.forEach((item) => {
            switch (item) {
              case 'deloId': {
                res.push({
                  title: 'Номер дела',
                  key: 'deloId',
                  minWidth: 160,
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'birthday': {
                res.push({
                  title: 'Дата рождения',
                  key: 'birthday',
                  minWidth: 160,
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
              case 'checkPriority': {
                res.push({
                  title: 'Приоритет ошибки',
                  key: 'checkPriority',
                  minWidth: 190,
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'DateStadIspolnLast': {
                res.push({
                  title: 'Дата посл.ст.исп.',
                  key: 'dateStadIspolnLast',
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
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
                res.push({
                  title: 'Дата решения',
                  key: 'decisDateFirst',
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
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
                res.push({
                  title: 'Дата посл.реш.',
                  key: 'decisDateLast',
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
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
                res.push({
                  title: 'Перв.реш.',
                  key: 'decisNameFirst',
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'decisNameLast': {
                res.push({
                  title: 'Посл.реш.',
                  key: 'decisNameLast',
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'deloDate': {
                res.push({
                  title: 'Дата оформления',
                  key: 'deloDate',
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
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
                res.push({
                  title: 'Номер дела',
                  key: 'deloN',
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'deloVidName': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'docN': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'lockName': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'lvokName': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'opredN': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'postN': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'protN': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'regno': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'stadDeloName': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'stadIspolnNameLast': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'stotv': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'stotvKod': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'uchastName': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
              case 'ulName': {
                res.push({
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
                      }, params.column.title),
                      h('p', {
                        class: {
                          'color-gray-medium': true,
                          'adm-text-small': true
                        },
                      }, 'Дата оформления'),
                    ])
                  }
                });
                break;
              }
            }
          });
          if (res.length > 0) {
            res.push({
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
        return res;
      },
    },

    methods: {
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
      admAccounting() {
        try {
          formStack.toNext({
            module: this.$store.state.accounting,
            vm: this,
            notRemoved: true,
            withCreate: false
          });
        } catch (e) {
          alert(e.message);
        }
      },
      admOffense() {
        try {
          formStack.toNext({
            module: this.$store.state.offense,
            vm: this,
            notRemoved: true,
            withCreate: false
          });
        } catch (e) {
          alert(e.message);
        }
      },
      admDelo() {
        try {
          formStack.toNext({
            module: this.$store.state.delo,
            vm: this,
            notRemoved: true,
            withCreate: false
          });
        } catch (e) {
          alert(e.message);
        }
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
      createWizardScenario2025() {
        try {
          let params = {
            scenarioName: 'CreateProt2025'
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
