<template>
  <div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата, до которой продлевается срок</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <DatePickerMask class="adm-input adm-input--regular wmax240" v-model="decis.prolongUntilDate" @on-input-change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Основание принятия решения</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="decis.reason"></Input>
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