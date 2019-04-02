<template>
  <div v-if="vuPred" class="wmax940 mx-auto">
    <!-- данные по делу  -->

    <div class="amd-title amd-title--sticky px36 py24 bg-white-light">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getPrev" type="text" style="outline: 0!important;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus" title="вернуться назад">
            <Icon type="ios-arrow-dropleft" class=" " :size="35" />
          </Button>
          <b class="adm-text-big color-dark-lighter">Редактирование документа участника</b>
        </div>
        <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>
    </div>


    <wizard-modal v-if="ogaiModal.visible" :columnsOptions="ogaiModal.columnsOptions" :data="ogaiModal.ogaiList" @showModal="showOgaiModal" @onRowDbClick="onOgaiClick"></wizard-modal>

    <div class="adm-form bg-white">
      <div class="adm-form__container my6">
        <h2 class="adm-text-big color-dark-light adm-form__headding">Редактирование документа участника</h2>
        <div class="adm-form__content py24 px36">
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Тип документа</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Select class="adm-input adm-input--regular" placeholder="" v-model="vuPred.docTip" clearable filterable @on-change="store">
                    <Option class="txt-break-word" v-for="item in docTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>
          <Row :gutter="16" type="flex">
            <Col span="15">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Номер</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <!-- <Input class="adm-input adm-input--regular wmin120 wmax180" @on-input-change="store" v-model="vuPred.vuN" ></Input> -->
                      <masked-input inputClass="adm-input adm-input--regular wmin120 wmax180" @onInputChange="store" v-model="vuPred.vuN" :maskProps="{regex: '[a-zA-Zа-яА-Я0-9]+', casing: 'upper', placeholder: ''}"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span="9">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Дата выдачи</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vuPred.dateVyd" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>          
          <Row :gutter="16">
            <Col span="24">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Кем выдан</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vuPred.ogaiVydName"></Input>
                    </Col>
                  </Row>
                </div>
              </div>  
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="15">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Дата задержания</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vuPred.dateZader" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span="9">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Возврата</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vuPred.dateVozv" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="15">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Утилизации</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vuPred.dateUtil" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span="9">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Утраты</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vuPred.dateUtrat" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>


          <Row :gutter="16">
            <Col span="12">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Статус</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Select class="adm-input adm-input--regular wmax180" placeholder="" v-model="vuPred.status" clearable filterable @on-change="store">
                        <Option class="txt-break-word" v-for="item in docStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

          </Row>
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
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";
  import MaskedInput from "../../shared/MaskedInput";

  export default {
    name: "FrmEdVuPredEdit",
    components: {
      WizardModal,
      DatePickerMask,
      MaskedInput
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdVuPredEditSetCid', current.cid);
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
        let vuPred = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(vuPred)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillDocStatusList();
          await this.fillDocTypeList();

          this.vuPred = vuPred;
        }
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdVuPredEditSetCid', null);
      this.$store.dispatch('frmEdVuPredEditSetData', null);
    },
    data() {
      return {
        vuPred: null,
        docStatusList: null,
        docTypeList: null,
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

      async changeOgaiVydKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.vuPred.ogaiVydKod) && express.test(this.vuPred.ogaiVydKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              ogaiKod: this.vuPred.ogaiVydKod
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

      onOgaiClick(data) {
        this.vuPred.ogaiVydKod = data.OGAI_KOD;
        this.vuPred.ogaiVydName = data.ORGAN_NAME;
        this.ogaiModal.ogaiList = null;
        this.ogaiModal.visible = false;
        this.store();
      },

      clearOgai() {
        this.vuPred.ogaiVydKod = null;
        this.vuPred.ogaiVydName = null;
        this.store();
      },
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.vuPred
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

  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 12px;
    // outline: 1px solid red;
    padding-bottom: 12px;
    min-height: 65px;
  }
  .adm-form__label{
    padding: 0;
    padding-right: 12px;
    min-width: 130px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
