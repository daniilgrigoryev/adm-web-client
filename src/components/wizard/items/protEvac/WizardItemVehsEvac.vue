<template>
  <div v-if="data">
    <div class="adm-form">
      <div class="adm-form__container">
        <h2 class="adm-form__headding" id="tc">Транспортное средство</h2>
        <div class="adm-form__content">

          <div class="adm-form__item">
            <small class="adm-form__label">ГРЗ</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="data.regno"
                                @onInputChange="storeElementData" placeholder="ГРЗ"
                                :maskProps="{regex: '[a-zA-Zа-яА-Я0-9]+', casing: 'upper', placeholder: ''}"
                                clearable></masked-input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">VIN</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="data.vin"
                                :maskProps="{regex: '[a-zA-Zа-яА-Я0-9]+', placeholder: '', casing: 'upper'}"
                                @onInputChange="storeElementData"></masked-input>
                </Col>
              </Row>
            </div>
          </div>


          <div class="adm-form__item">
            <small class="adm-form__label">Марка</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.markaAvto"
                          clearable @on-enter="changeMarkaAvto" @on-change="changeMarkaAvto" filterable>
                    <Option v-for="item in markAvtoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </CustomSelect>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Модель</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.modavtoName"
                          clearable @on-change="storeElementData" @on-enter="storeElementData" :disabled="!isNotEmptyMarkId()" filterable>
                    <Option v-for="item in modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </CustomSelect>
                </Col>
              </Row>
            </div>
          </div>


          <div class="adm-form__item">
            <small class="adm-form__label">СТС</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <!-- TODO -->
                  <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="data.regdoc"
                                :maskProps="{casing: 'upper', regex: '[a-zA-Zа-яА-Я0-9]+', placeholder: ''}"
                                @onInputChange="storeElementData"></masked-input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Цвет</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="data.color" :maskProps="{regex: '[а-яА-Я0-9 .-]+', placeholder: '', casing: 'upper'}" @onInputChange="storeElementData"></masked-input>
                </Col>
              </Row>
            </div>
          </div>


          <div class="adm-form__item">
            <small class="adm-form__label">Категория</small>
            <div class="adm-form__item_content">
              <Row type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="24">
                  <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.katcKod"
                          clearable @on-change="storeElementData" @on-enter="storeElementData" filterable>
                    <Option v-for="item in categoryTCList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </CustomSelect>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Тип</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.tiptcKod" clearable @on-change="changeTipTc" @on-enter="changeTipTc" filterable>
                    <Option v-for="item in typeTCList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </CustomSelect>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Тип кузова ТС</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.tipkuzKod" :disabled="!isNotEmptyTipTcKod()" clearable @on-change="storeElementData" @on-enter="storeElementData" filterable>
                    <Option v-for="item in kuzovTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </CustomSelect>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import WizardItemVehs from "~/components/wizard/items/WizardItemVehs";

  export default {
    name: "WizardItemVehsEvac",
    extends: WizardItemVehs
  }
</script>

