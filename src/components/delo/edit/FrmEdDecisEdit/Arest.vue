<template>
  <div>
    <div class="adm-form__item">
      <small class="adm-form__label">Количество дней</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <masked-input inputClass="adm-input adm-input--regular" v-model="decis.arestDay" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата и время начала ареста</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="decis.arestTimeBeg" @change="store" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
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