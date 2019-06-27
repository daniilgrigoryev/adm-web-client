<template>
  <div v-if="data">
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
    name: "WizardItemPetOne",
    extends: WizardItemProtOne,
    mixins: [wizardItemDefinitionOneMethods]
  }
</script>

<style lang="scss" scoped>
</style>
