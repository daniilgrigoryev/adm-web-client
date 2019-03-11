<template>
  <div v-if="uchastOrganization">
    <Button @click="getPrev" type="text">Назад</Button>
    <Button @click="save" type="text">Сохранить</Button>

    <div class="adm-form">

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">АМТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastOrganization.vehsId" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in vehsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Вид участника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastOrganization.uchastVid" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in vidList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Тип участника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastOrganization.uchastTip" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in tipList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">СНИЛС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="uchastOrganization.snils" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Ранг</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastOrganization.rang" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Адрес регистрации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" disabled v-model="uchastOrganization.organization.address.adrFull" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="getregAddr" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Адресный справочник</a>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Тип ЮР лица</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastOrganization.organization.tip" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in tipULList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Фактический адрес</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" disabled v-model="uchastOrganization.factAddr.adrFull" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="getFactAddr" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Адресный справочник</a>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Название</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastOrganization.organization.name" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ОКПО</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastOrganization.organization.okpo" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ИНН</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastOrganization.organization.inn" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Кем выдан ИНН</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastOrganization.organization.innKemVydan" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">КПП</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastOrganization.organization.kpp" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ОГРН</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastOrganization.organization.ogrn" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата регистрации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="uchastOrganization.organization.dateReg" format="dd-MM-yyyy" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Телефон</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastOrganization.organization.phone" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Признак офиса</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Checkbox v-model="uchastOrganization.organization.priznOffice" @on-change="store"></Checkbox>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Форма собственности</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastOrganization.organization.fsobstKod" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in formSobstvList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ОПФ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastOrganization.organization.orgformKod" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in orgFormList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Ведомство</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastOrganization.organization.vedomstvoId" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in vedomsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import InputMask from "../../InputMask";

  export default {
    name: "FrmEdUchastFLOrganizationEdit",
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
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
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
        }
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdUchastFLOrganizationEditSetCid', null);
      this.$store.dispatch('frmEdUchastFLOrganizationEditSetData', null);
    },
    data() {
      return {
        maskInputBirthday: {
          alias: "datetime",
          inputFormat: 'dd/mm/yyyy'
        },
        uchastOrganization: null,
        vehsList: null,
        tipList: null,
        vidList: null,
        formSobstvList: null,
        orgFormList: null,
        vedomsList: null,
        tipULList: null,
      }
    },
    methods: {
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
          cid: cid
        });
      },
      async getregAddr() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getRegAddrCID'
        });
        let cid = JSON.parse(eventResponse.response).data;

        formStack.toNext({
          module: this.$store.state.addressViewEdit,
          vm: this,
          notRemoved: false,
          withCreate: false,
          cid: cid
        });
      },
      store() {
        let copy = JSON.parse(JSON.stringify(this.uchastOrganization));
        copy.organization.priznOffice = copy.organization.priznOffice ? '+' : '-';

        RequestApi.prepareData({
          method: 'store',
          params: {
            data: copy
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

<style scoped>

</style>
