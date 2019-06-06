<template>
  <aside-template :listSectionNav="[]" :title="ispoln.stadIspolnName" v-if="ispoln">
    <div class="layout-wrap">
      <div class="layout">
        <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>
        <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding">{{ispoln.stadIspolnName}}</h2>
            <div class="adm-form__content">

              <div class="adm-form__item">
                <small class="adm-form__label">Дата стадии исполнения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="ispoln.dateStadIspoln" @change="changeDateStadIspoln" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
              <template v-if="[constants.VOZB_ISPOLN,constants.UPL_SHTRAF_GIBDD,constants.UPL_SHTRAF_SSP].includes(ispoln.stadIspolnKod)">
                <div class="adm-form__item">
                  <small class="adm-form__label">Сумма оплаты штрафа</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <masked-input inputClass="adm-input adm-input--regular wmax240" v-model="ispoln.sumOpl" @onInputChange="store" :maskProps="{regex: '[0-9]+', casing: 'upper', placeholder: ''}" clearable></masked-input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">УИП</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular wmax360" v-model="ispoln.uip" @on-input-change="store" placeholder=""></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
              </template>
              <div class="adm-form__item">
                <small class="adm-form__label">Статья КРФоАп</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular  wmin180" placeholder="" v-model="ispoln.stotvId" clearable filterable :disabled="!ispoln.dateStadIspoln" @on-change="store" :filterMethod="filterStotv">
                        <Option class=" " v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value , item.label | concatByDelimiter(",")}}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Место исполнения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" disabled v-model="ispoln.placeIspoln.placeFull"></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="getPlaceIspoln" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
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
                      <masked-input inputClass="adm-input adm-input--regular" v-model="ispoln.inspIspolnKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeInspIspolnKod" ></masked-input>
                    </Col>
                    <Col :xs="18" :md="18" :lg="18">
                      <Input class="adm-input adm-input--regular" disabled v-model="ispoln.inspIspolnName"></Input>
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
                      <masked-input inputClass="adm-input adm-input--regular" v-model="ispoln.organIspolnKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeOrganIspolnKod" ></masked-input>
                    </Col>
                    <Col :xs="18" :md="18" :lg="18">
                      <Input class="adm-input adm-input--regular" disabled v-model="ispoln.organIspolnName" ></Input>
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
import * as formStack from "~/assets/js/api/formStack";
import RequestApi from "~/assets/js/api/requestApi";
import * as constants from "~/assets/js/utils/constants";

