<template>
  <aside-template :listSectionNav="listSectionNav" title="Редактирование дела" v-if="delo">
    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>
    <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>
    <wizard-modal v-if="ogaiModal.visible" :columnsOptions="ogaiModal.columnsOptions" :data="ogaiModal.ogaiList" @showModal="showOgaiModal" @onRowDbClick="onOgaiClick"></wizard-modal>

    <div class="adm-form">
      <div class="adm-form__container">
        <div class="adm-form__item">
          <small class="adm-form__label">Дата возбуждения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="delo.deloDate" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Дата и время нарушения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="delo.dateNar" @change="changeDateNar" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">п.НПА нарушения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Select class="adm-input adm-input--regular wmax360 wmin180" placeholder="" v-model="delo.pnpaId" clearable filterable @on-change="store">
                  <Option class="wmax360 " v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Статья ответственности</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Select class="adm-input adm-input--regular wmax360 wmin180" placeholder="" v-model="delo.stotvId" clearable filterable :disabled="!delo.dateNar" @on-change="store">
                  <Option class="wmax360 " v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Вид</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Select class="adm-input adm-input--regular wmax360 wmin180" placeholder="" v-model="delo.deloVid" clearable filterable @on-change="store">
                  <Option class="wmax360 " v-for="item in deloVidList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Примечания</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Input class="adm-input adm-input--regular" v-model="delo.dopSved" @on-input-change="store" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div class="adm-form__container">
        <h2 class="adm-form__headding">Составил</h2>
        <div class="adm-form__content">
          <div class="adm-form__item">
            <small class="adm-form__label">Личный номер сотрудника</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <masked-input inputClass="adm-input adm-input--regular" v-model="delo.inspVozbKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeInspVozbKod" ></masked-input>
                </Col>
                <Col :xs="2" :md="2" :lg="2">
                  <Button @click="showDolzModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                    <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="35" />
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">ФИО сотрудника</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" v-model="delo.inspVozbName" @on-input-change="changeFIO" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Должность сотрудника</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" v-model="delo.inspVozbDolz" @on-input-change="clearInspVozbKod" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Звание</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" v-model="delo.inspVozbRang" @on-input-change="clearInspVozbKod" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Код подразделения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <masked-input inputClass="adm-input adm-input--regular" v-model="delo.organVozbKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeOrganVozbKod" ></masked-input>
                </Col>
                <Col :xs="2" :md="2" :lg="2">
                  <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                    <Icon type="ios-bookmarks-outline" class=" " title="Справочник подразделений" :size="35" />
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Подразделение</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" v-model="delo.organVozbName" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Код местонахождения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <masked-input inputClass="adm-input adm-input--regular" v-model="delo.ogaiNahKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeOgaiNahKod" ></masked-input>
                </Col>
                <Col :xs="24" :md="14" :lg="8">
                  <a href="#" @click="showOgaiModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Подразделения</a>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Местонахождение</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" :value="delo.ogaiNahName" disabled  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </Col>
              </Row>
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
  import AsideTemplate from "~/components/templates/AsideTemplate.vue";
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";
  import MaskedInput from "~/components/shared/MaskedInput";

  export default {
    name: "FrmEdDeloEdit",
    components: {
      AsideTemplate,
      WizardModal,
      MaskedInput,
      DatePickerMask
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdDeloEditSetCid', current.cid);
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
        let delo = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(delo)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillPnpaList();
          await this.fillDeloVidList();

          this.delo = delo;

          if (funcUtils.isNotEmpty(delo.dateNar)) {
            this.fillStotvSearchInfo();
          }
        }
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdDeloEditSetCid', null);
      this.$store.dispatch('frmEdDeloEditSetData', null);
    },
    data() {
      return {
        delo: null,
        deloVidList: null,
        pnpaList: null,
        stotvSearchInfoList: null,
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
        ogaiModal: {
          visible: false,
          ogaiList: null,
          srcList: null,
          columnsOptions:
            [
              {
                title: 'Код органа',
                key: 'OGAI_KOD',
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
        }
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
      async showOgaiModal(visible) {
        if (funcUtils.isEmpty(this.ogaiModal.srcList)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              ogaiKod: null
            }
          });
          let ogaiList = JSON.parse(eventResponse.response).data;
          this.ogaiModal.srcList = ogaiList.filter((item) => {
            return funcUtils.isNotEmpty(item.OGAI_KOD);
          });
        }
        if (visible) {
          this.ogaiModal.ogaiList = this.ogaiModal.srcList;
        } else {
          this.ogaiModal.ogaiList = null;
        }
        this.ogaiModal.visible = visible;
      },

      async fillDeloVidList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getDeloVidDict'
        });
        let deloVidList = [];
        let deloVidDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < deloVidDict.length; i++) {
          let deloVid = deloVidDict[i];
          deloVidList.push({
            label: deloVid.DELO_VID_NAME,
            value: deloVid.DELO_VID
          });
        }
        this.deloVidList = deloVidList;
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
            date: this.delo.dateNar
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

      async changeInspVozbKod() {
        if (funcUtils.isNotEmpty(this.delo.inspVozbKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: this.delo.inspVozbKod
            }
          });
          this.clearInspVozb();
          let data = JSON.parse(eventResponse.response).data;
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data.getFirst();
            this.delo.inspVozbId = data.inspId;
            this.delo.inspVozbKod = data.inspKod;
            this.delo.inspVozbName = data.inspName;
            this.delo.inspVozbDolz = data.inspDolz;
            this.delo.inspVozbRang = data.inspRang;
            this.delo.organVozbId = data.ogaiId;
            this.delo.organVozbKod = data.organKod;
            this.delo.organVozbName = data.ogaiName;
            this.store();
          }
        } else {
          this.clearInspVozb();
        }
      },
      async changeOrganVozbKod() {
        if (funcUtils.isNotEmpty(this.delo.organVozbKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: this.delo.organVozbKod
            }
          });
          this.clearOrganVozb();
          let gibddList = JSON.parse(eventResponse.response).data;
          if (gibddList.length > 0) {
            this.organModal.visible = true;
            this.organModal.gibddList = gibddList;
          }
        } else {
          this.clearOrganVozb();
        }
      },
      async changeOgaiNahKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.delo.ogaiNahKod) && express.test(this.delo.ogaiNahKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getOgaiDict',
            params: {
              ogaiKod: this.delo.ogaiNahKod
            }
          });
          let ogaiList = JSON.parse(eventResponse.response).data;
          if (ogaiList.length > 0) {
            this.ogaiModal.visible = true;
            this.ogaiModal.ogaiList = ogaiList;
          } else {
            this.clearOgai();
          }
        } else {
          this.clearOgai();
        }
      },
      changeDateNar() {
        this.stotvSearchInfoList = null;
        this.delo.stotvId = null;
        if (funcUtils.isNotEmpty(this.delo.dateNar)) {
          this.fillStotvSearchInfo();
        }

        this.store();
      },
      changeFIO() {
        let fioLength = 0;
        let fioArr = this.delo.inspVozbName.split(' ');
        this.delo.inspVozbName = '';
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0:
              {
                this.delo.inspVozbName += item;
                break;
              }
              case 1:
              {
                this.delo.inspVozbName += ' ' + item;
                break;
              }
              case 2:
              {
                this.delo.inspVozbName += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.clearInspVozbKod();
      },

      onSispClick(data) {
        this.delo.inspVozbId = data.inspId;
        this.delo.inspVozbKod = data.inspKod;
        this.delo.inspVozbName = data.inspName;
        this.delo.inspVozbDolz = data.inspDolz;
        this.delo.inspVozbRang = data.inspRang;
        this.delo.organVozbId = data.ogaiId;
        this.delo.organVozbKod = data.organKod;
        this.delo.organVozbName = data.ogaiName;
        this.dolzModal.visible = false;
        this.dolzModal.sispList = null;
        this.store();
      },
      onGibddClick(data) {
        this.delo.organVozbId = data.ID;
        this.delo.organVozbKod = data.ORGAN_KOD;
        this.delo.organVozbName = data.ORGAN_NAME;
        this.organModal.gibddList = null;
        this.organModal.visible = false;
        this.store();
      },
      onOgaiClick(data) {
        this.delo.ogaiNahKod = data.OGAI_KOD;
        this.delo.ogaiNahName = data.ORGAN_NAME;
        this.ogaiModal.ogaiList = null;
        this.ogaiModal.visible = false;
        this.store();
      },

      clearInspVozbKod() {
        this.delo.inspVozbId = null;
        this.delo.inspVozbKod = null;
        this.store();
      },
      clearInspVozb() {
        this.delo.inspVozbId = null;
        this.delo.inspVozbKod = null;
        this.delo.inspVozbName = null;
        this.delo.inspVozbDolz = null;
        this.delo.inspVozbRang = null;
        this.store();
      },
      clearOrganVozb() {
        this.delo.organVozbId = null;
        this.delo.organVozbKod = null;
        this.delo.organVozbName = null;
        this.store();
      },
      clearOgai() {
        this.delo.ogaiNahKod = null;
        this.delo.ogaiNahName = null;
        this.store();
      },
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.delo
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


<style scoped lang="scss">
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 12px;
    // outline: 1px solid red;
    padding-bottom: 12px;
    // min-height: 90px;
  }
  .adm-form__label{
    padding: 0;
    padding-right: 12px;
    min-width: 210px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
