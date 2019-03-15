<template>
  <div v-if="uchastOrganization" class="wmax1280 mx-auto">

    <div class="chast-title">
      <div class="flex-parent flex-parent--center-cross">
        <a href="#" @click="getPrev" class="delo__headding link color-dark-lighter color-blue-light-on-hover">
          <span class="adm-h3">Дело №</span>
          <span class="adm-h1">377</span>
        </a>
        <p class="color-green-base ml24 flex-parent flex-parent--center-cross">
          <Icon type="ios-checkmark-circle-outline color-green-bas mx6" :size="23" /> 
          <span class="adm-txt-regular line30_letter02">Исполнение</span>
        </p>
      </div>
    </div>
    <div class="adm-form bg-white">
      <div class="adm-form__container my6 py24 px36">
        <h2 class="adm-text-big color-dark-light edit-form__header">Редактирование Участника дела</h2>
        <Row>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Вид участника</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="uchastOrganization.uchastVid" clearable filterable @on-change="store">
                      <Option class="txt-break-word" v-for="item in vidList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Тип участника</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="uchastOrganization.uchastTip" clearable filterable @on-change="store">
                      <Option class="txt-break-word" v-for="item in tipList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Наименование</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastOrganization.organization.name" ></Input>
              </Col>
            </Row>
          </div>
        </div>
        <Row>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">ИНН</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastOrganization.organization.inn" ></Input>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">КПП</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular " @on-input-change="store" v-model="uchastOrganization.organization.kpp" ></Input>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Дата регистрации</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="date" v-model="uchastOrganization.organization.dateReg" format="dd-MM-yyyy" @on-change="store" placeholder=""></DatePicker>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">ОГРН</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular " @on-input-change="store" v-model="uchastOrganization.organization.ogrn" ></Input>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Адрес регистрации</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="22" :md="22" :lg="22">
                <Input class="adm-input adm-input--regular" disabled v-model="uchastOrganization.organization.address.adrFull" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
              </Col>
              <Col :xs="2" :md="2" :lg="2">
                <Button @click="getRegAddr" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                  <Icon type="ios-bookmarks-outline" class="bg-whte color-gray-light color-blue-on-hover transition" title="адресный справочник" :size="35" />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Фактический адрес</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="22" :md="22" :lg="22">
                <Input class="adm-input adm-input--regular" disabled v-model="uchastOrganization.factAddr.adrFull" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
              </Col>
              <Col :xs="2" :md="2" :lg="2">
                <Button @click="getFactAddr" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                  <Icon type="ios-bookmarks-outline" class="bg-whte color-gray-light color-blue-on-hover transition" title="адресный справочник" :size="35" />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <Row>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Телефон</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastOrganization.organization.phone" ></Input>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">АМТС</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="uchastOrganization.vehsId" clearable filterable @on-change="store">
                      <Option class="txt-break-word" v-for="item in vehsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <hr class="txt-hr" style="margin: 70px 0px 20px;">
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
