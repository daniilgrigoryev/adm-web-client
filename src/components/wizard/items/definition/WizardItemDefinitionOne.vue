<template>
  <div v-if="data">
    <div v-if="!isNotEmptyParentNode" class="adm-form__item">
      <small class="adm-form__label">Дело №</small>
      <div class="adm-form__item_content">
        <Row type="flex" align="middle">
          <Col span="10">
            <masked-input :disabled="data.deloN !== null" :autofocus="true" inputClass="adm-input adm-input--regular wmin120" :value="data.deloN" :maskProps="maskInputProt" @onInputChange="storeElementData"></masked-input>
          </Col>
          <Col span="6">
            <Button @click="createNewDeloNum" :disabled="data.deloN !== null" type="text" style="outline: 0!important; box-shadow: none; padding: 0 5px;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="md-key" title="Получить уникальный номер" :size="30" />
            </Button>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Определение №</small>
      <div class="adm-form__item_content">
        <Row type="flex" align="middle">
          <Col span="10">
            <masked-input inputClass="adm-input adm-input--regular wmin120" :maskProps="maskInputProt" v-model="data.docN" @onInputChange="storeElementData"></masked-input>
          </Col>
          <Col span="6">
            <Button @click="createProtNum" type="text" style="outline: 0!important; box-shadow: none; padding: 0 5px;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="md-key" title="Получить уникальный номер" :size="30" />
            </Button>
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
