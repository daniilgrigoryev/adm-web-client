<template>
  <div>
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