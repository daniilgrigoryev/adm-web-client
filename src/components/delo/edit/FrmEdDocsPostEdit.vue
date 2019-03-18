<template>
  <div v-if="docsPost" class="wmax1280 mx-auto">
    <!-- данные по делу  -->

    <div class="amd-title amd-title--sticky px36 py24 bg-white-light">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getPrev" type="text" style="outline: 0!important;" class="py0 px0 mr18 bg-transparent-on-hover" title="редактирование постановления">
            <Icon type="ios-arrow-dropleft" class="bg-whte color-gray-light color-blue-on-hover transition" :size="35" />
          </Button>
          <b class="adm-text-big color-dark-lighter">Постановление по делу</b>
        </div>
        <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>
    </div>

    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>

    <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>

    <div class="adm-form bg-white">
      <div class="adm-form__container my6 py24 px36">
        <h2 class="adm-text-big color-dark-light edit-form__header">Постановление по делу № {{ docsPost.docN }} от {{ docsPost.dateSost | formatDateTime('DD.MM.YYYY HH:mm') }}</h2>
        <Row>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Постановление №</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="16">
                    <Input class="adm-input adm-input--regular" readonly :value="docsPost.docN"></Input>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Дата и Время вынесения</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="16">
                    <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="docsPost.dateSost" format="dd-MM-yyyy HH:mm" @on-change="changeDateNar" placeholder="Select date"></DatePicker>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form bg-white">
      <div class="adm-form__container my6 py24 px36">
        <h2 class="adm-text-big color-dark-light edit-form__header">Составил</h2>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Должносное лицо</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
              <!-- TODO -->
                <Input class="adm-input adm-input--regular" readonly :value="docsPost.inspSostName + ' ' + docsPost.inspSostRang" ></Input>
              <!-- ENDTODO -->
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Подразделение</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
              <!-- TODO -->
                <Input class="adm-input adm-input--regular" readonly :value="docsPost.organSostName" ></Input>
              <!-- ENDTODO -->
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Место вынесения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="22" :md="22" :lg="22">
                <Input class="adm-input adm-input--regular" disabled v-model="docsPost.placeSost.placeFull" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
              </Col>
              <Col :xs="2" :md="2" :lg="2">
                <Button @click="getPlaceSost" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                  <Icon type="ios-bookmarks-outline" class="bg-whte color-gray-light color-blue-on-hover transition" title="адресный справочник" :size="35" />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
    <div class="adm-form bg-white">
      <div class="adm-form__container my6 py24 px36">
        <h2 class="adm-text-big color-dark-light edit-form__header">Сведения о нарушении</h2>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Дата и Время нарушения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="docsPost.dateSost" format="dd-MM-yyyy HH:mm" @on-change="changeDateNar" placeholder="Select date"></DatePicker>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Место нарушения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="22" :md="22" :lg="22">
                <Input class="adm-input adm-input--regular" disabled v-model="docsPost.placeNar.placeFull" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
              </Col>
              <Col :xs="2" :md="2" :lg="2">
                <Button @click="getPlaceNar" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                  <Icon type="ios-bookmarks-outline" class="bg-whte color-gray-light color-blue-on-hover transition" title="адресный справочник" :size="35" />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Пункт НПА нарушения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="docsPost.pnpaId" clearable filterable @on-change="store">
                  <Option class=" txt-break-word" v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Статья ответственности</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="docsPost.stotvId" clearable filterable :disabled="!docsPost.dateNar" @on-change="store">
                  <Option class=" txt-break-word" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Фактические сведения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
              <!-- TODO -->
                <Input class="adm-input adm-input--regular" v-model="docsPost.factSved" @on-input-change="store"></Input>
              <!-- ENDTODO -->
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">ТС</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
              <!-- TODO -->
                <Input class="adm-input adm-input--regular" v-model="docsPost.vehsName" @on-input-change="store"></Input>
              <!-- ENDTODO -->
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">ЛВОК</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" v-model="docsPost.uchastName" @on-input-change="store"></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Предъявленный документ</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
              <!-- TODO -->
                <Input class="adm-input adm-input--regular" v-model="docsPost.workPlace" @on-input-change="store"></Input>
              <!-- ENDTODO -->
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Место работы</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" v-model="docsPost.workPlace" @on-input-change="store"></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Доп. сведения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" v-model="docsPost.dopSved" @on-input-change="store"></Input>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
        
        
        
        
    <div class="flex-parent flex-parent--center-cross flex-parent--end-main px36 adm-btn-footer--sticky bg-white-light py18">
      <Button @click="getPrev" type="text" class="adm-btn adm-btn-small bg-transparent">Отменить изменения</Button>
      <Button @click="save" type="text" class="adm-btn adm-btn-regular color-blue-base adm-btn-border txt-uppercase">Сохранить</Button>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import WizardModal from "~/components/wizard/items/WizardModal";

  export default {
    name: "FrmEdDocsPostEdit",
    components: {WizardModal},
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdDocsPostEditSetCid', current.cid);
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
        let docsPost = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(docsPost)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillPnpaList();

          this.parseDate(docsPost);
          this.docsPost = docsPost;

          if (funcUtils.isNotEmpty(docsPost.dateNar)) {
            this.fillStotvSearchInfo();
          }
        }
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdDocsPostEditSetCid', null);
      this.$store.dispatch('frmEdDocsPostEditSetData', null);
    },
    data() {
      return {
        docsPost: null,
        pnpaList: null,
        stotvSearchInfoList: null,
        dolzModal: {
          visible: false,
          sispList: null,
          columnsOptions:
            [
              {
                title: 'Нагрудный знак',
                key: 'inspKod',
                minWidth: 120,
                ellipsis: true,
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
                ellipsis: true,
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
        if (visible) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: null
            }
          });
          this.dolzModal.sispList = JSON.parse(eventResponse.response).data;
        } else {
          this.dolzModal.sispList = null;
        }
        this.dolzModal.visible = visible;
      },
      async showOrganModal(visible) {
        if (visible) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: null
            }
          });
          this.organModal.gibddList = JSON.parse(eventResponse.response).data;
        } else {
          this.organModal.gibddList = null;
        }
        this.organModal.visible = visible;
      },

      parseDate(data) {
        data.dateSost = funcUtils.convertNumberToDate(data.dateSost);
        data.dateNar = funcUtils.convertNumberToDate(data.dateNar);
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
            date: this.docsPost.dateNar
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
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.docsPost.inspVozbKod) && express.test(this.docsPost.inspVozbKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: this.docsPost.inspVozbKod
            }
          });
          let data = JSON.parse(eventResponse.response).data;
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data[0];
            this.docsPost.inspVozbId = data.inspId;
            this.docsPost.inspVozbKod = data.inspKod;
            this.docsPost.inspVozbName = data.inspName;
            this.docsPost.inspVozbDolz = data.inspDolz;
            this.docsPost.inspVozbRang = data.inspRang;
            this.docsPost.organVozbId = data.ogaiId;
            this.docsPost.organVozbKod = data.organKod;
            this.docsPost.organVozbName = data.ogaiName;
            this.store();
          } else {
            this.clearInspVozb();
          }
        } else {
          this.clearInspVozb();
        }
      },
      async changeOrganVozbKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.docsPost.organVozbKod) && express.test(this.docsPost.organVozbKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: this.docsPost.organVozbKod
            }
          });
          let gibddList = JSON.parse(eventResponse.response).data;
          if (gibddList.length > 0) {
            this.organModal.visible = true;
            this.organModal.gibddList = gibddList;
          } else {
            this.clearOrganVozb();
          }
        } else {
          this.clearOrganVozb();
        }
      },
      changeDateNar() {
        this.stotvSearchInfoList = null;
        this.docsPost.stotvId = null;
        if (funcUtils.isNotEmpty(this.docsPost.dateNar)) {
          this.fillStotvSearchInfo();
        }

        this.store();
      },
      changeFIO() {
        let fioLength = 0;
        let fioArr = this.docsPost.inspVozbName.split(' ');
        this.docsPost.inspVozbName = '';
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0:
              {
                this.docsPost.inspVozbName += item;
                break;
              }
              case 1:
              {
                this.docsPost.inspVozbName += ' ' + item;
                break;
              }
              case 2:
              {
                this.docsPost.inspVozbName += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.clearInspVozbKod();
      },

      onSispClick(data) {
        this.docsPost.inspVozbId = data.inspId;
        this.docsPost.inspVozbKod = data.inspKod;
        this.docsPost.inspVozbName = data.inspName;
        this.docsPost.inspVozbDolz = data.inspDolz;
        this.docsPost.inspVozbRang = data.inspRang;
        this.docsPost.organVozbId = data.ogaiId;
        this.docsPost.organVozbKod = data.organKod;
        this.docsPost.organVozbName = data.ogaiName;
        this.dolzModal.visible = false;
        this.dolzModal.sispList = null;
        this.store();
      },
      onGibddClick(data) {
        this.docsPost.organVozbId = data.ID;
        this.docsPost.organVozbKod = data.ORGAN_KOD;
        this.docsPost.organVozbName = data.ORGAN_NAME;
        this.organModal.gibddList = null;
        this.organModal.visible = false;
        this.store();
      },

      clearInspVozbKod() {
        this.docsPost.inspVozbId = null;
        this.docsPost.inspVozbKod = null;
        this.store();
      },
      clearInspVozb() {
        this.docsPost.inspVozbId = null;
        this.docsPost.inspVozbKod = null;
        this.docsPost.inspVozbName = null;
        this.docsPost.inspVozbDolz = null;
        this.docsPost.inspVozbRang = null;
        this.store();
      },
      clearOrganVozb() {
        this.docsPost.organVozbId = null;
        this.docsPost.organVozbKod = null;
        this.docsPost.organVozbName = null;
        this.store();
      },
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.docsPost
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
          cid: cid
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
          cid: cid
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

<style scoped lang="scss">
  .chast-title {
    display: flex;
    align-items: center;
    padding: 24px 36px;
  }
  .edit-form__header {
    background-color: #1888CC;
    padding-left: 36px;
    height: 30px;
    color: #fff;
    line-height: 30px;
    border-radius: 4px 4px 0 0;
    margin: -24px -36px 0;
  } 
  .adm-form {
    margin: 20px;
  }
  .adm-form-content{

  }
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
