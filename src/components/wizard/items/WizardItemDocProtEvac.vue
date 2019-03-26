<template>
  <div v-if="data">
    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>

    <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>

   <div class="adm-form">
      <h2 class="title" id="head">Ввод данных по протоколу о задержании ТС</h2>
      <div class="adm-form__container mt6">
        <div class="adm-form__content px36 py24">
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Протокол №</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <masked-input inputClass="adm-input adm-input--regular" :maskProps="maskInputProt" v-model="data.docN" @on-input-change="storeElementData"></masked-input>
                </Col>
                <Col :xs="2" :md="2" :lg="2">
                  <Button @click="createProtNum" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                    <Icon type="md-key"  class="bg-whte color-gray-light color-blue-on-hover transition" title="Получить уникальный номер" :size="35" />
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Дата и время составления</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180 ivu-date-picker" v-model="data.dateSost" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="adm-form">
      <div class="adm-form__container mt6">
        <h2 class="adm-text-big adm-form__headding" id="sost">Составил</h2>
        <div class="adm-form__content px36 py24">
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Должностное лицо</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" disabled v-model="data.inspSostName" @on-input-change="changeFIO" ></Input>
                </Col>
                <Col :xs="2" :md="2" :lg="2">
                  <Button @click="showDolzModal(true)" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                    <Icon type="ios-bookmarks-outline" class="bg-whte color-gray-light color-blue-on-hover transition" title="cправочник сотрудников" :size="35" />
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Подразделение</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" disabled v-model="data.organSostName" @on-input-change="changeOrganSostKod" ></Input>
                </Col>
                <Col :xs="2" :md="2" :lg="2">
                  <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                    <Icon type="ios-bookmarks-outline" class="bg-whte color-gray-light color-blue-on-hover transition" title="уполномоченные органы" :size="35" />
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="adm-form">
      <div class="adm-form__container mt6">
        <h2 class="adm-text-big adm-form__headding" id="evac">Сведения об эвакуации</h2>
        <div class="adm-form__content px36 py24">
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Организация эвакуатора</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.evacOrgName" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Представитель</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.evacAgentName" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">ГРЗ эвакуатора</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <masked-input inputClass="adm-input adm-input--regular" :maskProps="maskInputGrz" v-model="data.evacRegno"  @on-input-change="storeElementData"></masked-input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Штрафстоянка</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.impoundLotName" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">№ акта эвакуации</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular wmax240" @on-input-change="storeElementData" v-model="data.evacActNumber" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Дата составления акта</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180 ivu-date-picker" v-model="data.evacActTime" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="adm-form">
      <div class="adm-form__container mt6">
        <h2 class="adm-text-big adm-form__headding" id="nar">Сведения о нарушении</h2>
        <div class="adm-form__content px36 py24">
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Дата и время нарушения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180 ivu-date-picker" v-model="data.dateNar" @change="changeDateNar" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                </Col>
              </Row>
            </div>
          </div>

          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Пункт НПА</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.pnpaId" clearable filterable @on-change="storeElementData">
                    <Option class="wmax360 txt-break-word" v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Статья КРФоАП</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.stotvId" clearable filterable :disabled="!data.dateNar" @on-change="storeElementData">
                    <Option class="wmax360 txt-break-word" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Фактические сведения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.factSved" ></Input>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import WizardModal from "~/components/wizard/items/WizardModal";
  import DatePickerMask from "~/components/shared/DatePickerMask";
  import MaskedInput from "~/components/shared/MaskedInput";

  export default {
    name: "WizardItemDocProtEvac",
    components: {WizardModal, DatePickerMask, MaskedInput},
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        pnpaList: null,
        stotvSearchInfoList: null,
        maskInputProt: {
          casing: 'upper',
          placeholder: 'номер протокола'
        },
        maskInputGrz: {
          casing: 'upper',
          placeholder: ' '
        },
        dolzModal: {
          visible: false,
          sispList: null,
          columnsOptions:
            [
              {
                title: 'Нагрудный знак',
                key: 'inspKod',
                minWidth: 120,
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
          columnsOptions:
            [
              {
                title: 'Код органа',
                key: 'ORGAN_KOD',
                minWidth: 120,
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
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              }
            ]
        }
      }
    },
    methods: {
      async initData() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getElementData',
          params: {
            eCID: this.info.eCID
          }
        });
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillPnpaList();

          this.data = data;

          if (funcUtils.isNotEmpty(data.dateNar)) {
            this.fillStotvSearchInfo();
          }
        }
      },
      async createProtNum() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'createProtNum',
            data: null
          }
        });
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          this.data = data;

          if (funcUtils.isNotEmpty(data.dateNar)) {
            this.fillStotvSearchInfo();
          }
        }
      },
      async createNewDeloNum() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'createDeloNum',
            data: null
          }
        });
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          this.data = data;

          if (funcUtils.isNotEmpty(data.dateNar)) {
            this.fillStotvSearchInfo();
          }
        }
      },

      async showDolzModal(visible) {
        if (visible) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getSinspList',
              data: JSON.stringify({
                inspKod: null
              })
            }
          });
          this.dolzModal.sispList = JSON.parse(JSON.parse(eventResponse.response).data);
        } else {
          this.dolzModal.sispList = null;
        }
        this.dolzModal.visible = visible;
      },
      async showOrganModal(visible) {
        if (visible) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getGibddDict',
              data: JSON.stringify({
                organKod: null
              })
            }
          });
          this.organModal.gibddList = JSON.parse(JSON.parse(eventResponse.response).data);
        } else {
          this.organModal.gibddList = null;
        }
        this.organModal.visible = visible;
      },

      async fillPnpaList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getPnpaDict',
            data: null
          }
        });
        let pnpaList = [];
        let pnpaDict = JSON.parse(JSON.parse(eventResponse.response).data);
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
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getStotvSearchInfo',
            data: JSON.stringify({
              date: this.data.dateNar
            })
          }
        });
        let stotvSearchInfoList = [];
        let stotvSearchInfoDict = JSON.parse(JSON.parse(eventResponse.response).data);
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
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.data.inspSostKod) && express.test(this.data.inspSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getSinspList',
              data: JSON.stringify({
                inspKod: this.data.inspSostKod
              })
            }
          });
          let data = JSON.parse(JSON.parse(eventResponse.response).data);
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data[0];
            this.data.inspSostId = data.inspId;
            this.data.inspSostKod = data.inspKod;
            this.data.inspSostName = data.inspName;
            this.data.inspSostDolz = data.inspDolz;
            this.data.inspSostRang = data.inspRang;
            this.data.organSostId = data.ogaiId;
            this.data.organSostKod = data.organKod;
            this.data.organSostName = data.ogaiName;
            this.storeElementData();
          } else {
            this.clearInspSost();
          }
        } else {
          this.clearInspSost();
        }
      },
      async changeOrganSostKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.data.organSostKod) && express.test(this.data.organSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getGibddDict',
              data: JSON.stringify({
                organKod: this.data.organSostKod
              })
            }
          });
          let gibddList = JSON.parse(JSON.parse(eventResponse.response).data);
          if (gibddList.length > 0) {
            this.organModal.visible = true;
            this.organModal.gibddList = gibddList;
          } else {
            this.clearOrganSost();
          }
        } else {
          this.clearOrganSost();
        }
      },
      changeDateNar() {
        this.stotvSearchInfoList = null;
        this.data.stotvId = null;
        if (funcUtils.isNotEmpty(this.data.dateNar)) {
          this.fillStotvSearchInfo();
        }

        this.storeElementData();
      },
      changeFIO() {
        let fioLength = 0;
        let fioArr = this.data.inspSostName.split(' ');
        this.data.inspSostName = '';
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0:
              {
                this.data.inspSostName += item;
                break;
              }
              case 1:
              {
                this.data.inspSostName += ' ' + item;
                break;
              }
              case 2:
              {
                this.data.inspSostName += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.clearInspSostKod();
      },

      onSispClick(data) {
        this.data.inspSostId = data.inspId;
        this.data.inspSostKod = data.inspKod;
        this.data.inspSostName = data.inspName;
        this.data.inspSostDolz = data.inspDolz;
        this.data.inspSostRang = data.inspRang;
        this.data.organSostId = data.ogaiId;
        this.data.organSostKod = data.organKod;
        this.data.organSostName = data.ogaiName;
        this.dolzModal.visible = false;
        this.dolzModal.sispList = null;
        this.storeElementData();
      },
      onGibddClick(data) {
        this.data.organSostId = data.ID;
        this.data.organSostKod = data.ORGAN_KOD;
        this.data.organSostName = data.ORGAN_NAME;
        this.organModal.gibddList = null;
        this.organModal.visible = false;
        this.storeElementData();
      },

      clearInspSostKod() {
        this.data.inspSostId = null;
        this.data.inspSostKod = null;
        this.storeElementData();
      },
      clearInspSost() {
        this.data.inspSostId = null;
        this.data.inspSostKod = null;
        this.data.inspSostName = null;
        this.data.inspSostDolz = null;
        this.data.inspSostRang = null;
        this.storeElementData();
      },
      clearOrganSost() {
        this.data.organSostId = null;
        this.data.organSostKod = null;
        this.data.organSostName = null;
        this.storeElementData();
      },

      storeElementData() {
        this.$emit('storeElementData', {
          eCID: this.info.eCID,
          data: this.data
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  h2.title {
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    margin: 30px;
  }

  .adm-form-content{
    // border: 1px solid #000;
  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    // min-height: 90px;
    // outline: 1px solid;
  }
  .adm-form__label{
    padding: 0;
    min-width: 130px;
    padding-right: 12px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
