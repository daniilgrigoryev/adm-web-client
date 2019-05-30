<template>
  <div>
    <div class="adm-form__item">
      <small class="adm-form__label">Количество часов обязательных работ</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <masked-input inputClass="adm-input adm-input--regular" v-model="decis.hoursToWork" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
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