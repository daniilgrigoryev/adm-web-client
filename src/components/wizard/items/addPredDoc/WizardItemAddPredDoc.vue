<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Тип документа</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <CustomSelect class="wmax360 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.docTip" filterable clearable @on-change="changeDocTip" @on-enter="changeDocTip">
            <Option class="wmax360 " v-for="item in tipDocList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Предъявленный документ</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
           <masked-input ref="docNum" inputClass="adm-input adm-input--regular wmax360 wmin180" v-model="data.docNum"  :maskProps="maskDocNum" clearable @onInputChange="storeElementData"></masked-input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата выдачи</small>
      <Row :gutter="16" type="flex" align="middle">
      <Col :xs="24" :md="14" :lg="22">
        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.vuDateVyd" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Кем выдан</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <masked-input inputClass="adm-input adm-input--regular wmax360 wmin180" v-model="data.vuOgaiVydName" :maskProps="{casing: 'upper', regex: '[а-яА-Я0-9 .-]+', placeholder: ''}" clearable @onInputChange="storeElementData"></masked-input>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import WizardItemPredDoc from "~/components/wizard/items/WizardItemPredDoc";

  export default {
    name: "WizardItemAddPredDoc",
    extends: WizardItemPredDoc
  }
</script>

<style scoped>

</style>
