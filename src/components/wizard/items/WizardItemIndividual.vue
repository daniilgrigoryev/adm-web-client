<template>
  <div v-if="data">

    <div class="adm-form__item">
      <small class="adm-form__label">Фамилия</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <masked-input inputClass="adm-input adm-input--regular wmax360" @onInputChange="changeFIO('firstName')" v-model="data.firstName" :maskProps="{regex: '([а-яА-ЯёЁ]+[ -]){0,}', casing: 'upper', placeholder: ''}"></masked-input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Имя</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <masked-input inputClass="adm-input adm-input--regular wmax360" @onInputChange="changeFIO('secondName')" v-model="data.secondName" :maskProps="{regex: '([а-яА-ЯёЁ]+[ -]){0,}', casing: 'upper', placeholder: ''}"></masked-input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Отчество</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <masked-input inputClass="adm-input adm-input--regular wmax360" @onInputChange="changeFIO('thirdName')" v-model="data.thirdName" :maskProps="{regex: '([а-яА-ЯёЁ]+[ -]){0,}', casing: 'upper', placeholder: ''}"></masked-input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Пол</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <CustomSelect class="adm-input adm-input--regular wmin180 wmax360" v-model="data.sex" filterable @on-change="storeElementData" @on-enter="storeElementData" placeholder="">
            <Option value="М">Мужской</Option>
            <Option value="Ж">Женский</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата рождения</small>
      <Row :gutter="16" type="flex" align="middle">
      <Col :xs="24" :md="14" :lg="22">
        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.birthdayDay" @change="formatBirthday" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Место рождения</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <AutoComplete
            v-model="data.birthMesto"
            :data="birthMestoArray"
            class=" adm-input adm-input--regular wmax360 txt-uppercase"
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
    <div class="adm-form__item">
      <small class="adm-form__label">Гражданство</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <CustomSelect class="adm-input adm-input--regular wmin180 wmax360" v-model="data.gragdKod" filterable clearable @on-change="storeElementData" @on-enter="storeElementData" placeholder="">
            <Option class="" v-for="item in gragdanstvoList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
    <div v-if="individualStatus === constants.UCHAST_INDIVID" class="adm-form__item">
      <small class="adm-form__label">ОГРНИП</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="22" :lg="22">
          <masked-input inputClass="adm-input adm-input--regular wmax360" :maxlength="15" :maskProps="{regex: '[0-9]+', placeholder: ''}" v-model="data.ogrn" @onInputChange="storeElementData"></masked-input>
        </Col>
      </Row>
    </div>
    <div v-if="individualStatus === constants.UCHAST_INDIVID" class="adm-form__item">
      <small class="adm-form__label">ИНН</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="22" :lg="22">
          <masked-input inputClass="adm-input adm-input--regular wmax360" :maxlength="12" :maskProps="{regex: '[0-9]+', placeholder: ''}" v-model="data.inn" @onInputChange="storeElementData"></masked-input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Телефон</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="22" :lg="22">
          <masked-input inputClass="adm-input adm-input--regular wmax360" :maskProps="{regex: '[0-9]{12}', placeholder: ''}" v-model="data.phone" @onInputChange="storeElementData"></masked-input>
        </Col>
      </Row>
    </div>

    <div class="adm-form__item">
      <small class="adm-form__label">Должность</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <Input class="adm-input adm-input--regular wmax360" v-model="data.dolz" @on-input-change="storeElementData" placeholder=""></Input>
        </Col>
      </Row>
    </div>

    <div class="adm-form__item">
      <small class="adm-form__label">Место работы</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <Input class="adm-input adm-input--regular wmax360" v-model="data.workPlace" @on-input-change="storeElementData" placeholder=""></Input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Владеет русским языком</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <CustomSelect class="adm-input adm-input--regular wmin180 wmax360" v-model="data.isSpeaksRussian" filterable @on-change="storeElementData" @on-enter="storeElementData" placeholder="">
            <Option value="true">Да</Option>
            <Option value="false">Нет</Option>
            <Option value="null">Неизвестно</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";
  import * as constants from "~/assets/js/utils/constants";

  export default {
    name: "WizardItemIndividual",
    components: {
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
        birthList: [],
        gragdanstvoList: null,
        individualStatus: null, // 3 - ип
        constants
      }
    },
    computed: {
      birthMestoArray() {
        return this.birthList.map((item) => {
          return item.label;
        })
      },
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

        if (funcUtils.isEmpty(this.data.birthMesto)) {
          this.data.birthMesto = '';
        }
        this.data.isSpeaksRussian += '';

        await this.fillBirthList();
        await this.fillGragdanstvoList();
        await this.fillIndividualStatus();
      },
      formatBirthday(e) {
        if (funcUtils.isNotEmpty(e)) {
          this.data.birthdayDay = e;
          this.data.birthdayYear = e.getFullYear();
        } else {
          this.data.birthdayDay = null;
          this.data.birthdayYear = null;
        }
        this.storeElementData();
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
      async fillIndividualStatus() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getStatus',
            data: null
          }
        });
        if (eventResponse.response) {
          this.individualStatus = JSON.parse(JSON.parse(eventResponse.response).data);
        }
      },
      filterBirthMesto(value, option) {
        if (funcUtils.isEmpty(value) || funcUtils.isEmpty(option)) {
          return false;
        }
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      async changeBirthMesto(e) {
        if (e.length === 0) {
          this.data.birthMestoKod = null;
        } else if (e.length > 0 && funcUtils.isEmpty(this.data.birthMestoKod)) {
          this.data.birthMesto = '';
        }
        await this.storeElementData();
      },
      async selectBirthMesto(value) {
        let birthMestoKod = this.birthList.filter((item) => {
          return item.label === value;
        }).getFirst();
        if (birthMestoKod) {
          this.data.birthMestoKod = birthMestoKod.value;
        }
        await this.storeElementData();
      },
      async changeFIO(name) {
        let value = this.data[name];
        if (funcUtils.isNotEmpty(value)) {
          let space = ' ';
          let dash = '-';
          let valueLength = value.length;
          if (valueLength > 1 && (this.data[name][valueLength - 1] === space || this.data[name][valueLength - 1] === dash)) {
            this.data[name] = value.slice(0, -1);
          }
        }
        await this.storeElementData();
      },
      async storeElementData() {
        return new Promise((resolve, reject) => {
          this.$emit('storeElementData', {
            eCID: this.info.eCID,
            data: this.data,
            resolve: resolve
          });
        });
      },
    }
  }
</script>

<style scoped>

</style>
