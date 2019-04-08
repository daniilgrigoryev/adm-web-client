<template>
  <aside-template title="Редактирование Извещения">
    <div class="layout-wrap">
      <div class="layout">
        <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">Редактирование Извещения</h2>
            <div class="adm-form__content">
              <Row>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Номер извещения</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="14" :lg="24">
                          <masked-input @onInputChange="store" v-model="dataAdvice.docN" inputClass="adm-input adm-input--regular" :maskProps="{placeholder: '', regex: '[0-9\/\-]+'}" clearable></masked-input>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Дата рассмотрения</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <DatePickerMask v-model="dataAdvice.dateRasm" @change="" class="adm-input adm-input--regular"  clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Дата составления</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <DatePickerMask v-model="dataAdvice.dateSost" @change="" class="adm-input adm-input--regular"  clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Дата вручения</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <DatePickerMask v-model="dataAdvice.dateUved" @change="" class="adm-input adm-input--regular"  clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div> 
          </div>
          <div class="adm-form__container">
            <h2 class="adm-form__headding">Должностное лицо составившее Извещение</h2>
              <div class="adm-form__content">

                <div class="adm-form__item">
                  <small class="adm-form__label">Должностное лицо</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="4" :md="4" :lg="4">
                        <Input class="adm-input adm-input--regular" v-model="dataAdvice.inspSostKod" @on-input-change="changeInspSostKod" ></Input>
                      </Col>
                      <Col :xs="18" :md="18" :lg="18">
                        <Input class="adm-input adm-input--regular" disabled v-model="dataAdvice.inspSostName" @on-input-change="changeFIO" ></Input>
                      </Col>
                      <Col :xs="2" :md="2" :lg="2">
                        <Button @click="showDolzModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class="bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                          <Icon type="ios-bookmarks-outline" title="Список должностных лиц" :size="30" />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>

                <!-- <div class="adm-form__item">
                  <small class="adm-form__label">Подразделение - Код подразделения</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="22" :md="22" :lg="22">
                        <Input class="adm-input adm-input--regular" readonly :value="docsPost.organSostName" ></Input>
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
                  <small class="adm-form__label">Место составления, индекс</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="22" :md="22" :lg="22">
                        <Input class="adm-input adm-input--regular" disabled v-model="docsPost.placeSost.placeFull"></Input>
                      </Col>
                      <Col :xs="2" :md="2" :lg="2">
                        <Button @click="getPlaceSost" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                          <Icon type="ios-bookmarks-outline" class=" " title="адресный справочник" :size="35" />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div> -->

                <div class="adm-form__item">
                  <small class="adm-form__label">Статья основание</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="dataAdvice.stotvId" clearable filterable  @on-change="store">
                          <Option class=" txt-break-word" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                        </Select>
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
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import WizardModal from "~/components/wizard/items/WizardModal";
  import AsideTemplate from "~/components/templates/AsideTemplate.vue";
  import MaskedInput from "../../shared/MaskedInput";
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";

  export default {
    name: "DlgAdviceEdit",
    components: {
      AsideTemplate,
      WizardModal,
      MaskedInput,
      DatePickerMask
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('dlgAdviceEditSetCid', current.cid);
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
        let dataAdvice = JSON.parse(eventResponse.response).data;
        
        if (funcUtils.isEmpty(dataAdvice)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        }else{
          this.dataAdvice = dataAdvice;

          this.fillStotvSearchInfo();
        }

      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('dlgAdviceEditSetCid', null);
      this.$store.dispatch('dlgAdviceEditSetData', null);
    },
    data() {
      return {
        stotvSearchInfoList: null,
        dataAdvice: null,
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
      }
    },
    methods: {
      async fillStotvSearchInfo() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getStotvSearchInfo',
          params: {
            date: this.dataAdvice.dateNar
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
      onSispClick(data) {
        this.dataAdvice.inspSostId = data.inspId;
        this.dataAdvice.inspSostKod = data.inspKod;
        this.dataAdvice.inspSostName = data.inspName;
        this.dataAdvice.inspSostDolz = data.inspDolz;
        this.dataAdvice.inspSostRang = data.inspRang;
        this.dataAdvice.organSostId = data.ogaiId;
        this.dataAdvice.organSostKod = data.organKod;
        this.dataAdvice.organSostName = data.ogaiName;
        this.dolzModal.visible = false;
        this.dolzModal.sispList = null;
        this.store();
      },
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
      // store() {
      //   let copy = JSON.parse(JSON.stringify(this.dataAdvice));
      //   RequestApi.prepareData({
      //     method: 'store',
      //     params: {
      //       data: copy
      //     }
      //   });
      // },
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.dataAdvice
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
