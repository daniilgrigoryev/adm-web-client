<template>
  <aside-template :listSectionNav="[]" title="Редактирование документа" v-if="vuPred">
    <div class="layout-wrap">
      <div class="layout">
        <wizard-modal v-if="ogaiModal.visible" :columnsOptions="ogaiModal.columnsOptions" :data="ogaiModal.ogaiList" @showModal="showOgaiModal" @onRowDbClick="onOgaiClick"></wizard-modal>
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding">Редактирование документа участника</h2>
            <div class="adm-form__content py24 px36">
              <div class="adm-form__item">
                <small class="adm-form__label">Тип документа</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="22">
                      <Select class="adm-input adm-input--regular" placeholder="" v-model="vuPred.docTip" clearable filterable @on-change="store">
                        <Option class="" v-for="item in docTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>
              <Row :gutter="16" type="flex">
                <Col span="14">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Серия номер</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <masked-input inputClass="adm-input adm-input--regular wmin120 wmax180" @onInputChange="store" v-model="vuPred.vuN" :maskProps="maskDocNum"></masked-input>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span="8">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Дата выдачи</small>
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
                    <small class="adm-form__label">Кем выдан</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <!--<Col :xs="4" :md="4" :lg="4">
                          <masked-input inputClass="adm-input adm-input&#45;&#45;regular" v-model="vuPred.ogaiVydKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeOgaiVydKod" ></masked-input>
                        </Col>-->
                        <Col :xs="18" :md="18" :lg="22">
                          <Input class="adm-input adm-input--regular" @on-input-change="store"  v-model="vuPred.ogaiVydName" :value="vuPred.ogaiVydName"></Input>
                        </Col>
                        <Col :xs="2" :md="2" :lg="2">
                          <Button @click="showOgaiModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                            <Icon type="ios-bookmarks-outline" class=" " title="Справочник подразделений" :size="35" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>  
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="14">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Дата задержания</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vuPred.dateZader" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span="8">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Возврата</small>
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
                <Col span="14">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Утилизации</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vuPred.dateUtil" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span="8">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Утраты</small>
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
                <Col span="14">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Статус</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <Select class="adm-input adm-input--regular wmax180" placeholder="" v-model="vuPred.status" clearable filterable @on-change="store">
                            <Option class="" v-for="item in docStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
    name: "FrmEdVuPredEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardModal: () => import('~/components/wizard/items/WizardModal'),
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask'),
      MaskedInput: () => import('~/components/shared/MaskedInput')
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
    computed: {
      maskDocNum(){
        let typeDoc = parseInt(this.vuPred.docTip);
        if(typeDoc == 8 || typeDoc == 2 || typeDoc == 7){
          return {
            regex: '[0-9]+', 
            mask: '99 9999999',
            placeholder: ''
          }
        }else{
           return {
            regex: '[0-9]+', 
            mask: '99 99 999999',
            placeholder: ''
          }
        }
        this.$forceUpdate();
      },
    },
    methods: {
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
        if (funcUtils.isNotEmpty(this.vuPred.ogaiVydKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              ogaiKod: this.vuPred.ogaiVydKod
            }
          });
          this.clearOgai();
          let ogaiList = JSON.parse(eventResponse.response).data;
          if (ogaiList.length > 0) {
            this.ogaiModal.visible = true;
            this.ogaiModal.ogaiList = ogaiList;
          }
        } else {
          this.clearOgai();
        }
      },

      onOgaiClick(data) {
        // this.vuPred.ogaiVydKod = data.OGAI_KOD;
        this.vuPred.ogaiVydName = data.ORGAN_NAME;
        this.ogaiModal.ogaiList = null;
        this.ogaiModal.visible = false;
        this.store();
      },

      clearOgai() {
        // this.vuPred.ogaiVydKod = null;
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

