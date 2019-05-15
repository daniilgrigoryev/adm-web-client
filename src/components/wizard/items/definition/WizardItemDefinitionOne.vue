<template>
  <div v-if="data">
    <div v-if="!isNotEmptyParentNode" class="adm-form__item">
      <small class="adm-form__label">Дело №</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input :disabled="data.deloN !== null" :autofocus="true" inputClass="adm-input adm-input--regular wmin120" :value="data.deloN" :maskProps="maskInputProt" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Определение №</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular wmin120" :maskProps="maskInputProt" v-model="data.docN" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата и время составления</small>
      <div class="adm-form__item_content">
        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180 ivu-date-picker" v-model="data.dateSost" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
      </div>
    </div>
  </div>
</template>

<script>
  import wizardItemDefinitionOneMethods from "~/components/mixins/prot/wizardItemDefinitionOneMethods";
  import WizardItemProtOne from "~/components/wizard/items/WizardItemProtOne";

  export default {
    name: "WizardItemDefinitionOne",
    extends: WizardItemProtOne,
    mixins: [wizardItemDefinitionOneMethods]
  }
</script>

<style lang="scss" scoped>
</style>
