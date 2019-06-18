
<template>
  <aside-template :listSectionNav="[]" title="просмотр участника дела" v-if="uchastOrganization">
    <div class="layout-wrap">
      <div class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding">Редактирование Участника дела</h2>
            <div class="adm-form__content">
              <Row>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Вид участника</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <Input class="adm-input adm-input--regular" readonly v-model="uchastOrganization.uchastVidName"></Input>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Тип участника</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="" v-model="uchastOrganization.uchastTip" clearable filterable @on-change="store">
                            <Option class="" v-for="item in tipList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </CustomSelect>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
              <div class="adm-form__item">
                <small class="adm-form__label">Наименование</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular" @onInputChange="store" v-model="uchastOrganization.organization.name" :maskProps="{casing: 'upper', regex: '[а-яА-Я0-9 .-]+', placeholder: ''}" :maxlength="100"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <Row>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">ИНН</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <masked-input inputClass="adm-input adm-input--regular" @onInputChange="store" v-model="uchastOrganization.organization.inn" :maskProps="{regex: '[0-9]+', casing: 'upper', placeholder: ''}" :maxlength="15"></masked-input>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">КПП</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <masked-input inputClass="adm-input adm-input--regular" @onInputChange="store" v-model="uchastOrganization.organization.kpp" :maskProps="{regex: '[0-9]+', casing: 'upper', placeholder: ''}" :maxlength="10"></masked-input>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Дата регистрации</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="uchastOrganization.organization.dateReg" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">ОГРН</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <masked-input inputClass="adm-input adm-input--regular" @onInputChange="store" v-model="uchastOrganization.organization.ogrn" :maskProps="{regex: '[0-9]+', casing: 'upper', placeholder: ''}" :maxlength="13"></masked-input>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
              <div class="adm-form__item">
                <small class="adm-form__label">Адрес регистрации</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" disabled v-model="uchastOrganization.organization.address.adrFull" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="getRegAddr" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                        <Icon type="ios-bookmarks-outline" class=" " title="адресный справочник" :size="30" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Фактический адрес</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" disabled v-model="uchastOrganization.factAddr.adrFull" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="getFactAddr" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                        <Icon type="ios-bookmarks-outline" class=" " title="адресный справочник" :size="30" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <Row>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">Телефон</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <masked-input v-model="uchastOrganization.organization.phone" @onInputChange="store" inputClass="adm-input adm-input--regular" :maskProps="phoneMask" clearable :placeholder="phoneMask.placeholder"></masked-input>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span="12">
                  <div class="adm-form__item">
                    <small class="adm-form__label">АМТС</small>
                    <div class="adm-form__item_content">
                      <Row :gutter="16" type="flex" align="middle">
                        <Col :xs="24" :md="24" :lg="24">
                          <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="" v-model="uchastOrganization.vehsId" clearable filterable @on-change="store">
                            <Option class="" v-for="item in vehsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </CustomSelect>
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
    name: "FrmEdUchastFLOrganizationEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdUchastFLOrganizationEditSetCid', current.cid);
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
        let uchastOrganization = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(uchastOrganization)) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errorsModal/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          await this.fillVehsList();
          await this.fillTipList();
          await this.fillVidList();
          await this.fillFormSobstvList();
          await this.fillOrgFormList();
          await this.fillVedomsList();
          await this.fillTipULListList();

          uchastOrganization.organization.priznOffice = uchastOrganization.organization.priznOffice === '+';

          this.uchastOrganization = uchastOrganization;

          await this.readDelo();
        }
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdUchastFLOrganizationEditSetCid', null);
      this.$store.dispatch('frmEdUchastFLOrganizationEditSetData', null);
    },
    data() {
      return {
        uchastOrganization: null,
        vehsList: null,
        tipList: null,
        vidList: null,
        formSobstvList: null,
        orgFormList: null,
        vedomsList: null,
        tipULList: null,
        delo: null,
        maskInputFIO: {
          regex: '[а-яА-ЯёЁ]+',
          casing: 'upper',
          placeholder: ''
        },
        phoneMask: {
          placeholder: '',
          mask: '99999999999'
        },
      }
    },
    methods: {
      async readDelo() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getDeloBody'
        });
        this.delo = JSON.parse(eventResponse.response).data;
      },
      async fillVehsList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getVehs'
        });
        let vehsList = [];
        let vehsDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < vehsDict.length; i++) {
          let vehs = vehsDict[i];
          vehsList.push({
            label: vehs.vehsName,
            value: vehs.id
          });
        }
        this.vehsList = vehsList;
      },
      async fillTipList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getTipULDictionary'
        });
        let tipList = [];
        let tipDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < tipDict.length; i++) {
          let tip = tipDict[i];
          tipList.push({
            label: tip.UCHAST_TIP_NAME,
            value: tip.UCHAST_TIP
          });
        }
        this.tipList = tipList;
      },
      async fillVidList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getVidDictionary'
        });
        let vidList = [];
        let vidDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < vidDict.length; i++) {
          let vid = vidDict[i];
          vidList.push({
            label: vid.UCHAST_VID_NAME,
            value: vid.UCHAST_VID
          });
        }
        this.vidList = vidList;
      },
      async fillFormSobstvList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getFormSobstvDictionary'
        });
        let formSobstvList = [];
        let formSobstvDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < formSobstvDict.length; i++) {
          let formSobstv = formSobstvDict[i];
          formSobstvList.push({
            label: formSobstv.FSOBST_NAME,
            value: formSobstv.FSOBST_KOD
          });
        }
        this.formSobstvList = formSobstvList;
      },
      async fillOrgFormList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getOrgFormDictionary'
        });
        let orgFormList = [];
        let orgFormDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < orgFormDict.length; i++) {
          let orgForm = orgFormDict[i];
          orgFormList.push({
            label: orgForm.ORGFORM_NAME,
            value: orgForm.ORGFORM_KOD
          });
        }
        this.orgFormList = orgFormList;
      },
      async fillVedomsList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getVedomstDictionary'
        });
        let vedomsList = [];
        let vedomsDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < vedomsDict.length; i++) {
          let vedoms = vedomsDict[i];
          vedomsList.push({
            label: vedoms.VED_NAME,
            value: vedoms.VED_ID
          });
        }
        this.vedomsList = vedomsList;
      },
      async fillTipULListList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getUlTipDictionary'
        });
        let tipULList = [];
        let tipULDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < tipULDict.length; i++) {
          let tipUL = tipULDict[i];
          tipULList.push({
            label: tipUL.TIP_UL_NAME,
            value: tipUL.TIP_UL_NAME
          });
        }
        this.tipULList = tipULList;
      },
      async getFactAddr() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getFactAddrCID'
        });
        let cid = JSON.parse(eventResponse.response).data;

        formStack.toNext({
          module: this.$store.state.addressViewEdit,
          vm: this,
          notRemoved: false,
          withCreate: false,
          params: {
            title: 'Редактирование Участника'
          },
          cid: cid
        });
      },
      async getRegAddr() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getRegAddrCID'
        });
        let cid = JSON.parse(eventResponse.response).data;

        formStack.toNext({
          module: this.$store.state.addressViewEdit,
          vm: this,
          notRemoved: false,
          withCreate: false,
          params: {
            title: 'Редактирование Участника'
          },
          cid: cid
        });
      },
      store() {
        let copy = JSON.parse(JSON.stringify(this.uchastOrganization));
        copy.organization.priznOffice = copy.organization.priznOffice ? '+' : '-';

        return RequestApi.prepareData({
          method: 'store',
          params: {
            data: copy
          }
        });
      },
      async save() {
        await this.store();
        let eventResponse = await RequestApi.prepareData({
          method: 'update'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errorsModal/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
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
          this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
        }
      },
    },
  }
</script>

