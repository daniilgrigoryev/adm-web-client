<template>
  <aside-template :listSectionNav="listSectionNav" title="Протокол о задержании ТС" v-if="protPZTC">
    <div class="layout-wrap">
      <div class="layout">
        <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>
        <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">Протокол по делу</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-form__label">Протокол №</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col span="10">
                      <masked-input inputClass="adm-input adm-input--regular wmin120" :maskProps="maskInputProt" v-model="protPZTC.docN" @onInputChange="store"></masked-input>
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
                <small class="adm-form__label">Место составления</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" disabled v-model="protPZTC.placeSost.placeFull"></Input>
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
                      <masked-input inputClass="adm-input adm-input--regular" v-model="protPZTC.inspSostKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeInspSostKod" ></masked-input>
                    </Col>
                    <Col :xs="18" :md="18" :lg="18">
                      <Input class="adm-input adm-input--regular" disabled v-model="protPZTC.inspSostName" @on-input-change="changeFIO" ></Input>
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
                      <masked-input inputClass="adm-input adm-input--regular" v-model="protPZTC.organSostKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeOrganSostKod" ></masked-input>
                    </Col>
                    <Col :xs="18" :md="18" :lg="18">
                      <Input class="adm-input adm-input--regular" disabled v-model="protPZTC.organSostName" ></Input>
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
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="protPZTC.dateNar" @change="changeDateNar" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Место нарушения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" disabled v-model="protPZTC.placeNar.placeFull"></Input>
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
                      <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="protPZTC.pnpaId" clearable filterable @on-change="store">
                        <Option class=" txt-break-word" v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
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
                      <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="protPZTC.stotvId" clearable filterable :disabled="!protPZTC.dateNar" @on-change="store">
                        <Option class=" txt-break-word" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
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
                      <Input class="adm-input adm-input--regular" v-model="protPZTC.factSved" @on-input-change="store"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="evac">Сведения об эвакуации</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-form__label">Организация эвакуатора</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="protPZTC.evacOrgName" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Представитель</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="protPZTC.evacAgentName" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">ГРЗ эвакуатора</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <masked-input inputClass="adm-input adm-input--regular wmax240"  v-model="protPZTC.evacRegno"  @onInputChange="store" placeholder="ГРЗ" :maskProps="{regex: '[a-zA-Zа-яА-Я0-9]+', casing: 'upper', placeholder: ''}"  clearable></masked-input> 
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Штрафстоянка</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="protPZTC.impoundLotName" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">№ акта эвакуации</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <!-- <Input class="adm-input adm-input--regular wmax240" @on-input-change="store" v-model="protPZTC.evacActNumber" ></Input> -->
                      <masked-input inputClass="adm-input adm-input--regular wmax240" v-model="protPZTC.evacActNumber" @onInputChange="store" :maskProps="{regex: '[0-9]+', casing: 'upper', placeholder: ''}"  clearable></masked-input> 
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Дата составления акта</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180 ivu-date-picker" v-model="protPZTC.evacActTime" @change="store" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                    </Col>
                  </Row>
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
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import WizardModal from "~/components/wizard/items/WizardModal";
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";
  import AsideTemplate from "~/components/templates/AsideTemplate.vue";
  import MaskedInput from "~/components/shared/MaskedInput";

  
  export default {
    name: "FrmEdProtPZTCEdit",
    components: {
      AsideTemplate,
      WizardModal,
      DatePickerMask,
      MaskedInput
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
        let protPZTC = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(protPZTC)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillPnpaList();

          this.protPZTC = protPZTC;

          if (funcUtils.isNotEmpty(protPZTC.dateNar)) {
            this.fillStotvSearchInfo();
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
        protPZTC: null,
        pnpaList: null,
        stotvSearchInfoList: null,
        listSectionNav: [
          {
            title: "Протокол по делу",
            name: "head",
          },
          {
            title: "Сведения о нарушении",
            name: "nar",
          },
          {
            title: "Сведения об эвакуации",
            name: "evac",
          },
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
      }
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
            date: this.protPZTC.dateNar
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

      async changeInspSostKod() {
        if (funcUtils.isNotEmpty(this.protPZTC.inspSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: this.protPZTC.inspSostKod
            }
          });
          this.clearInspSost();
          let data = JSON.parse(eventResponse.response).data;
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data[0];
            this.protPZTC.inspSostId = data.inspId;
            this.protPZTC.inspSostKod = data.inspKod;
            this.protPZTC.inspSostName = data.inspName;
            this.protPZTC.inspSostDolz = data.inspDolz;
            this.protPZTC.inspSostRang = data.inspRang;
            this.protPZTC.organSostId = data.ogaiId;
            this.protPZTC.organSostKod = data.organKod;
            this.protPZTC.organSostName = data.ogaiName;
            this.store();
          }
        } else {
          this.clearInspSost();
        }
      },
      async changeOrganSostKod() {
        if (funcUtils.isNotEmpty(this.protPZTC.organSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: this.protPZTC.organSostKod
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
      changeDateNar() {
        this.stotvSearchInfoList = null;
        this.protPZTC.stotvId = null;
        if (funcUtils.isNotEmpty(this.protPZTC.dateNar)) {
          this.fillStotvSearchInfo();
        }

        this.store();
      },
      changeFIO() {
        let fioLength = 0;
        let fioArr = this.protPZTC.inspSostName.split(' ');
        this.protPZTC.inspSostName = '';
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0:
              {
                this.protPZTC.inspSostName += item;
                break;
              }
              case 1:
              {
                this.protPZTC.inspSostName += ' ' + item;
                break;
              }
              case 2:
              {
                this.protPZTC.inspSostName += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.clearInspSostKod();
      },

      onSispClick(data) {
        this.protPZTC.inspSostId = data.inspId;
        this.protPZTC.inspSostKod = data.inspKod;
        this.protPZTC.inspSostName = data.inspName;
        this.protPZTC.inspSostDolz = data.inspDolz;
        this.protPZTC.inspSostRang = data.inspRang;
        this.protPZTC.organSostId = data.ogaiId;
        this.protPZTC.organSostKod = data.organKod;
        this.protPZTC.organSostName = data.ogaiName;
        this.dolzModal.visible = false;
        this.dolzModal.sispList = null;
        this.store();
      },
      onGibddClick(data) {
        this.protPZTC.organSostId = data.ID;
        this.protPZTC.organSostKod = data.ORGAN_KOD;
        this.protPZTC.organSostName = data.ORGAN_NAME;
        this.organModal.gibddList = null;
        this.organModal.visible = false;
        this.store();
      },

      clearInspSostKod() {
        this.protPZTC.inspSostId = null;
        this.protPZTC.inspSostKod = null;
        this.store();
      },
      clearInspSost() {
        this.protPZTC.inspSostId = null;
        this.protPZTC.inspSostKod = null;
        this.protPZTC.inspSostName = null;
        this.protPZTC.inspSostDolz = null;
        this.protPZTC.inspSostRang = null;
        this.store();
      },
      clearOrganSost() {
        this.protPZTC.organSostId = null;
        this.protPZTC.organSostKod = null;
        this.protPZTC.organSostName = null;
        this.store();
      },
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.protPZTC
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

