<template>
  <div v-if="data">
    <wizard-modal v-if="ulModal.visible" :columnsOptions="ulModal.columnsOptions" :data="ulModal.ulList" @showModal="showUlModal" @onRowDbClick="onUlClick"></wizard-modal>
    <div class="adm-form__item">
      <small class="adm-form__label">Наименование</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Input class="adm-input adm-input--regular" v-model="data.name" @on-input-change="storeElementData" ></Input>
        </Col>
        <Col :xs="24" :md="14" :lg="8">
          <a href="#" @click="searchUlByName" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Справочник ЮЛ</a>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">ИНН</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="6" :lg="6">
          <Input class="adm-input adm-input--regular" v-model="data.inn" @on-input-change="storeElementData" ></Input>
        </Col>
        <Col :xs="24" :md="14" :lg="8">
          <a href="#" @click="searchUlByInn" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Справочник ЮЛ</a>
        </Col>
      </Row>
    </div>
    <!-- <div class="adm-form__item">
      <small class="adm-form__label">ИНН кем выдан</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Input class="adm-input adm-input--regular" v-model="data.innKemVydan" @on-input-change="storeElementData" ></Input>
        </Col>
      </Row>
    </div> -->
    <div class="adm-form__item">
      <small class="adm-form__label">КПП</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="6" :lg="6">
          <Input class="adm-input adm-input--regular" v-model="data.kpp" @on-input-change="storeElementData" ></Input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата регистрации</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateReg" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">ОГРН</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="6" :lg="6">
          <Input class="adm-input adm-input--regular" v-model="data.ogrn" @on-input-change="storeElementData" ></Input>
        </Col>
      </Row>
    </div>

    <div class="adm-form__item">
      <small class="adm-form__label">Телефон</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="22" :lg="22">
          <!-- <Input class="adm-input adm-input--regular wmax360" v-model="data.phone" @on-input-change="storeElementData" placeholder="Телефон"></Input> -->
          <masked-input inputClass="adm-input adm-input--regular" :maskProps="{mask: '99999999999', placeholder: '',}" v-model="data.phone" @onInputChange="storeElementData"></masked-input>
        </Col>
      </Row>
    </div>

    <!-- <div class="adm-form__item">
      <small class="adm-form__label">ОКПО</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Input class="adm-input adm-input--regular" v-model="data.okpo" @on-input-change="storeElementData" ></Input>
        </Col>
      </Row>
    </div> -->
    <!-- TODO -->
    <!-- <div class="adm-form__item">
      <small class="adm-form__label">Доп.сведения</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Input class="adm-input adm-input--regular" v-model="data.okpo" @on-input-change="storeElementData" ></Input>
        </Col>
      </Row>
    </div> -->
    <!-- ENDTODO -->

    <!-- <div class="adm-form__item">
      <small class="adm-form__label">Тип ЮЛ</small>
      <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
          <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.tip" filterable clearable @on-clear="storeElementData" @on-change="storeElementData">
            <Option class="wmax360 " v-for="item in tipULList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Форма собственности</small>
      <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
          <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.fsobstKod" filterable clearable @on-clear="storeElementData" @on-change="storeElementData">
            <Option class="wmax360 " v-for="item in formSobstvList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">ОПФ</small>
      <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
          <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.orgformKod" filterable clearable @on-clear="storeElementData" @on-change="storeElementData">
            <Option class="wmax360 " v-for="item in orgFormList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Ведомство</small>
      <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
          <Select class="adm-input adm-input--regular wmax240 wmin180" v-model="data.vedomstvoId" filterable clearable @on-clear="storeElementData" @on-change="storeElementData">
            <Option class="wmax360 " v-for="item in vedomstList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div> -->
  </div>
</template>


<script>
  import WizardItemOrganization from "~/components/wizard/items/WizardItemOrganization";

  export default {
    name: "WizardItemOrganizationUchast",
    components: {
      MaskedInput: () => import('~/components/shared/MaskedInput'),
    },
    extends: WizardItemOrganization
  }
</script>


<style scoped>

</style>
