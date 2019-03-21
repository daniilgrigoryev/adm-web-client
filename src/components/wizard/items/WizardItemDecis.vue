<template>
  <div v-if="data">
    <div class="adm-form">
      <h2 class="adm-text-big color-dark-light my12">Решение по делу</h2>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">{{ title }}</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.decisKod" filterable clearable @on-clear="storeElementData" @on-change="storeElementData">
              <Option class="wmax360 txt-break-word" v-for="item in decisList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div v-if="data.decisKod && showByDecisKod(decisKods.shtraf)" class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Сумма штрафа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.sumShtraf" @on-input-change="storeElementData" ></Input>
          </Col>
        </Row>
      </div>
      <div v-if="data.decisKod && showByDecisKod(decisKods.lish)" class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Срок лишения (мес.)</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.lishMes" @on-input-change="storeElementData" ></Input>
          </Col>
        </Row>
      </div>
      <div v-if="data.decisKod && showByDecisKod(decisKods.lish)" class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата изъятия ВУ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateLishBeg" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
        </Row>
      </div>
      <div v-if="data.decisKod && showByDecisKod(decisKods.discval)" class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Срок дисквалификации (мес.)</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.diskvMes" @on-input-change="storeElementData" ></Input>
          </Col>
        </Row>
      </div>
      <div v-if="data.decisKod && showByDecisKod(decisKods.arest)" class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Срок ареста (дни)</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.arestDay" @on-input-change="storeElementData" ></Input>
          </Col>
        </Row>
      </div>
      <div v-if="data.decisKod && showByDecisKod(decisKods.arest)" class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Время начала ареста</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.arestTimeBeg" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
        </Row>
      </div>
      <div v-if="data.decisKod && showByDecisKod(decisKods.hoursToWork)" class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Кол-во часов обяз-х работ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.hoursToWork" @on-input-change="storeElementData" ></Input>
          </Col>
        </Row>
      </div>
      <div v-if="data.decisKod && showByDecisKod(decisKods.stopWorkDay)" class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Количество суток</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.stopWorkDay"  @on-input-change="storeElementData" ></Input>
          </Col>
        </Row>
      </div>
      <div v-if="data.decisKod && showByDecisKod(decisKods.stopWorkDay)" class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата начала</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.stopWorkBeg" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
        </Row>
      </div>
      <div v-if="data.decisKod && showByDecisKod(decisKods.decis.decis1, decisKods.decis.decis2)" class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Количество месяцев</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.decisMes" @on-input-change="storeElementData" ></Input>
          </Col>
        </Row>
      </div>
      <div v-if="data.decisKod && showByDecisKod(decisKods.decis.decis1, decisKods.decis.decis2)" class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Количество дней</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.decisDay" @on-input-change="storeElementData" ></Input>
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
  import DatePickerMask from "~/components/DatePickerMask";

  export default {
    name: "WizardItemDecis",
    components: {
      DatePickerMask
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
        decisList: null,
        decisKods: {
          shtraf: 65,
          lish: 29,
          discval: 91,
          arest: 90,
          hoursToWork: 71,
          stopWorkDay: 78,
          decis: {
            decis1: 73,
            decis2: 74,
          }
        }
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

        if (funcUtils.isNotEmpty(this.data.dateLishBeg)) {
          this.data.dateLishBeg = new Date(this.data.dateLishBeg);
        }

        if (funcUtils.isNotEmpty(this.data.arestTimeBeg)) {
          this.data.arestTimeBeg = new Date(this.data.arestTimeBeg);
        }

        if (funcUtils.isNotEmpty(this.data.stopWorkBeg)) {
          this.data.stopWorkBeg = new Date(this.data.stopWorkBeg);
        }

        await this.fillDecisList();
      },
      async fillDecisList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getDecisDictionary',
            data: null
          }
        });
        let decisList = [];
        let decisDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < decisDict.length; i++) {
          let decis = decisDict[i];
          decisList.push({
            label: decis.DECIS_NAME,
            value: decis.DECIS_KOD
          });
        }
        this.decisList = decisList;
      },

      showByDecisKod(decisKod, decisKod2) {
        if (funcUtils.isEmpty(decisKod2)) {
          return this.data.decisKod == decisKod;
        } else if (funcUtils.isNotEmpty(decisKod2)) {
          return this.data.decisKod == decisKod || this.data.decisKod == decisKod2;
        }
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
