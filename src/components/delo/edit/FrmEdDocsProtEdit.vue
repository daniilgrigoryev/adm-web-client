<template>
  <div v-if="docsProt" class="wmax1280 mx-auto">
    <!-- данные по делу  -->

    <div class="amd-title amd-title--sticky px36 py24 bg-white-light">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getPrev" type="text" style="outline: 0!important;" class="py0 px0 mr18 bg-transparent-on-hover" title="редактирование постановления">
            <Icon type="ios-arrow-dropleft" class="bg-whte color-gray-light color-blue-on-hover transition" :size="35" />
          </Button>
          <b class="adm-text-big color-dark-lighter">Редактирование протокола</b>
        </div>
        <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>
    </div>

    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>

    <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>

    <div class="adm-form bg-white mt0">
      <div class="adm-form__container mt0">
        <h2 class="adm-text-big color-dark-light adm-form__headding">Протокол об АПН № {{ docsProt.docN }} от {{ docsProt.dateSost | formatDateTime('DD.MM.YYYY HH:mm') }}</h2>
        <div class="adm-form__content py24 px36">
          <Row>
            <Col span="12">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Протокол №</small>
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
                <small class="adm-text-small color-gray-medium adm-form__label">Дата и время составления</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsProt.dateSost" @change="changeDateNar" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="adm-form bg-white">
      <div class="adm-form__container">
        <h2 class="adm-text-big color-dark-light adm-form__headding">Составил</h2>
        <div class="adm-form__content py24 px36">
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Должностное лицо</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" readonly :value="docsProt.inspSostName, docsProt.inspSostRang | concatByDelimiter(',')" ></Input>
                </Col>
                <Col :xs="2" :md="2" :lg="2">
                  <Button @click="showDolzModal(true)" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                    <Icon type="ios-bookmarks-outline" class="bg-whte color-gray-light color-blue-on-hover transition" title="список должностных лиц" :size="35" />
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
                  <Input class="adm-input adm-input--regular" readonly :value="docsProt.organSostName" ></Input>
                </Col>
                <Col :xs="2" :md="2" :lg="2">
                  <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                    <Icon type="ios-bookmarks-outline" class="bg-whte color-gray-light color-blue-on-hover transition" title="список подразделений" :size="35" />
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Место составления</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" disabled v-model="docsProt.placeSost.placeFull"></Input>
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
    </div>
    <div class="adm-form bg-white">
      <div class="adm-form__container">
        <h2 class="adm-text-big color-dark-light adm-form__headding">Сведения о нарушении</h2>
        <div class="adm-form__content py24 px36">
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Дата и время нарушения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsProt.dateSost" @change="changeDateNar" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Место нарушения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" disabled v-model="docsProt.placeNar.placeFull"></Input>
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
                  <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="docsProt.pnpaId" clearable filterable @on-change=
                    "store">
                    <Option class=" txt-break-word" v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value , item.label | concatByDelimiter(",")}}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Статья КРФоАп</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="docsProt.stotvId" clearable filterable :disabled="!docsProt.dateNar" @on-change="store">
                    <Option class=" txt-break-word" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value , item.label | concatByDelimiter(",")}}</Option>
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
                  <Input class="adm-input adm-input--regular" v-model="docsProt.factSved" @on-input-change="store"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Место работы</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" v-model="docsProt.workPlace" @on-input-change="store"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Доп. сведения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" v-model="docsProt.dopSved" @on-input-change="store"></Input>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="adm-form bg-white">
      <div class="adm-form__container">
        <h2 class="adm-text-big color-dark-light adm-form__headding">Сведения о рассмотрении</h2>
        <div class="adm-form__content py24 px36">
					<div class="adm-form__item">
						<small class="adm-text-small color-gray-medium adm-form__label">Дата и время</small>
						<div class="adm-form__item_content">
							<Row :gutter="16" type="flex" align="middle">
								<Col :xs="24" :md="14" :lg="16">
                  <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="docsProt.dateSost" @change="changeDateNar" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
								</Col>
							</Row>
						</div>
					</div>
					<div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Орган рассмотрения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" readonly :value="docsProt.organRasmName" ></Input>
                </Col>
                <Col :xs="2" :md="2" :lg="2">
                  <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                    <Icon type="ios-bookmarks-outline" class="bg-whte color-gray-light color-blue-on-hover transition" title="Список подразделений" :size="35" />
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
					<div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Место рассмотрения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
								<!-- TODO -->
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" disabled v-model="docsProt.placeNar.placeFull"></Input>
                </Col>
                <Col :xs="2" :md="2" :lg="2">
                  <Button @click="getPlaceNar" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                    <Icon type="ios-bookmarks-outline" class="bg-whte color-gray-light color-blue-on-hover transition" title="адресный справочник" :size="35" />
                  </Button>
                </Col>
								<!-- ENDTODO -->
              </Row>
            </div>
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
  import DatePickerMask from "~/components/DatePickerMask";

  export default {
    name: "FrmEdDocsProtEdit",
    components: {
      WizardModal,
      DatePickerMask
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

          this.parseDate(docsProt);
          this.docsProt = docsProt;

          if (funcUtils.isNotEmpty(docsProt.dateNar)) {
            this.fillStotvSearchInfo();
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

      async changeInspSostKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.docsProt.inspSostKod) && express.test(this.docsProt.inspSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: this.docsProt.inspSostKod
            }
          });
          let data = JSON.parse(eventResponse.response).data;
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data[0];
            this.docsProt.inspSostId = data.inspId;
            this.docsProt.inspSostKod = data.inspKod;
            this.docsProt.inspSostName = data.inspName;
            this.docsProt.inspSostDolz = data.inspDolz;
            this.docsProt.inspSostRang = data.inspRang;
            this.docsProt.organSostId = data.ogaiId;
            this.docsProt.organSostKod = data.organKod;
            this.docsProt.organSostName = data.ogaiName;
            this.store();
          } else {
            this.clearInspSost();
          }
        } else {
          this.clearInspSost();
        }
      },
      async changeOrganSostKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.docsProt.organSostKod) && express.test(this.docsProt.organSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: this.docsProt.organSostKod
            }
          });
          let gibddList = JSON.parse(eventResponse.response).data;
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
