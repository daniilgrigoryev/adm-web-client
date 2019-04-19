<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">ФИО:</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="22" :lg="22">
          <masked-input inputClass="adm-input adm-input--regular" :maskProps="maskInputProt" v-model="fio" @onInputChange="changeFIO"></masked-input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата рождения:</small>
      <Row :gutter="16" type="flex" align="middle">
      <Col :xs="24" :md="14" :lg="22">
        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.birthdayDay" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Место рождения</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <Select class="wmin180 adm-input adm-input--regular wmax360" placeholder="" v-model="data.birthMestoKod" filterable clearable @on-change="storeElementData" >
            <Option class="" v-for="item in birthList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Пол:</small>
      <Row :gutter="16" type="flex" align="middle">
      <Col :xs="24" :md="14" :lg="22">
          <Select class="adm-input adm-input--regular wmin180 wmax360" v-model="data.sex" filterable @on-change="storeElementData" placeholder="">
            <Option value="М">Мужской</Option>
            <Option value="Ж">Женский</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Гражданство:</small>
      <Row :gutter="16" type="flex" align="middle">
      <Col :xs="24" :md="14" :lg="22">
          <Select class="adm-input adm-input--regular wmin180 wmax360" v-model="data.gragdKod" filterable clearable @on-change="storeElementData" placeholder="">
            <Option class="" v-for="item in gragdanstvoList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Телефон:</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="22" :lg="22">
          <Input class="adm-input adm-input--regular wmax360" v-model="data.phone" @on-input-change="storeElementData" placeholder="Телефон:"></Input>
        </Col>
      </Row>
    </div>

    <div class="adm-form__item">
      <small class="adm-form__label">Место работы:</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <Input class="adm-input adm-input--regular wmax360" v-model="data.workPlace" @on-input-change="storeElementData" placeholder="Место работы:"></Input>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemIndividual",
    components: {
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask'),
      MaskedInput: () => import('~/components/shared/MaskedInput'),
    },
    props: {
      info: Object,
      title: String
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        birthList: null,
        gragdanstvoList: null,
        fio: null,
        maskInputProt: {
          regex: '[а-яА-Я\ ]+',
          casing: 'upper',
          placeholder: ''
        },
      }
    },
    methods: {
      async initData() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getElementData',
          params: {
            eCID: this.info.eCID
          }
        });
        this.data = JSON.parse(JSON.parse(eventResponse.response).data);

        if (funcUtils.isNotEmpty(this.data.birthdayDay)) {
          this.data.birthdayDay = new Date(this.data.birthdayDay);
        }

        this.parseFIO();

        await this.fillBirthList();
        await this.fillGragdanstvoList();
      },
      async fillBirthList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getBirthMestoDictionary',
            data: null
          }
        });
        let birthList = [];
        let birthDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < birthDict.length; i++) {
          let birth = birthDict[i];
          birthList.push({
            label: birth.BIRTH_MESTO,
            value: birth.BIRTH_MESTO_KOD
          });
        }
        this.birthList = birthList;
      },
      async fillGragdanstvoList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getGragdanstvoDictionary',
            data: null
          }
        });
        let gragdanstvoList = [];
        let gragdanstvoDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < gragdanstvoDict.length; i++) {
          let gragdanstvo = gragdanstvoDict[i];
          gragdanstvoList.push({
            label: gragdanstvo.GRAGD_NAME,
            value: gragdanstvo.GRAGD_KOD
          });
        }
        this.gragdanstvoList = gragdanstvoList;
      },
      changeFIO() {
        let fio = '';
        this.data.firstName = null;
        this.data.secondName = null;
        this.data.thirdName = null;
        let fioLength = 0;
        let fioArr = this.fio.split(' ');
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0: {
                this.data.firstName = item;
                fio += item;
                break;
              }
              case 1: {
                this.data.secondName = item;
                fio += ' ' + item;
                break;
              }
              case 2: {
                this.data.thirdName = item;
                fio += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.fio = fio;
        this.storeElementData();
      },
      parseFIO () {
        this.fio = '';
        if (funcUtils.isNotEmpty(this.data.firstName)) {
          this.fio += this.data.firstName + ' ';
        }
        if (funcUtils.isNotEmpty(this.data.secondName)) {
          this.fio += this.data.secondName + ' ';
        }
        if (funcUtils.isNotEmpty(this.data.thirdName)) {
          this.fio += this.data.thirdName;
        }
        this.fio = this.fio.trim();
      },
      storeElementData() {
        this.$emit('storeElementData', {
          eCID: this.info.eCID,
          data: this.data
        });
      },
    }
  }
</script>

<style scoped>

</style>
