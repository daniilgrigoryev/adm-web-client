<template>
  <aside-template :listSectionNav="listSectionNav" title="Редактирование протокола" v-if="docsProt">
    <div class="layout-wrap">
      <div class="layout">
        <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>
        <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>

        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">Протокол об АПН № {{ docsProt.docN }} от {{ docsProt.dateSost | formatDateTime('DD.MM.YYYY HH:mm') }}</h2>
            <div class="adm-form__content">
              <Row>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Протокол №</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="14" :lg="16">
                          <Input class="adm-input adm-input--regular" readonly :value="docsProt.docN"></Input>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Дата и время составления</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="14" :lg="16">
                          <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsProt.dateSost" @change="store" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="sost">Составил</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-form__label">Должностное лицо</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="4" :md="4" :lg="4">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="docsProt.inspSostKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeInspSostKod" ></masked-input>
                    </Col>
                    <Col :xs="18" :md="18" :lg="18">
                      <Input class="adm-input adm-input--regular" readonly :value="docsProt.inspSostName, docsProt.inspSostRang | concatByDelimiter(',')" ></Input>
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
                <small class="adm-form__label">Подразделение</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="4" :md="4" :lg="4">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="docsProt.organSostKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeOrganSostKod" ></masked-input>
                    </Col>
                    <Col :xs="18" :md="18" :lg="18">
                      <Input class="adm-input adm-input--regular" readonly :value="docsProt.organSostName" ></Input>
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
                <small class="adm-form__label">Место составления</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" disabled v-model="docsProt.placeSost.placeFull"></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="getPlaceSost" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                        <Icon type="ios-bookmarks-outline" class=" " title="адресный справочник" :size="35" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="nar">Сведения о нарушении</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-form__label">Дата и время нарушения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsProt.dateNar" @change="changeDateNar" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Место нарушения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" disabled v-model="docsProt.placeNar.placeFull"></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="getPlaceNar" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                        <Icon type="ios-bookmarks-outline" class=" " title="адресный справочник" :size="35" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Пункт НПА нарушения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="docsProt.pnpaId" clearable filterable @on-change=
                        "store">
                        <Option class=" " v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value , item.label | concatByDelimiter(",")}}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Статья КРФоАп</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="docsProt.stotvId" clearable filterable :disabled="!docsProt.dateNar" @on-change="store, fillFactSved">
                        <Option class=" " v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value , item.label | concatByDelimiter(",")}}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Фактические сведения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <AutoComplete
                        v-model="docsProt.factSved"
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
              <div class="adm-form__item">
                <small class="adm-form__label">Доп. сведения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" v-model="docsProt.dopSved" @on-input-change="store"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label"></small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="22">
                    <Checkbox class="amd-checkbox" v-model="docsProt.isRemovedFromEvac" @on-change="store">Признак снятия транспортного средства, посредством которого было совершено нарушение, с эвакуатора</Checkbox>
                  </Col>
                </Row>
              </div>
              <div v-if="docsProt.tlNumber">
                <div class="adm-form__item">
                  <small class="adm-form__label">Номер разрешения такси</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="docsProt.tlNumber" ></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата начала срока действия разрешения такси</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsProt.tlDateBeg" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата окончания срока действия разрешения такси</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsProt.tlDateEnd" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Владелец разрешения такси</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="docsProt.tlLicenseeName" ></Input>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div class="adm-form__item">
                  <small class="adm-form__label">Организация, выдавшая разрешение такси</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="docsProt.tlLicensor" ></Input>
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

  export default {
    name: "FrmEdDocsProtEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardModal: () => import('~/components/wizard/items/WizardModal'),
      MaskedInput: () => import('~/components/shared/MaskedInput'),
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask')
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdDocsProtEditSetCid', current.cid);
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
        let docsProt = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(docsProt)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillPnpaList();

          this.docsProt = docsProt;

          if (funcUtils.isNotEmpty(docsProt.dateNar)) {
            await this.fillStotvSearchInfo();
            await this.fillFactSved();
          }
        }
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdDocsProtEditSetCid', null);
      this.$store.dispatch('frmEdDocsProtEditSetData', null);
    },
    data() {
      return {
        docsProt: null,
        pnpaList: null,
        factSvedList: [],
        stotvSearchInfoList: null,
        listSectionNav: [
          {
            title: "Протокол об АПН",
            name: "head",
          },
          {
            title: "Составил",
            name: "sost",
          },
          {
            title: "Сведения о нарушении",
            name: "nar",
          },
          /*{
            title: "Сведения о рассмотрении",
            name: "rasmr",
          },*/
        ],
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
            date: this.docsProt.dateNar
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

      async changeInspSostKod() {
        if (funcUtils.isNotEmpty(this.docsProt.inspSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: this.docsProt.inspSostKod
            }
          });
          this.clearInspSost();
          let data = JSON.parse(eventResponse.response).data;
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data.getFirst();
            this.docsProt.inspSostId = data.inspId;
            this.docsProt.inspSostKod = data.inspKod;
            this.docsProt.inspSostName = data.inspName;
            this.docsProt.inspSostDolz = data.inspDolz;
            this.docsProt.inspSostRang = data.inspRang;
            this.docsProt.organSostId = data.ogaiId;
            this.docsProt.organSostKod = data.organKod;
            this.docsProt.organSostName = data.ogaiName;
            this.store();
          }
        } else {
          this.clearInspSost();
        }
      },
      async changeOrganSostKod() {
        if (funcUtils.isNotEmpty(this.docsProt.organSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: this.docsProt.organSostKod
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
        this.docsProt.stotvId = null;
        if (funcUtils.isNotEmpty(this.docsProt.dateNar)) {
          this.fillStotvSearchInfo();
        }

        this.store();
      },
      changeFIO() {
        let fioLength = 0;
        let fioArr = this.docsProt.inspSostName.split(' ');
        this.docsProt.inspSostName = '';
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0:
              {
                this.docsProt.inspSostName += item;
                break;
              }
              case 1:
              {
                this.docsProt.inspSostName += ' ' + item;
                break;
              }
              case 2:
              {
                this.docsProt.inspSostName += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.clearInspSostKod();
      },

      onSispClick(data) {
        this.docsProt.inspSostId = data.inspId;
        this.docsProt.inspSostKod = data.inspKod;
        this.docsProt.inspSostName = data.inspName;
        this.docsProt.inspSostDolz = data.inspDolz;
        this.docsProt.inspSostRang = data.inspRang;
        this.docsProt.organSostId = data.ogaiId;
        this.docsProt.organSostKod = data.organKod;
        this.docsProt.organSostName = data.ogaiName;
        this.dolzModal.visible = false;
        this.dolzModal.sispList = null;
        this.store();
      },
      onGibddClick(data) {
        this.docsProt.organSostId = data.ID;
        this.docsProt.organSostKod = data.ORGAN_KOD;
        this.docsProt.organSostName = data.ORGAN_NAME;
        this.organModal.gibddList = null;
        this.organModal.visible = false;
        this.store();
      },

      clearInspSostKod() {
        this.docsProt.inspSostId = null;
        this.docsProt.inspSostKod = null;
        this.store();
      },
      clearInspSost() {
        this.docsProt.inspSostId = null;
        this.docsProt.inspSostKod = null;
        this.docsProt.inspSostName = null;
        this.docsProt.inspSostDolz = null;
        this.docsProt.inspSostRang = null;
        this.store();
      },
      clearOrganSost() {
        this.docsProt.organSostId = null;
        this.docsProt.organSostKod = null;
        this.docsProt.organSostName = null;
        this.store();
      },
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.docsProt
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


