<template>
  <div v-if="uchastIndivid" class="wmax1280 mx-auto">


    <div class="pt24 px36">
      <div class="flex-parent flex-parent--center-cross">
        <Button @click="getPrev" type="text" style="outline: 0!important;" class="py0 px0 mr18 bg-transparent-on-hover color-dark-lighter color-blue-on-hover transition">
          <div class="flex-parent flex-parent--center-cross">
            <Icon type="ios-arrow-dropleft mr18" class="bg-whte" :size="30" />
            <b class="adm-text-big">В просмотр участника дела</b>
          </div>
        </Button>
      </div>
    </div>
    <div class="pb24 pt18 px36">
      <div class="flex-parent flex-parent--center-cross">
        <a href="#" @click="getPrev" class="delo__headding link color-dark-lighter color-blue-on-hover">
          <span class="adm-h3">Дело №</span>
          <span v-if="delo" class="adm-h2">{{delo.deloN}}</span>
        </a>
        <p class="color-green-base ml24 flex-parent flex-parent--center-cross">
          <Icon type="ios-checkmark-circle-outline color-green-bas mx6" :size="23" /> 
          <span v-if="delo" class="adm-txt-regular line30_letter02">{{delo.stadDeloName}}</span>
        </p>
      </div>
    </div>


    <div class="adm-form bg-white mt0">
      <div class="adm-form__container mt0">
        <h2 class="adm-text-big color-dark-light adm-form__headding">Редактирование Участника дела</h2>
        <div class="adm-form__content py24 px36">
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
                      <DatePickerMask class="adm-input adm-input--regular" v-model="birthdayDate" @change="formatBirthday" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy" stringFormat="DD/MM/YYYY"></DatePickerMask>
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
                  <Input class="adm-input adm-input--regular" disabled v-model="uchastIndivid.individ.address.adrFull" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
                  <Input class="adm-input adm-input--regular" disabled v-model="uchastIndivid.factAddr.adrFull" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
                      <input-mask v-model="uchastIndivid.individ.phone" @onInputChange="store" inputClass="adm-input adm-input--regular" :maskProps="phoneMask" clearable :placeholder="phoneMask.placeholder"></input-mask>
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
    </div>
    <hr class="txt-hr my0">
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
  import DatePickerMask from "~/components/DatePickerMask";

  export default {
    name: "FrmEdUchastFLIndividEdit",
    components: {
      InputMask,
      DatePickerMask
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

          await this.readDelo();
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
        phoneMask: {
          placeholder: ' ',
          mask: '99999999999'
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
        delo: null
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
          this.birthdayDate = birthdayDay + '/' + birthdayYear;
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
