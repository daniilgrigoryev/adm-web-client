<template>
  <div>
    <div class="adm-form__item">
      <small class="adm-form__label">Количество месяцев</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <masked-input inputClass="adm-input adm-input--regular" v-model="decis.lishMes" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Количество дней</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <masked-input inputClass="adm-input adm-input--regular" v-model="decis.lishDay" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата начала срока лишения</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="decis.periodStart" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import mixins from "./mixins.js";
  export default {
    mixins: [mixins],
  }
</script>