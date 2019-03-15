<template>
  <div v-if="uchastIndivid" class="wmax1280 mx-auto">
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
      <div class="adm-form__container py24 px36">
        <h2 class="adm-text-big color-dark-light edit-form__header">Редактирование Участника дела</h2>
        <Row>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Тип участника</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="uchastIndivid.uchastTip" clearable filterable @on-change="store">
                      <Option class="txt-break-word" v-for="item in tipList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
            
          </Col>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Статус</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular" readonly v-model="uchastIndivid.uchastStatusName"></Input>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Фамилия</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular " @on-input-change="store" v-model="uchastIndivid.individ.firstName" ></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Имя</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular " @on-input-change="store" v-model="uchastIndivid.individ.secondName" ></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Отчество</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastIndivid.individ.thirdName" ></Input>
              </Col>
            </Row>
          </div>
        </div>
        <Row>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Дата рождения</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <DatePicker class="adm-input adm-input--regular" type="datetime" v-model="birthdayDate" format="dd/MM/yyyy" @on-change="formatBirthday" placeholder></DatePicker>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Место рождения</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="uchastIndivid.individ.birthMestoKod" clearable filterable @on-change="store">
                      <Option class="txt-break-word" v-for="item in birthMestoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Пол</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="uchastIndivid.individ.sex" clearable filterable @on-change="store">
                      <Option class="txt-break-word" v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Гражданство</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="uchastIndivid.individ.gragdKod" clearable filterable @on-change="store">
                      <Option class="txt-break-word" v-for="item in gragdanstvoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
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
                <Input class="adm-input adm-input--regular" disabled v-model="uchastIndivid.individ.address.adrFull" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
                <Input class="adm-input adm-input--regular" disabled v-model="uchastIndivid.factAddr.adrFull" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
                    <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastIndivid.individ.phone" ></Input>
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
                    <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="uchastIndivid.vehsId" clearable filterable @on-change="store">
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
    name: "FrmEdUchastFLIndividEdit",
    components: {
      InputMask
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdUchastFLIndividEditSetCid', current.cid);
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
        let uchastIndivid = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(uchastIndivid)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillVehsList();
          await this.fillTipList();
          await this.fillBirthMestoList();
          await this.fillGragdanstvoList();

          this.uchastIndivid = uchastIndivid;
          this.parseBirthday(uchastIndivid);
        }
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdUchastFLIndividEditSetCid', null);
      this.$store.dispatch('frmEdUchastFLIndividEditSetData', null);
    },
    data() {
      return {
        maskInputBirthday: {
          alias: "datetime",
          inputFormat: 'dd/mm/yyyy',
          placeholder: '__/__/____'
        },
        birthdayDate: null,
        uchastIndivid: null,
        vehsList: null,
        tipList: null,
        birthMestoList: null,
        gragdanstvoList: null,
        sexList: [
          {
            label: 'Мужской',
            value: 'М'
          },
          {
            label: 'Женский',
            value: 'Ж'
          },
        ],
      }
    },
    methods: {
      isNotEmptyField(field) {
        if (typeof field === 'string') {
          return funcUtils.isNotEmpty(field) && field.length > 0;
        }
        return funcUtils.isNotEmpty(field);
      },
      parseBirthday(uchastIndivid) {
        let birthdayDay = uchastIndivid.individ.birthdayDay;
        let birthdayYear = uchastIndivid.individ.birthdayYear;
        if (funcUtils.isNotEmpty(birthdayDay) && funcUtils.isNotEmpty(birthdayYear)) {
          let date = funcUtils.formatDateTime(birthdayDay + '/' + birthdayYear, 'DD-MM-YYYY');
          if (date.isValid()) {
            this.birthdayDate = date.toDate();
          }
        }
      },
      formatBirthday(e) {
        if (funcUtils.isNotEmpty(e) && e.length > 0) {
          let dateSplit = e.split('/');
          this.uchastIndivid.individ.birthdayDay = dateSplit[0] + '/' + dateSplit[1];
          this.uchastIndivid.individ.birthdayYear = dateSplit[2];
        } else {
          this.uchastIndivid.individ.birthdayDay = null;
          this.uchastIndivid.individ.birthdayYear = null;
        }
        this.store();
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
          method: 'getTipFLDictionary'
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
      async fillBirthMestoList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getBirthMestoDictionary'
        });
        let birthMestoList = [];
        let birthMestoDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < birthMestoDict.length; i++) {
          let birthMesto = birthMestoDict[i];
          birthMestoList.push({
            label: birthMesto.BIRTH_MESTO,
            value: birthMesto.BIRTH_MESTO_KOD
          });
        }
        this.birthMestoList = birthMestoList;
      },
      async fillGragdanstvoList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getGragdanstvoDictionary'
        });
        let gragdanstvoList = [];
        let gragdanstvoDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < gragdanstvoDict.length; i++) {
          let gragdanstvo = gragdanstvoDict[i];
          gragdanstvoList.push({
            label: gragdanstvo.GRAGD_NAME,
            value: gragdanstvo.GRAGD_KOD
          });
        }
        this.gragdanstvoList = gragdanstvoList;
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
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.uchastIndivid
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
