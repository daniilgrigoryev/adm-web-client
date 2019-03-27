<template>
  <div v-if="data">
    <div class="adm-form">
      <div class="adm-form__container mt6">
        <h2 class="adm-text-big adm-form__headding" id="sost">ЛВОК</h2>
        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Гражданство:</small>
          <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmin180" v-model="data.gragdKod" filterable clearable @on-change="storeElementData" placeholder="">
                <Option class="wmax360 txt-break-word" v-for="item in gragdanstvoList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">ФИО:</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="fio" @on-input-change="changeFIO" placeholder="ФИО"></Input>
            </Col>
          </Row>
        </div>
        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Пол:</small>
          <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmin180" v-model="data.sex" @on-change="storeElementData" placeholder="">
                <Option value="М">Мужской</Option>
                <Option value="Ж">Женский</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Дата рождения:</small>
          <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.birthdayDay" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
            </Col>
          </Row>
        </div>
        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Место рождения</small>
          <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
              <Select class="wmax240 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.birthMestoKod" filterable clearable @on-change="storeElementData" >
                <Option class="wmax360 txt-break-word" v-for="item in birthList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Место работы:</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.workPlace" @on-input-change="storeElementData" placeholder="Место работы:"></Input>
            </Col>
          </Row>
        </div>
        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Телефон:</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.phone" @on-input-change="storeElementData" placeholder="Телефон:"></Input>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import DatePickerMask from "~/components/shared/DatePickerMask";

  export default {
    name: "WizardItemIndividual",
    components: {
      DatePickerMask
    },
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        birthList: null,
        gragdanstvoList: null,
        fio: null
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
