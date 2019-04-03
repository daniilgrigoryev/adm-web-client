<template>
  <div v-if="vuVyd" class="wmax940 mx-auto">
    <!-- данные по делу  -->


    <div class="amd-title amd-title--sticky px36 py24 bg-white-light">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getPrev" type="text" style="outline: 0!important;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus color-dark-lighter color-blue-on-hover transition">
            <div class="flex-parent flex-parent--center-cross">
              <Icon type="ios-arrow-dropleft mr18" class="bg-whte" :size="35" />
              <b class="adm-text-big">Назад</b>
            </div>
          </Button>
          <!-- <b class="adm-text-big color-dark-lighter">Редактирование</b> -->
        </div>
        <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../../assets/images/wiki.svg' class="wmax-none">
        </Button> -->
      </div>
    </div>

    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>

    <wizard-modal v-if="ogaiModal.visible" :columnsOptions="ogaiModal.columnsOptions" :data="ogaiModal.ogaiList" @showModal="showOgaiModal" @onRowDbClick="onOgaiClick"></wizard-modal>

    <div class="adm-form bg-white">
      <div class="adm-form__container py6 my6">
        <div class="adm-form__content py24 px36">
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Вид предъявленного документа</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="24">
                  <Select class="adm-input adm-input--regular wmax600" placeholder="" v-model="vuVyd.docTip" clearable filterable @on-change="store">
                    <Option class="txt-break-word" v-for="item in docTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>

          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Предъявленный документ</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vuVyd.vuPredId" clearable filterable @on-change="store">
                    <Option class="wmax360 txt-break-word" v-for="item in vuPredList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>

          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Номер документа</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vuVyd.vuN" ></Input>
                </Col>
              </Row>
            </div>
          </div>

          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Дата выдачи</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vuVyd.dateVyd" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                </Col>
              </Row>
            </div>
          </div>

          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Срок действия</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vuVyd.dateSrok" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                </Col>
              </Row>
            </div>
          </div>

          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Личный номер сотрудника</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" v-model="vuVyd.inspVydKod" @on-input-change="changeInspVydKod" ></Input>
                </Col>
                <Col :xs="2" :md="2" :lg="2">
                  <Button @click="showDolzModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                    <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="35" />
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">ФИО сотрудника</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" v-model="vuVyd.inspVydName" @on-input-change="changeFIO" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Должность сотрудника</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" v-model="vuVyd.inspVydDolz" @on-input-change="clearInspVydKod" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Звание</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" v-model="vuVyd.inspVydRang" @on-input-change="clearInspVydKod" ></Input>
                </Col>
              </Row>
            </div>
          </div>

          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Код подразделения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" v-model="vuVyd.ogaiVydKod" @on-input-change="changeOgaiVydKod" ></Input>
                </Col>
                <Col :xs="2" :md="2" :lg="2">
                  <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                    <Icon type="ios-bookmarks-outline" class=" " title="Справочник подразделений" :size="35" />
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Подразделение</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" v-model="vuVyd.ogaiVydName" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </Col>
              </Row>
            </div>
          </div>

          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Дополнительные сведения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Input class="adm-input adm-input--regular" v-model="vuVyd.remarks" @on-input-change="store" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </Col>
              </Row>
            </div>
          </div>

          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Статус документа</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vuVyd.status" clearable filterable @on-change="store">
                    <Option class="wmax360 txt-break-word" v-for="item in docStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>

          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Дата утилизации документа</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vuVyd.dateUtil" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
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

  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import WizardModal from "~/components/wizard/items/WizardModal";
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";

  export default {
    name: "FrmEdVuVydEdit",
    components: {
      WizardModal,
      DatePickerMask
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdVuVydEditSetCid', current.cid);
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
        let vuVyd = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(vuVyd)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillDocStatusList();
          await this.fillDocTypeList();
          await this.fillVuPredList();

          this.vuVyd = vuVyd;
        }
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdVuVydEditSetCid', null);
      this.$store.dispatch('frmEdVuVydEditSetData', null);
    },
    data() {
      return {
        vuVyd: null,
        docStatusList: null,
        docTypeList: null,
        vuPredList: null,
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
        ogaiModal: {
          visible: false,
          ogaiList: null,
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
        if (visible && funcUtils.isEmpty(this.dolzModal.sispList)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: null
            }
          });
          this.dolzModal.sispList = JSON.parse(eventResponse.response).data;
        }
        this.dolzModal.visible = visible;
      },
      async showOgaiModal(visible) {
        if (visible && funcUtils.isEmpty(this.ogaiModal.ogaiList)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              ogaiKod: null
            }
          });
          let ogaiList = JSON.parse(eventResponse.response).data;
          this.ogaiModal.ogaiList = ogaiList.filter((item) => {
            return funcUtils.isNotEmpty(item.OGAI_KOD);
          });
        }
        this.ogaiModal.visible = visible;
      },

      async fillVuPredList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getVuPredList'
        });
        let vuPredList = [];
        let vuPredDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < vuPredDict.length; i++) {
          let vuPred = vuPredDict[i];
          vuPredList.push({
            label: vuPred.name,
            value: vuPred.id
          });
        }
        this.vuPredList = vuPredList;
      },
      async fillDocStatusList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getDocStatusDict'
        });
        let docStatusList = [];
        let docStatusDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < docStatusDict.length; i++) {
          let docStatus = docStatusDict[i];
          docStatusList.push({
            label: docStatus.STATUS_NAME,
            value: docStatus.STATUS
          });
        }
        this.docStatusList = docStatusList;
      },
      async fillDocTypeList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getDocTypeDict'
        });
        let docTypeList = [];
        let docTypeDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < docTypeDict.length; i++) {
          let docType = docTypeDict[i];
          docTypeList.push({
            label: docType.DOC_TIP_NAME,
            value: docType.DOC_TIP
          });
        }
        this.docTypeList = docTypeList;
      },

      changeFIO() {
        let fioLength = 0;
        let fioArr = this.vuVyd.inspVydName.split(' ');
        this.vuVyd.inspVydName = '';
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0:
              {
                this.vuVyd.inspVydName += item;
                break;
              }
              case 1:
              {
                this.vuVyd.inspVydName += ' ' + item;
                break;
              }
              case 2:
              {
                this.vuVyd.inspVydName += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.clearInspVydKod();
      },
      async changeInspVydKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.vuVyd.inspVydKod) && express.test(this.vuVyd.inspVydKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: this.vuVyd.inspVydKod
            }
          });
          let data = JSON.parse(eventResponse.response).data;
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data[0];
            this.vuVyd.inspVydId = data.inspId;
            this.vuVyd.inspVydKod = data.inspKod;
            this.vuVyd.inspVydName = data.inspName;
            this.vuVyd.inspVydDolz = data.inspDolz;
            this.vuVyd.inspVydRang = data.inspRang;
            this.store();
          } else {
            this.clearInspVyd();
          }
        } else {
          this.clearInspVyd();
        }
      },
      async changeOgaiVydKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.vuVyd.ogaiVydKod) && express.test(this.vuVyd.ogaiVydKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              ogaiKod: this.vuVyd.ogaiVydKod
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

      onSispClick(data) {
        this.vuVyd.inspVydId = data.inspId;
        this.vuVyd.inspVydKod = data.inspKod;
        this.vuVyd.inspVydName = data.inspName;
        this.vuVyd.inspVydDolz = data.inspDolz;
        this.vuVyd.inspVydRang = data.inspRang;
        this.dolzModal.visible = false;
        this.dolzModal.sispList = null;
        this.store();
      },
      onOgaiClick(data) {
        this.vuVyd.ogaiVydKod = data.OGAI_KOD;
        this.vuVyd.ogaiVydName = data.ORGAN_NAME;
        this.ogaiModal.ogaiList = null;
        this.ogaiModal.visible = false;
        this.store();
      },

      clearInspVydKod() {
        this.vuVyd.inspVydId = null;
        this.vuVyd.inspVydKod = null;
        this.store();
      },
      clearInspVyd() {
        this.vuVyd.inspVydId = null;
        this.vuVyd.inspVydKod = null;
        this.vuVyd.inspVydName = null;
        this.vuVyd.inspVydDolz = null;
        this.vuVyd.inspVydRang = null;
        this.store();
      },
      clearOgai() {
        this.vuVyd.ogaiVydKod = null;
        this.vuVyd.ogaiVydName = null;
        this.store();
      },
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.vuVyd
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
  .adm-form-content{
    // border: 1px solid #000;
  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    // min-height: 90px;
    // outline: 1px solid;
  }
  .adm-form__label{
    padding: 0;
    min-width: 210px;
    padding-right: 12px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
