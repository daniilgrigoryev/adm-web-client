<template>
  <div v-if="data">
    <wizard-modal v-if="inspUtvModal.visible" :columnsOptions="inspUtvModal.columnsOptions" :data="inspUtvModal.inspUtvList" @showModal="showInspUtvModal" @onRowDbClick="onInspUtvClick"></wizard-modal>

    <div class="adm-form__item">
      <small class="adm-form__label">Основание продления сроков</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular wmin120" v-model="data.reason" :maskProps="{regex: '[a-zA-Zа-яА-Я0-9]+', casing: 'upper', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата до которой продлевается срок</small>
      <div class="adm-form__item_content">
        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180 ivu-date-picker" v-model="data.prolongUntilDate" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Инспектор на чье имя ходатайство</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="4" :md="4" :lg="4">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.inspUtvKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeInspUtvKod" ></masked-input>
          </Col>
          <Col :xs="18" :md="18" :lg="18">
            <Input class="adm-input adm-input--regular" disabled v-model="data.inspUtvName"></Input>
          </Col>
          <Col :xs="2" :md="2" :lg="2">
            <Button @click="showInspUtvModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="30" />
            </Button>
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
    name: "WizardItemPetFive",
    components: {
      WizardModal: () => import('~/components/wizard/items/WizardModal'),
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask'),
      MaskedInput: () => import('~/components/shared/MaskedInput'),
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
        inspUtvModal: {
          visible: false,
          inspUtvList: null,
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
        }
      },
      async showInspUtvModal(visible) {
        if (funcUtils.isEmpty(this.inspUtvModal.srcList)) {
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
          this.inspUtvModal.srcList = JSON.parse(JSON.parse(eventResponse.response).data);
        }
        if (visible) {
          this.inspUtvModal.inspUtvList = this.inspUtvModal.srcList;
        } else {
          this.inspUtvModal.inspUtvList = null;
        }
        this.inspUtvModal.visible = visible;
      },
      async changeInspUtvKod() {
        if (funcUtils.isNotEmpty(this.data.inspUtvKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getSinspList',
              data: JSON.stringify({
                inspKod: this.data.inspUtvKod
              })
            }
          });
          await this.clearInspUtv();
          let data = JSON.parse(JSON.parse(eventResponse.response).data);
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data.getFirst();
            this.data.inspUtvId = data.inspId;
            this.data.inspUtvKod = data.inspKod;
            this.data.inspUtvName = data.inspName;
            this.data.inspUtvDolz = data.inspDolz;
            this.data.inspUtvRang = data.inspRang;
            await this.storeElementData();
          }
        } else {
          this.clearInspUtv();
        }
      },
      async onInspUtvClick(data) {
        this.data.inspUtvId = data.inspId;
        this.data.inspUtvKod = data.inspKod;
        this.data.inspUtvName = data.inspName;
        this.data.inspUtvDolz = data.inspDolz;
        this.data.inspUtvRang = data.inspRang;
        this.inspUtvModal.visible = false;
        this.inspUtvModal.inspUtvList = null;
        await this.storeElementData();
      },
      async clearInspUtv() {
        this.data.inspUtvId = null;
        this.data.inspUtvKod = null;
        this.data.inspUtvName = null;
        this.data.inspUtvDolz = null;
        this.data.inspUtvRang = null;
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
  h2.title {
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    margin: 30px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