export default {
  name: "FrmEdIspolnEdit",
  components: {
    AsideTemplate: () => import("~/components/templates/AsideTemplate"),
    WizardModal: () => import('~/components/wizard/items/WizardModal'),
  },
  async created() {
    try {
      let current = formStack.getCurrent();
      await this.$store.dispatch("frmEdIspolnEditSetCid", current.cid);
      let prepareParams = {
        method: "restore"
      };
      if (funcUtils.isNotEmpty(this.$route.params.node)) {
        prepareParams.method = "getData";
        prepareParams.params = {
          node: this.$route.params.node
        };
      }
      let eventResponse = await RequestApi.prepareData(prepareParams);
      let ispoln = JSON.parse(eventResponse.response).data;

      if (funcUtils.isEmpty(ispoln)) {
        let error = JSON.parse(eventResponse.response).error;
        this.$store.dispatch("errors/changeContent", {
          title: error.errorMsg,
          desc: error.errorDesc
        });
      } else {
        this.ispoln = ispoln;
      }
      this.fillStotvSearchInfo();
    } catch (e) {
      this.$store.dispatch("errors/changeContent", { title: e.message });
    }
  },
  destroyed() {
    this.$store.dispatch("frmEdIspolnEditSetCid", null);
    this.$store.dispatch("frmEdIspolnEditSetData", null);
  },
  data() {
    return {
      constants,
      ispolnList: null,
      ispoln: null,
      stotvSearchInfoList: null,
      dolzModal: {
        visible: false,
        sispList: null,
        srcList: null,
        columnsOptions: [
          {
            title: "Нагрудный знак",
            key: "inspKod",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "ФИО",
            key: "inspName",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Должность",
            key: "inspDolz",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Звание",
            key: "inspRang",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Код подразделения",
            key: "organKod",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Подразделение",
            key: "ogaiName",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Отдел",
            key: "otdName",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Телефон",
            key: "phone",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Дата начала действия",
            key: "dateBeg",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Дата окончания действия",
            key: "dateEnd",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          }
        ]
      },
      organModal: {
        visible: false,
        gibddList: null,
        srcList: null,
        columnsOptions: [
          {
            title: "Код органа",
            key: "ORGAN_KOD",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Код региона",
            key: "RESP_KOD",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Регион",
            key: "REGION_NAME",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Район",
            key: "RAYON_NAME",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Тип",
            key: "TIP",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Название",
            key: "ORGAN_NAME",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Контакты",
            key: "CONTACTS",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          },
          {
            title: "Адрес",
            key: "KA_ADR_FULL",
            minWidth: 120,
            ellipsis: true,
            sortable: "custom",
            filterable: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h("h4", params.column.title);
            }
          }
        ]
      }
    };
  },
  methods: {
    store() {
      return RequestApi.prepareData({
        method: "store",
        params: {
          data: this.ispoln
        }
      });
    },
    onSispClick(data) {
      this.ispoln.inspIspolnId = data.inspId;
      this.ispoln.inspIspolnKod = data.inspKod;
      this.ispoln.inspIspolnName = data.inspName;
      this.ispoln.inspIspolnDolz = data.inspDolz;
      this.ispoln.inspIspolnRang = data.inspRang;
      this.ispoln.organIspolnId = data.ogaiId;
      this.ispoln.organIspolnKod = data.organKod;
      this.ispoln.organIspolnName = data.ogaiName;
      this.dolzModal.visible = false;
      this.dolzModal.sispList = null;
      this.store();
    },
    onGibddClick(data) {
      this.ispoln.organIspolnId = data.ID;
      this.ispoln.organIspolnKod = data.ORGAN_KOD;
      this.ispoln.organIspolnName = data.ORGAN_NAME;
      this.organModal.gibddList = null;
      this.organModal.visible = false;
      this.store();
    },
    clearInspIspoln() {
      this.ispoln.inspIspolnId = null;
      this.ispoln.inspIspolnKod = null;
      this.ispoln.inspIspolnName = null;
      this.ispoln.inspIspolnDolz = null;
      this.ispoln.inspIspolnRang = null;
      this.store();
    },
    clearOrganIspoln() {
      this.ispoln.organIspolnId = null;
      this.ispoln.organIspolnKod = null;
      this.ispoln.organIspolnName = null;
      this.store();
    },
    async changeInspIspolnKod() {
      if (funcUtils.isNotEmpty(this.ispoln.inspIspolnKod)) {
        let eventResponse = await RequestApi.prepareData({
          method: 'getSinspList',
          params: {
            inspKod: this.ispoln.inspIspolnKod
          }
        });
        this.clearInspIspoln();
        let data = JSON.parse(eventResponse.response).data;
        if (funcUtils.isNotEmpty(data) && data.length > 0) {
          data = data.getFirst();
          this.ispoln.inspSostId = data.inspId;
          this.ispoln.inspIspolnKod = data.inspKod;
          this.ispoln.inspIspolnName = data.inspName;
          this.ispoln.inspSostDolz = data.inspDolz;
          this.ispoln.inspSostRang = data.inspRang;
          this.ispoln.organSostId = data.ogaiId;
          this.ispoln.organIspolnKod = data.organKod;
          this.ispoln.organIspolnName = data.ogaiName;
          this.store();
        }
      } else {
        this.clearInspIspoln();
      }
    },
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
    async changeOrganIspolnKod() {
      if (funcUtils.isNotEmpty(this.ispoln.organIspolnKod)) {
        let eventResponse = await RequestApi.prepareData({
          method: 'getGibddDict',
          params: {
            organKod: this.ispoln.organIspolnKod
          }
        });
        this.clearOrganIspoln();
        let gibddList = JSON.parse(eventResponse.response).data;
        if (gibddList.length > 0) {
          this.organModal.visible = true;
          this.organModal.gibddList = gibddList;
        }
      } else {
        this.clearOrganIspoln();
      }
    },

    async getPlaceIspoln() {
      // TODO
      let eventResponse = await RequestApi.prepareData({
        method: "getPlaceIspolnCID"
      });
      let cid = JSON.parse(eventResponse.response).data;

      formStack.toNext({
        module: this.$store.state.placeViewEdit,
        vm: this,
        notRemoved: false,
        withCreate: false,
        cid: cid,
        params: {
          type: "placeIspoln"
        }
      });
    },
    async fillStotvSearchInfo() {
      // TODO
      // return
      let eventResponse = await RequestApi.prepareData({
        method: "getStotvSearchInfo",
        params: {
          date: this.ispoln.dateStadIspoln
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
    async changeDateStadIspoln() {
      this.stotvSearchInfoList = null;
      this.ispoln.stotvId = null;
      await this.store();
      if (funcUtils.isNotEmpty(this.ispoln.dateStadIspoln)) {
        this.fillStotvSearchInfo();
      }
    },
    async changeIspolnKod() {
      this.ispoln.uip = null;
      await this.store();
    },
    async save() {
      await this.store();
      let eventResponse = await RequestApi.prepareData({
        method: "update"
      });
      if (eventResponse.response) {
        let error = JSON.parse(eventResponse.response).error;
        this.$store.dispatch("errors/changeContent", {
          title: error.errorMsg,
          desc: error.errorDesc
        });
      } else {
        this.getPrev();
      }
    },
    getPrev() {
      try {
        formStack.toPrev({
          vm: this
        });
      } catch (e) {
        this.$store.dispatch("errors/changeContent", { title: e.message });
      }
    }
  }
};
</script>
