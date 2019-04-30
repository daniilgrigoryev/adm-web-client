<template>
  <aside-template :listSectionNav="listSectionNav" title="Определение" v-if="docsOpred">
    <div class="layout-wrap">
      <div class="layout">
        <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>
        <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">Определение</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-form__label">Определение №</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col span="10">
                      <masked-input inputClass="adm-input adm-input--regular wmin120" :maskProps="maskInputProt" v-model="docsOpred.docN" @onInputChange="store"></masked-input>
                    </Col>
                    <Col span="6">
                      <Button type="text" style="outline: 0!important; box-shadow: none; padding: 0 5px;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                        <Icon type="md-key" title="Получить уникальный номер" :size="30" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Дата и время составления</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsOpred.dateSost" @change="store" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Место составления</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" disabled v-model="docsOpred.placeSost.placeFull"></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="getPlaceSost" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                        <Icon type="ios-bookmarks-outline" class=" " title="адресный справочник" :size="30" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Должностное лицо</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="4" :md="4" :lg="4">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="docsOpred.inspSostKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeInspSostKod" ></masked-input>
                    </Col>
                    <Col :xs="18" :md="18" :lg="18">
                      <Input class="adm-input adm-input--regular" disabled v-model="docsOpred.inspSostName" @on-input-change="changeFIO" ></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="showDolzModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                        <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="30" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Подразделение</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="4" :md="4" :lg="4">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="docsOpred.organSostKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeOrganSostKod" ></masked-input>
                    </Col>
                    <Col :xs="18" :md="18" :lg="18">
                      <Input class="adm-input adm-input--regular" disabled v-model="docsOpred.organSostName" ></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                        <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="30" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 id="nar" class="adm-form__headding">Сведения о нарушении</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-form__label">Дата и время нарушения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsOpred.dateNar" @change="store" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Место нарушения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" disabled v-model="docsOpred.placeNar.placeFull"></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="getPlaceNar" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                        <Icon type="ios-bookmarks-outline" class=" " title="адресный справочник" :size="30" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Пункт НПА</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="docsOpred.pnpaId" clearable filterable @on-change="store">
                        <Option class=" " v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Статья КРФоАП</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="docsOpred.stotvId" clearable filterable @on-change="store, fillFactSved">
                        <Option class=" " v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Фактические сведения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <AutoComplete
                        v-model="docsOpred.factSved"
                        :data="factSvedList"
                        class="wmin180 adm-input adm-input--regular"
                        :filter-method="filterfactSvedList"
                        @on-blur="store"
                        @on-select="store"
                        placeholder=""
                        clearable>
                      </AutoComplete>
                    </Col>
                  </Row>
                </div>
              </div>
              <div v-if="isTaxi">
                <div class="adm-form__item">
                  <small class="adm-form__label">Справочник типов источников</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col>
                      <Select class="wmax240 wmin180 adm-input adm-input--regular" placeholder="" v-model="docsOpred.vsTypeId" clearable @on-change="store">
                        <Option class="wmax360 " v-for="item in violSourceTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
                <div v-if="docsOpred.vsTypeId === 1" class="adm-form__item">
                  <small class="adm-form__label">Фамилия</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col>
                      <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="docsOpred.vsFlFirstName"
                                    :maskProps="{casing: 'upper', regex: '[a-zA-Zа-яА-Я]+', placeholder: ''}"
                                    @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
                <div v-if="docsOpred.vsTypeId === 1" class="adm-form__item">
                  <small class="adm-form__label">Имя</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col>
                      <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="docsOpred.vsFlSecondName"
                                    :maskProps="{casing: 'upper', regex: '[a-zA-Zа-яА-Я]+', placeholder: ''}"
                                    @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
                <div v-if="docsOpred.vsTypeId === 1" class="adm-form__item">
                  <small class="adm-form__label">Отчество</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col>
                      <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="docsOpred.vsFlThirdName"
                                    :maskProps="{casing: 'upper', regex: '[a-zA-Zа-яА-Я]+', placeholder: ''}"
                                    @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
                <div v-if="docsOpred.vsTypeId === 1" class="adm-form__item">
                  <small class="adm-form__label">Пол</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Select class="adm-input adm-input--regular wmin180 wmax240" placeholder="" v-model="docsOpred.vsFlSex" clearable filterable @on-change="store">
                          <Option class="" v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div v-if="docsOpred.vsTypeId !== 1" class="adm-form__item">
                  <small class="adm-form__label">Наименование источника данных о нарушении</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="docsOpred.vsName" ></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Вхоящий номер документа, полученного от источника данных о нарушении</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="docsOpred.vsIncomingNumber" ></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Входящая дата документа, полученного от источника данных о нарушении</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsOpred.vsIncomingDate" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div v-if="docsOpred.vsTypeId !== 1" class="adm-form__item">
                  <small class="adm-form__label">Номер разрешения такси</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="docsOpred.tlNumber" ></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата начала срока действия разрешения такси</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsOpred.tlDateBeg" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата окончания срока действия разрешения такси</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsOpred.tlDateEnd" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Организация, выдавшая разрешение такси</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="docsOpred.tlLicensor" ></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bot-wrap">
      <Button @click="getPrev" type="text">Отменить изменения</Button>
      <Button @click="save" type="primary" class="ml12">Сохранить</Button>
    </div>
  </aside-template>

