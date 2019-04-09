
<template>
  <aside-template title="Редактирование Участника" v-if="uchastIndivid">
    <div class="layout-wrap">
      <div class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding">Редактирование Участника дела</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-form__label">Тип участника</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Select class="adm-input adm-input--regular wmin180 wmax240" placeholder="" v-model="uchastIndivid.uchastTip" clearable filterable @on-change="store">
                        <Option class="txt-break-word" v-for="item in tipList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Статус</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular wmax240" readonly v-model="uchastIndivid.uchastStatusName"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Фамилия</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular wmax240" @onInputChange="store" v-model="uchastIndivid.individ.firstName" :maskProps="maskInputFIO" :maxlength="80"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Имя</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular wmax240" @onInputChange="store" v-model="uchastIndivid.individ.secondName" :maskProps="maskInputFIO" :maxlength="25"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Отчество</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular wmax240"  @onInputChange="store" v-model="uchastIndivid.individ.thirdName"  :maskProps="maskInputFIO" :maxlength="25"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Дата рождения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmax240" v-model="birthdayDate" @change="formatBirthday" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy" stringFormat="DD/MM/YYYY"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Место рождения</small>
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
              <div class="adm-form__item">
                <small class="adm-form__label">Пол</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Select class="adm-input adm-input--regular wmin180 wmax240" placeholder="" v-model="uchastIndivid.individ.sex" clearable filterable @on-change="store">
                        <Option class="txt-break-word" v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Гражданство</small>
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
              <div class="adm-form__item">
                <small class="adm-form__label">Адрес регистрации</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="22" :md="22" :lg="22">
                      <Input class="adm-input adm-input--regular" disabled v-model="uchastIndivid.individ.address.adrFull" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="getRegAddr" type="text" class="py0 px0 mr18 bg-transparent-on-hover">
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
                      <Input class="adm-input adm-input--regular" disabled v-model="uchastIndivid.factAddr.adrFull" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="getFactAddr" type="text" class="py0 px0 mr18 bg-transparent-on-hover">
                        <Icon type="ios-bookmarks-outline" class=" " title="адресный справочник" :size="30" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Телефон</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <masked-input v-model="uchastIndivid.individ.phone" @onInputChange="store" inputClass="adm-input adm-input--regular wmax240" :maskProps="phoneMask" clearable :placeholder="phoneMask.placeholder"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">АМТС</small>
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
  import AsideTemplate from "~/components/templates/AsideTemplate.vue";
  import MaskedInput from "../../shared/MaskedInput";
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";

  export default {
    name: "FrmEdUchastFLIndividEdit",
    components: {
      AsideTemplate,
      MaskedInput,
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
          placeholder: '',
          mask: '99999999999'
        },
        birthdayDate: null,
        uchastIndivid: null,
        vehsList: null,
        tipList: null,
        birthMestoList: null,
        gragdanstvoList: null,
        maskInputFIO: {
          regex: '[а-яА-ЯёЁ]+',
          casing: 'upper',
          placeholder: ''
        },
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
</style>
