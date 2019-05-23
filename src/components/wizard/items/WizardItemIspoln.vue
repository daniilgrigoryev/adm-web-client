<template>
  <div v-if="data">
    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>
    <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>

    <div class="adm-form__item">
      <small class="adm-form__label">Должностное лицо</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="4" :md="4" :lg="4">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.inspIspolnKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeInspIspolnKod" ></masked-input>
          </Col>
          <Col :xs="18" :md="18" :lg="18">
            <Input class="adm-input adm-input--regular" disabled v-model="data.inspIspolnName" ></Input>
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
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.organIspolnKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeOrganIspolnKod"></masked-input>
          </Col>
          <Col :xs="18" :md="18" :lg="18">
            <Input class="adm-input adm-input--regular" disabled v-model="data.organIspolnName" @on-input-change="changeOrganIspolnKod" ></Input>
          </Col>
          <Col :xs="2" :md="2" :lg="2">
            <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="30" />
            </Button>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата стадии исполнения</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateStadIspoln" @change="changeDateStadIspoln" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Статья КРФоАп</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="data.stotvId" clearable filterable :disabled="!data.dateStadIspoln" @on-change="storeElementData">
              <Option class=" " v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value , item.label | concatByDelimiter(",")}}</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Стадия исполнения</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="data.stadIspolnKod" clearable filterable @on-change="changeIspolnKod">
              <Option class=" " v-for="item in ispolnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </div>
    <div v-if="data.stadIspolnKod === 11 || data.stadIspolnKod === 2" class="adm-form__item">
      <small class="adm-form__label">УИП</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.uip" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData" ></masked-input>
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
    name: "WizardItemIspoln",
    components: {
      WizardModal: () => import('~/components/wizard/items/WizardModal'),
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask'),
      MaskedInput: () => import('~/components/shared/MaskedInput')
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
        stotvSearchInfoList: null,
        ispolnList: null,
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
          srcList: null,
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
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          this.data = data;
          this.fillStotvSearchInfo();
          this.fillIspolnByDecis();
        }
      },

      async fillIspolnByDecis() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getIspolnByDecis',
            data: null
          }
        });
        let ispolnList = [];
        let ispolnDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < ispolnDict.length; i++) {
          let ispoln = ispolnDict[i];
          ispolnList.push({
            label: ispoln.name,
            value: ispoln.id
          });
        }
        this.ispolnList = ispolnList;
      },
      async fillStotvSearchInfo() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getStotvSearchInfo',
            data: null
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
      async changeDateStadIspoln() {
        this.stotvSearchInfoList = null;
        this.data.stotvId = null;
        await this.storeElementData();
        if (funcUtils.isNotEmpty(this.data.dateStadIspoln)) {
          this.fillStotvSearchInfo();
        }
      },
      async changeIspolnKod() {
        this.data.uip = null;
        await this.storeElementData();
      },
      async changeInspIspolnKod() {
        if (funcUtils.isNotEmpty(this.data.inspIspolnKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getSinspList',
              data: JSON.stringify({
                inspKod: this.data.inspIspolnKod
              })
            }
          });
          this.clearInspIspoln();
          let data = JSON.parse(JSON.parse(eventResponse.response).data);
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data.getFirst();
            this.data.inspIspolnId = data.inspId;
            this.data.inspIspolnKod = data.inspKod;
            this.data.inspIspolnName = data.inspName;
            this.data.inspIspolnDolz = data.inspDolz;
            this.data.inspIspolnRang = data.inspRang;
            this.data.organIspolnId = data.ogaiId;
            this.data.organIspolnKod = data.organKod;
            this.data.organIspolnName = data.ogaiName;
            await this.storeElementData();
          }
        } else {
          this.clearInspIspoln();
        }
      },
      async changeOrganIspolnKod() {
        if (funcUtils.isNotEmpty(this.data.organIspolnKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getGibddDict',
              data: JSON.stringify({
                organKod: this.data.organIspolnKod
              })
            }
          });
          this.clearOrganIspoln();
          let gibddList = JSON.parse(JSON.parse(eventResponse.response).data);
          if (gibddList.length > 0) {
            this.organModal.visible = true;
            this.organModal.gibddList = gibddList;
          }
        } else {
          this.clearOrganIspoln();
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
      async showOrganModal(visible) {
        if (visible && funcUtils.isEmpty(this.organModal.srcList)) {
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
          this.organModal.srcList = JSON.parse(JSON.parse(eventResponse.response).data);
        }
        if (visible) {
          this.organModal.gibddList = this.organModal.srcList;
        } else {
          this.organModal.gibddList = null;
        }
        this.organModal.visible = visible;
      },
      async clearInspIspoln() {
        this.data.inspIspolnId = null;
        this.data.inspIspolnKod = null;
        this.data.inspIspolnName = null;
        this.data.inspIspolnDolz = null;
        this.data.inspIspolnRang = null;
        await this.storeElementData();
      },
      async clearOrganIspoln() {
        this.data.organIspolnId = null;
        this.data.organIspolnKod = null;
        this.data.organIspolnName = null;
        await this.storeElementData();
      },
      async onSispClick(data) {
        this.data.inspIspolnId = data.inspId;
        this.data.inspIspolnKod = data.inspKod;
        this.data.inspIspolnName = data.inspName;
        this.data.inspIspolnDolz = data.inspDolz;
        this.data.inspIspolnRang = data.inspRang;
        this.data.organIspolnId = data.ogaiId;
        this.data.organIspolnKod = data.organKod;
        this.data.organIspolnName = data.ogaiName;
        this.dolzModal.visible = false;
        this.dolzModal.sispList = null;
        await this.storeElementData();
      },
      async onGibddClick(data) {
        this.data.organIspolnId = data.ID;
        this.data.organIspolnKod = data.ORGAN_KOD;
        this.data.organIspolnName = data.ORGAN_NAME;
        this.organModal.gibddList = null;
        this.organModal.visible = false;
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

<style scoped>

</style>
