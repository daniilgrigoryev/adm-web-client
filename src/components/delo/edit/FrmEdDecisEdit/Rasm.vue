<template>
  <div>
    <div class="adm-form__item">
      <small class="adm-form__label">Орган рассмотрения</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="4" :md="4" :lg="4">
            <masked-input inputClass="adm-input adm-input--regular" v-model="decis.organNapravlKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeOrganNapravlKod" ></masked-input>
          </Col>
          <Col :xs="18" :md="18" :lg="18">
            <Input class="adm-input adm-input--regular" disabled v-model="decis.organNapravlName" ></Input>
          </Col>
          <Col :xs="2" :md="2" :lg="2">
            <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="30" />
            </Button>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дополнение к адресу органа</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Input class="adm-input adm-input--regular" v-model="decis.organNapravlAdrDetails"></Input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата и время рассмотрения</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <DatePickerMask class="adm-input adm-input--regular wmax240" v-model="decis.dateRasm" @change="store" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import mixins from "./mixins.js";
  export default {
    mixins: [mixins],
  }
</script>