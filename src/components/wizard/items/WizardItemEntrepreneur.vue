<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">ИНН:</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="22" :lg="22">
          <Input class="adm-input adm-input--regular wmax360" v-model="data.inn" @on-input-change="storeElementData" placeholder=""></Input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">ОГРНИП:</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="22" :lg="22">
          <Input class="adm-input adm-input--regular wmax360" v-model="data.ogrn" @on-input-change="storeElementData" placeholder=""></Input>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import WizardItemIndividual from "~/components/wizard/items/WizardItemIndividual";

  export default {
    name: "WizardItemEntrepreneur",
    extends: WizardItemIndividual
  }
</script>