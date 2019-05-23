<template>
  <div v-if="data">

    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>

    <wizard-modal v-if="sudModal.visible" :columnsOptions="sudModal.columnsOptions" :data="sudModal.sudList" @showModal="showSudModal" @onRowDbClick="onSudClick"></wizard-modal>

    <div v-if="deloModal.visible" class="absolute bg-white z5 scroll-hidden px36 py12" style="top: 0; bottom: 0; right: 0; left: 0;">

      <div class="flex-parent flex-parent--end-main">
        <Button type="text" @click="showDeloModal(false)" class="px0 py0">
          <div class="flex-parent flex-parent--center-cross">
            <div class="adm-text-big color-blue-base">Закрыть</div>
            <Icon type="md-close" size="50" class="color-blue-base cursor-pointer"/>
          </div>
        </Button>
      </div>


      <div class="adm-form">
				<div class="adm-form__item">
					<small class="adm-form__label">Поиск</small>
					<Row :gutter="16" type="flex" align="middle">
						<Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="deloModal.paramValue" @on-input-change="changeDeloValue">
                  <Select class="adm-input adm-input--regular w180 align-l" v-model="deloModal.paramKey" slot="prepend">
                      <Option value="deloNum">По номеру дела</Option>
                      <Option value="postNum">По номеру постановления</Option>
                  </Select>
                  <Button slot="append" class="append-custom" icon="ios-search" @click="findDeloList" :disabled="!deloModal.paramKey || !deloModal.paramValue" type="primary">Поиск</Button>
              </Input>
						</Col>
					</Row>
				</div>

				<div class="adm-form__item" v-if="deloModal.deloList">
					<small class="adm-form__label">
            <span v-if="deloModal.paramKey == 'deloNum'">Дело</span>
            <span v-if="deloModal.paramKey == 'postNum'">Постановление</span>
          </small>
					<Row :gutter="16" type="flex" align="middle">
						<Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" filterable @on-change="onDeloSelect">
                <Option class="wmax360 " v-for="item in deloModal.deloList" :value="item.value.delo" :key="item.value.id">{{ item.label }}</Option>
              </Select>
						</Col>
					</Row>
				</div>
      </div>
    </div>

    <div class="adm-form">
      <div class="adm-form__item">
        <small class="adm-form__label">Номер постановления</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.docN" @on-input-change="storeElementData" ></Input>
          </Col>
        </Row>
      </div>
      <div v-if="!isNotEmptyParentNode" class="adm-form__item">
        <small class="adm-form__label">Уникальный номер дела</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" :disabled="data.deloN !== null" @on-input-change="storeElementData" v-model="data.deloN" ></Input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Дата и время задержания</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateSost" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Личный номер сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="22" :md="22" :lg="22">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.inspSostKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeInspSostKod" ></masked-input>
          </Col>
          <Col :xs="2" :md="2" :lg="2">
            <Button @click="showDolzModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="35" />
            </Button>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">ФИО сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.inspSostName" :maskProps="{casing: 'upper', regex: '[a-zA-Zа-яА-Я]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Должность сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.inspSostDolz" @on-input-change="clearInspSostKod" ></Input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Звание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.inspSostRang" @on-input-change="clearInspSostKod" ></Input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Код подразделения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.organSostKod" disabled ></Input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Подразделение</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.organSostName" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Статья ответственности</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="stotv" disabled ></Input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Орган рассмотрения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.organRasmName" disabled ></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="showSudModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Справочник судов</a>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Дата и время рассмотрения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateRasm" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Дело - основание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="mainDelo" disabled ></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="showDeloModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Справочник</a>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemDocProt2025",
    components: {
      WizardModal: () => import('~/components/wizard/items/WizardModal'),
      MaskedInput: () => import('~/components/shared/MaskedInput'),
      Select: () => import('~/components/shared/CustomSelect'),
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask')
    },
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
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
        sudModal: {
          visible: false,
          sudList: null,
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
        deloModal: {
          visible: false,
          paramKey: 'deloNum',
          paramValue: null,
          deloList: null,
          srcList: null,
        },
      }
    },
    computed: {
      isNotEmptyParentNode() {
        return funcUtils.isNotEmpty(this.info.parentNode);
      },
      stotv() {
        if (funcUtils.isNotEmpty(this.data.stotvKod) && funcUtils.isNotEmpty(this.data.stotvName)) {
          return this.data.stotvKod + ', ' + this.data.stotvName;
        }
        return '';
      },
      mainDelo() {
        if (funcUtils.isNotEmpty(this.data.mainDeloN) && funcUtils.isNotEmpty(this.data.mainDeloDate)) {
          return this.data.mainDeloN + ' от ' + funcUtils.parseDateTime(this.data.mainDeloDate, 'DD.MM.YYYY');
        }
        return '';
      },
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
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          this.data = data;
        }
      },

      async showDolzModal(visible) {
        if (funcUtils.isEmpty(this.dolzModal.srcList)) {
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
          this.dolzModal.srcList = JSON.parse(JSON.parse(eventResponse.response).data);
        }
        if (visible) {
          this.dolzModal.sispList = this.dolzModal.srcList;
        } else {
          this.dolzModal.sispList = null;
        }
        this.dolzModal.visible = visible;
      },
      async showSudModal(visible) {
        if (visible && funcUtils.isEmpty(this.sudModal.srcList)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getSudDict',
              data: null
            }
          });
          this.sudModal.srcList = JSON.parse(JSON.parse(eventResponse.response).data);
        }
        if (visible) {
          this.sudModal.sudList = this.sudModal.srcList;
        } else {
          this.sudModal.sudList = null;
        }
        this.sudModal.visible = visible;
      },
      async showDeloModal(visible) {
        this.deloModal.visible = visible;
        this.deloModal.deloList = null;
        this.deloModal.paramValue = null;
      },

      changeDeloValue() {
        let express = /^\d+$/;
        if (funcUtils.isEmpty(this.deloModal.paramValue) || !express.test(this.deloModal.paramValue)) {
          this.deloModal.paramValue = null;
          this.deloModal.deloList = null;
        }
      },
      async changeInspSostKod() {
        if (funcUtils.isNotEmpty(this.data.inspSostKod)) {
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
          this.clearInspSost();
          let data = JSON.parse(JSON.parse(eventResponse.response).data);
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data.getFirst();
            this.data.inspSostId = data.inspId;
            this.data.inspSostKod = data.inspKod;
            this.data.inspSostName = data.inspName;
            this.data.inspSostDolz = data.inspDolz;
            this.data.inspSostRang = data.inspRang;
            this.data.organSostId = data.ogaiId;
            this.data.organSostKod = data.organKod;
            this.data.organSostName = data.ogaiName;
            await this.storeElementData();
          }
        } else {
          this.clearInspSost();
        }
      },

      async findDeloList() {
        if (funcUtils.isNotEmpty(this.deloModal.paramValue) && this.deloModal.paramValue.length > 0) {
          let methodName;
          let params = {};
          params[this.deloModal.paramKey] = this.deloModal.paramValue;
          if (this.deloModal.paramKey === 'deloNum') {
            methodName = 'findDeloListByNum';
          } else if (this.deloModal.paramKey === 'postNum') {
            methodName = 'findDeloListByPostNum';
          }
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: methodName,
              data: JSON.stringify(params)
            }
          });
          let deloList = [];
          let deloDict = JSON.parse(JSON.parse(eventResponse.response).data);
          for (let i = 0; i < deloDict.length; i++) {
            let delo = deloDict[i];
            let label;
            if (funcUtils.isNotEmpty(delo.date) && delo.date > 0) {
              label = delo.num + ' от ' + funcUtils.parseDateTime(delo.date, 'DD/MM/YYYY');
            } else {
              label = delo.num;
            }
            deloList.push({
              label: label,
              value: {
                id: delo.id,
                delo: JSON.stringify(delo)
              },
            });
          }
          this.deloModal.deloList = deloList;
        }
      },

      async onDeloSelect(e) {
        if (funcUtils.isNotEmpty(e)) {
          let delo = JSON.parse(e);
          this.data.mainDeloId = delo.id;
          this.data.mainDeloN = delo.num;
          this.data.mainDeloDate = new Date(delo.date);
          this.deloModal.visible = false;
          this.deloModal.deloList = null;
        }
        await this.storeElementData();
      },

      async onSudClick(data) {
        this.data.organRasmId = data.ID;
        this.data.organRasmKod = data.ORGAN_KOD;
        this.data.organRasmName = data.ORGAN_NAME;
        this.sudModal.visible = false;
        this.sudModal.sudList = null;
        await this.storeElementData();
      },

      async onSispClick(data) {
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
        await this.storeElementData();
      },

      async clearInspSostKod() {
        this.data.inspSostId = null;
        this.data.inspSostKod = null;
        await this.storeElementData();
      },
      async clearInspSost() {
        this.data.inspSostId = null;
        this.data.inspSostKod = null;
        this.data.inspSostName = null;
        this.data.inspSostDolz = null;
        this.data.inspSostRang = null;
        await this.storeElementData();
      },

      async storeElementData() {
        return new Promise((resolve, reject) => {
          this.$emit('storeElementData', {
            eCID: this.info.eCID,
            data: this.data,
            resolve: resolve
          });
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .append-custom{
    border-radius: 0 4px 4px 0px;
    color: #fff;
    background-color: #2d8cf0;
    border-color: #2d8cf0;
  }
  .append-custom:disabled,
  .append-custom[disabled]{
    color: #c5c8ce;
    background-color: #f7f7f7;
    border-color: #dcdee2;
  }
</style>