</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import * as constants from "~/assets/js/utils/constants";

  export default {
    name: "FrmEdProtPZTCEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardModal: () => import('~/components/wizard/items/WizardModal'),
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask'),
      MaskedInput: () => import('~/components/shared/MaskedInput')
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdProtPZTCEditSetCid', current.cid);
        let prepareParams = {
          method: 'restore'
        };
        if (funcUtils.isNotEmpty(this.$route.params.node)) {
          prepareParams.method = 'getData';
          prepareParams.params = {
            'node': this.$route.params.node
          };
        }
        let eventResponse = await RequestApi.prepareData(prepareParams);
        let docsOpred = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(docsOpred)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillPnpaList();
          await this.fillViolSourceTypeList();

          await this.getDeloTag();
          this.docsOpred = docsOpred;

          if (funcUtils.isNotEmpty(docsOpred.dateNar)) {
            await this.fillStotvSearchInfo();
            await this.fillFactSved();
          }
        }
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdProtPZTCEditSetCid', null);
      this.$store.dispatch('frmEdProtPZTCEditSetData', null);
    },
    data() {
      return {
        deloTags: null,
        docsOpred: null,
        pnpaList: null,
        stotvSearchInfoList: null,
        factSvedList: [],
        listSectionNav: [
          {
            title: "Определение по делу",
            name: "head",
          },
          {
            title: "Сведения о нарушении",
            name: "nar",
          }
        ],
        maskInputProt: {
          regex: '[а-яА-Я0-9]+',
          casing: 'upper',
          placeholder: ''
        },
        dolzModal: {
          visible: false,
          sispList: null,
          srcList: null,
          columnsOptions:
            [
              {
                title: 'Нагрудный знак',
                key: 'inspKod',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'ФИО',
                key: 'inspName',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Должность',
                key: 'inspDolz',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Звание',
                key: 'inspRang',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Код подразделения',
                key: 'organKod',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Подразделение',
                key: 'ogaiName',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Отдел',
                key: 'otdName',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Телефон',
                key: 'phone',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Дата начала действия',
                key: 'dateBeg',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Дата окончания действия',
                key: 'dateEnd',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              }
            ]
        },
        organModal: {
          visible: false,
          gibddList: null,
          srcList: null,
          columnsOptions:
            [
              {
                title: 'Код органа',
                key: 'ORGAN_KOD',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Код региона',
                key: 'RESP_KOD',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Регион',
                key: 'REGION_NAME',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Район',
                key: 'RAYON_NAME',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Тип',
                key: 'TIP',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Название',
                key: 'ORGAN_NAME',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Контакты',
                key: 'CONTACTS',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Адрес',
                key: 'KA_ADR_FULL',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              }
            ]
        },
        violSourceTypeList: null,
        sexList: [
          {
            label: 'Мужской',
            value: 'М'
          },
          {
            label: 'Женский',
            value: 'Ж'
          },
        ],
      }
    },
    computed: {
      isTaxi() {
        let res = null;
        if (this.deloTags) {
          res = funcUtils.isNotEmpty(this.deloTags) &&  this.deloTags.includes(constants.TAG_TAXI);
        }
        return res;
      },
    },
    methods: {
      async showDolzModal(visible) {
        if (funcUtils.isEmpty(this.dolzModal.srcList)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: null
            }
          });
          this.dolzModal.srcList = JSON.parse(eventResponse.response).data;
        }
        if (visible) {
          this.dolzModal.sispList = this.dolzModal.srcList;
        } else {
          this.dolzModal.sispList = null;
        }
        this.dolzModal.visible = visible;
      },
      async showOrganModal(visible) {
        if (visible && funcUtils.isEmpty(this.organModal.srcList)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: null
            }
          });
          this.organModal.srcList = JSON.parse(eventResponse.response).data;
        }
        if (visible) {
          this.organModal.gibddList = this.organModal.srcList;
        } else {
          this.organModal.gibddList = null;
        }
        this.organModal.visible = visible;
      },

      async fillPnpaList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getPnpaDict'
        });
        let pnpaList = [];
        let pnpaDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < pnpaDict.length; i++) {
          let pnpa = pnpaDict[i];
          pnpaList.push({
            label: pnpa.PNPA_NAME,
            value: pnpa.PNPA_KOD,
            id: pnpa.PNPA_ID
          });
        }
        this.pnpaList = pnpaList;
      },
      async fillStotvSearchInfo() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getStotvSearchInfo',
          params: {
            date: this.docsOpred.dateNar
          }
        });
        let stotvSearchInfoList = [];
        let stotvSearchInfoDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < stotvSearchInfoDict.length; i++) {
          let stotvSearchInfo = stotvSearchInfoDict[i];
          stotvSearchInfoList.push({
            label: stotvSearchInfo.stotvName,
            value: stotvSearchInfo.stotvKod,
            id: stotvSearchInfo.stotvId
          });
        }
        this.stotvSearchInfoList = stotvSearchInfoList;
      },
      async fillViolSourceTypeList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getViolSourceTypeDict'
        });
        let violSourceTypeList = [];
        let violSourceTypeDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < violSourceTypeDict.length; i++) {
          let violSourceType = violSourceTypeDict[i];
          violSourceTypeList.push({
            label: violSourceType.NAME,
            value: violSourceType.ID
          });
        }
        this.violSourceTypeList = violSourceTypeList;
      },

      async changeInspSostKod() {
        if (funcUtils.isNotEmpty(this.docsOpred.inspSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: this.docsOpred.inspSostKod
            }
          });
          this.clearInspSost();
          let data = JSON.parse(eventResponse.response).data;
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data.getFirst();
            this.docsOpred.inspSostId = data.inspId;
            this.docsOpred.inspSostKod = data.inspKod;
            this.docsOpred.inspSostName = data.inspName;
            this.docsOpred.inspSostDolz = data.inspDolz;
            this.docsOpred.inspSostRang = data.inspRang;
            this.docsOpred.organSostId = data.ogaiId;
            this.docsOpred.organSostKod = data.organKod;
            this.docsOpred.organSostName = data.ogaiName;
            this.store();
          }
        } else {
          this.clearInspSost();
        }
      },
      async changeOrganSostKod() {
        if (funcUtils.isNotEmpty(this.docsOpred.organSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: this.docsOpred.organSostKod
            }
          });
          this.clearOrganSost();
          let gibddList = JSON.parse(eventResponse.response).data;
          if (gibddList.length > 0) {
            this.organModal.visible = true;
            this.organModal.gibddList = gibddList;
          }
        } else {
          this.clearOrganSost();
        }
      },
      async fillFactSved() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getFactSved'
        });
        let responseData = JSON.parse(eventResponse.response).data;
        if (responseData.length) {
          this.factSvedList = JSON.parse(responseData);
        }
      },
      filterfactSvedList(value, option) {
        if (funcUtils.isEmpty(value) || funcUtils.isEmpty(option)) {
          return false;
        }
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      changeFIO() {
        let fioLength = 0;
        let fioArr = this.docsOpred.inspSostName.split(' ');
        this.docsOpred.inspSostName = '';
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0:
              {
                this.docsOpred.inspSostName += item;
                break;
              }
              case 1:
              {
                this.docsOpred.inspSostName += ' ' + item;
                break;
              }
              case 2:
              {
                this.docsOpred.inspSostName += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.clearInspSostKod();
      },

      onSispClick(data) {
        this.docsOpred.inspSostId = data.inspId;
        this.docsOpred.inspSostKod = data.inspKod;
        this.docsOpred.inspSostName = data.inspName;
        this.docsOpred.inspSostDolz = data.inspDolz;
        this.docsOpred.inspSostRang = data.inspRang;
        this.docsOpred.organSostId = data.ogaiId;
        this.docsOpred.organSostKod = data.organKod;
        this.docsOpred.organSostName = data.ogaiName;
        this.dolzModal.visible = false;
        this.dolzModal.sispList = null;
        this.store();
      },
      onGibddClick(data) {
        this.docsOpred.organSostId = data.ID;
        this.docsOpred.organSostKod = data.ORGAN_KOD;
        this.docsOpred.organSostName = data.ORGAN_NAME;
        this.organModal.gibddList = null;
        this.organModal.visible = false;
        this.store();
      },

      clearInspSostKod() {
        this.docsOpred.inspSostId = null;
        this.docsOpred.inspSostKod = null;
        this.store();
      },
      clearInspSost() {
        this.docsOpred.inspSostId = null;
        this.docsOpred.inspSostKod = null;
        this.docsOpred.inspSostName = null;
        this.docsOpred.inspSostDolz = null;
        this.docsOpred.inspSostRang = null;
        this.store();
      },
      clearOrganSost() {
        this.docsOpred.organSostId = null;
        this.docsOpred.organSostKod = null;
        this.docsOpred.organSostName = null;
        this.store();
      },
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.docsOpred
          }
        });
      },
      async save() {
        let eventResponse = await RequestApi.prepareData({
          method: 'update'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          alert(error.errorMsg);
        } else {
          this.getPrev();
        }
      },
      async getPlaceSost() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getPlaceSostCID'
        });
        let cid = JSON.parse(eventResponse.response).data;

        formStack.toNext({
          module: this.$store.state.placeViewEdit,
          vm: this,
          notRemoved: false,
          withCreate: false,
          cid: cid,
          params: {
            type: 'placeSost'
          }
        });
      },
      async getPlaceNar() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getPlaceNarCID'
        });
        let cid = JSON.parse(eventResponse.response).data;

        formStack.toNext({
          module: this.$store.state.placeViewEdit,
          vm: this,
          notRemoved: false,
          withCreate: false,
          cid: cid,
          params: {
            type: 'placeNar'
          }
        });
      },
      async getDeloTag() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getDeloTag'
        });
        let deloTags = JSON.parse(eventResponse.response).data;
        this.deloTags = deloTags;
      },
      getPrev() {
        try {
          formStack.toPrev({
            vm: this
          });
        } catch (e) {
          alert(e.message);
        }
      },
    },
  }
</script>

