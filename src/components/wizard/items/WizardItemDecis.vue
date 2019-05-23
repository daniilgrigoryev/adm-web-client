<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">{{ title }}</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Select class="adm-input adm-input--regular  wmin180" placeholder="" v-model="data.decisKod" filterable clearable @on-change="storeElementData">
            <Option v-for="item in decisList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>


    <div v-if="data.decisKod && showByDecisKod(decisKods.lish)">
      <div class="adm-form__item">
        <small class="adm-form__label">Количество месяцев</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.lishMes" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Количество дней</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.lishDay" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Дата начала срока лишения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.periodStart" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
        </Row>
      </div>
    </div>

<!--    <div v-if="data.decisKod && showByDecisKod(decisKods.warning)"></div>-->

    <div v-if="data.decisKod && showByDecisKod(decisKods.shtraf)">
      <div class="adm-form__item">
        <small class="adm-form__label">Сумма штрафа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.sumShtraf" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.arest)">
      <div class="adm-form__item">
        <small class="adm-form__label">Количество дней</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.arestDay" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Дата и время начала ареста</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.arestTimeBeg" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
          </Col>
        </Row>
      </div>
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.discval)">
      <div class="adm-form__item">
        <small class="adm-form__label">Количество месяцев</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.diskvMes" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Количество дней</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.diskvDay" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Дата начала дисквалификации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.datDiskvBeg" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Дата окончания дисквалификации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.datDiskvEnd" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
        </Row>
      </div>
    </div>

<!--    <div v-if="data.decisKod && showByDecisKod(decisKods.observ)"></div>-->

    <div v-if="data.decisKod && showByDecisKod(decisKods.hoursToWork)">
      <div class="adm-form__item">
        <small class="adm-form__label">Количество часов обязательных работ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.hoursToWork" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.forced)">
      <div class="adm-form__item">
        <small class="adm-form__label">Количество месяцев</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.period" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Количество дней</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.period2" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Дата начала работ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.periodStart" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
        </Row>
      </div>
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.imprisonment)">
      <div class="adm-form__item">
        <small class="adm-form__label">Количество месяцев</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.period" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Количество дней</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.period2" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Дата начала лишения свободы</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.periodStart" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
        </Row>
      </div>
    </div>

<!--    <div v-if="data.decisKod && showByDecisKod(decisKods.withdrawal)"></div>-->

<!--    <div v-if="data.decisKod && showByDecisKod(decisKods.confiscation)"></div>-->

<!--    <div v-if="data.decisKod && showByDecisKod(decisKods.exclusion)"></div>-->

    <div v-if="data.decisKod && showByDecisKod(decisKods.stopWorkDay)">
      <div class="adm-form__item">
        <small class="adm-form__label">Количество суток</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular" v-model="data.period2" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
      <div class="adm-form__item">
        <small class="adm-form__label">Дата начала приостановления</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.periodStart" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemDecis",
    components: {
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask'),
      MaskedInput: () => import('~/components/shared/MaskedInput'),
      Select: () => import('~/components/shared/CustomSelect'),
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
          lish: 29, // Лишить права управления ТС
          warning: 51, // Предупредить
          shtraf: 65, // Оштрафовать
          arest: 90, // Арестовать
          discval: 91, // Дисквалифицировать
          observ: 99, // Устное замечание
          hoursToWork: 71, // Обязательные работы
          forced: 73, // Принудительные работы
          imprisonment: 74, // Лишение свободы
          withdrawal: 75, // Возмездное изъятие
          confiscation: 76, // Конфискация
          exclusion: 77, // Выдворение за пределы РФ
          stopWorkDay: 78, // Приостановление деятельности
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

      showByDecisKod(decisKod) {
        return this.data.decisKod == decisKod;
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
