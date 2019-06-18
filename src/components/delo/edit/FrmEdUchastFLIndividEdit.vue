
<template>
  <aside-template :listSectionNav="[]" title="Редактирование Участника" v-if="uchastIndivid">
    <div class="layout-wrap">
      <div class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding">Редактирование Участника дела</h2>
            <div class="adm-form__content">
              <div v-if="tipList && tipList.length > 0" class="adm-form__item">
                <small class="adm-form__label">Тип участника</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmin180 wmax240" placeholder="" v-model="uchastIndivid.uchastTip" clearable filterable @on-change="store">
                        <Option class="" v-for="item in tipList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Статус</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular wmax360" readonly v-model="uchastIndivid.uchastStatusName"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Фамилия</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular wmax360" @onInputChange="changeFIO('firstName')" v-model="uchastIndivid.individ.firstName" :maskProps="{regex: '([а-яА-ЯёЁ]+[ -]){0,}', casing: 'upper', placeholder: ''}" :maxlength="80"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Имя</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular wmax360" @onInputChange="changeFIO('secondName')" v-model="uchastIndivid.individ.secondName" :maskProps="{regex: '([а-яА-ЯёЁ]+[ -]){0,}', casing: 'upper', placeholder: ''}" :maxlength="25"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Отчество</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular wmax360"  @onInputChange="changeFIO('thirdName')" v-model="uchastIndivid.individ.thirdName"  :maskProps="{regex: '([а-яА-ЯёЁ]+[ -]){0,}', casing: 'upper', placeholder: ''}" :maxlength="25"></masked-input>
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
                      <AutoComplete
                        v-model="uchastIndivid.individ.birthMesto"
                        :data="birthMestoArray"
                        class="wmin180 adm-input adm-input--regular wmin180"
                        icon="ios-arrow-down"
                        :filter-method="filterBirthMesto"
                        @on-change="changeBirthMesto"
                        @on-select="selectBirthMesto"
                        placeholder=""
                        clearable>
                      </AutoComplete>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Пол</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmin180 wmax240" placeholder="" v-model="uchastIndivid.individ.sex" clearable filterable @on-change="store">
                        <Option class="" v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Гражданство</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="" v-model="uchastIndivid.individ.gragdKod" clearable filterable @on-change="store">
                        <Option class="" v-for="item in gragdanstvoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
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
                      <Input class="adm-input adm-input--regular" disabled v-model="uchastIndivid.factAddr.adrFull" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Col>
                    <Col :xs="2" :md="2" :lg="2">
                      <Button @click="getFactAddr" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
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
                      <masked-input v-model="uchastIndivid.individ.phone" @onInputChange="store" inputClass="adm-input adm-input--regular wmax360" :maskProps="phoneMask" clearable :placeholder="phoneMask.placeholder"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Должность</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="22">
                    <Input class="adm-input adm-input--regular wmax360" v-model="uchastIndivid.dolz" @on-input-change="store" placeholder=""></Input>
                  </Col>
                </Row>
              </div>

              <div class="adm-form__item">
                <small class="adm-form__label">Место работы</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="22">
                    <Input class="adm-input adm-input--regular wmax360" v-model="uchastIndivid.workPlace" @on-input-change="store" placeholder=""></Input>
                  </Col>
                </Row>
              </div>
              <template v-if="uchastIndivid.uchastStatus === constants.UCHAST_INDIVID">
                <div class="adm-form__item">
                  <small class="adm-form__label">ИНН</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <masked-input inputClass="adm-input adm-input--regular wmax360" @onInputChange="store" v-model="uchastIndivid.individ.inn" :maskProps="{regex: '[0-9]+', casing: 'upper', placeholder: ''}" :maxlength="15"></masked-input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">ОГРНИП</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <masked-input inputClass="adm-input adm-input--regular wmax360" @onInputChange="store" v-model="uchastIndivid.individ.ogrn" :maskProps="{regex: '[0-9]+', casing: 'upper', placeholder: ''}" :maxlength="15"></masked-input>
                      </Col>
                    </Row>
                  </div>
                </div>
              </template>
              <div class="adm-form__item">
                <small class="adm-form__label">АМТС</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmin180 wmax360" placeholder="" v-model="uchastIndivid.vehsId" clearable filterable @on-change="store">
                        <Option class="" v-for="item in vehsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Владеет русским языком</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="22">
                    <CustomSelect class="adm-input adm-input--regular wmin180 wmax240" v-model="uchastIndivid.isSpeaksRussian" filterable @on-change="store" placeholder="">
                      <Option value="true">Да</Option>
                      <Option value="false">Нет</Option>
                      <Option value="null">Неизвестно</Option>
                    </CustomSelect>
                  </Col>
                </Row>
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
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import * as constants from "~/assets/js/utils/constants";

  export default {
    name: "FrmEdUchastFLIndividEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
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
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errorsModal/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          this.uchastIndivid = uchastIndivid;
          this.parseBirthday(uchastIndivid);

          if (funcUtils.isEmpty(this.uchastIndivid.individ.birthMesto)) {
            this.uchastIndivid.individ.birthMesto = '';
          }
          this.uchastIndivid.isSpeaksRussian += '';

          await this.fillVehsList();
          await this.fillTipVidList();
          await this.fillTipList();
          await this.fillBirthMestoList();
          await this.fillGragdanstvoList();

          await this.readDelo();
        }
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdUchastFLIndividEditSetCid', null);
      this.$store.dispatch('frmEdUchastFLIndividEditSetData', null);
    },
    data() {
      return {
        constants,
        phoneMask: {
          placeholder: '',
          mask: '99999999999'
        },
        birthdayDate: '',
        uchastIndivid: null,
        vehsList: null,
        tipList: null,
        tipVidList: null,
        birthMestoList: [],
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
        delo: null,

      }
    },
    computed: {
      birthMestoArray() {
        return this.birthMestoList.map((item) => {
          return item.label;
        })
      },
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
      filterBirthMesto(value, option) {
        if (funcUtils.isEmpty(value) || funcUtils.isEmpty(option)) {
          return false;
        }
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      changeBirthMesto(e) {
        if (e.length === 0) {
          this.uchastIndivid.individ.birthMestoKod = null;
        } else if (e.length > 0 && funcUtils.isEmpty(this.uchastIndivid.individ.birthMestoKod)) {
          this.uchastIndivid.individ.birthMesto = '';
        }
        this.store();
      },
      selectBirthMesto(value) {
        let birthMestoKod = this.birthMestoList.filter((item) => {
          return item.label === value;
        }).getFirst();
        if (birthMestoKod) {
          this.uchastIndivid.individ.birthMestoKod = birthMestoKod.value;
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
          if (this.tipVidList.includes(tip.UCHAST_TIP)) {
            tipList.push({
              label: tip.UCHAST_TIP_NAME,
              value: tip.UCHAST_TIP
            });
          }
        }
        this.tipList = tipList;
      },
      async fillTipVidList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getTipVidDictionary'
        });
        let tipVidList = [];
        let tipVidDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < tipVidDict.length; i++) {
          let tipVid = tipVidDict[i];
          if (this.uchastIndivid.uchastVid === tipVid.UCHAST_VID && funcUtils.isNotEmpty(tipVid.UCHAST_TIP)) {
            tipVidList.push(tipVid.UCHAST_TIP);
          }
        }
        this.tipVidList = tipVidList;
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
      async changeFIO(name) {
        let value = this.uchastIndivid.individ[name];
        if (funcUtils.isNotEmpty(value)) {
          let space = ' ';
          let dash = '-';
          let valueLength = value.length;
          if (valueLength > 1 && (this.uchastIndivid.individ[name][valueLength - 1] === space || this.uchastIndivid.individ[name][valueLength - 1] === dash)) {
            this.uchastIndivid.individ[name] = value.slice(0, -1);
          }
        }
        await this.store();
      },
      store() {
        return RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.uchastIndivid
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

<style scoped lang="scss">
</style>
