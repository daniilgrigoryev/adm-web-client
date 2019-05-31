<template>
  <div>
    <list-items-docs :items="decis.provideMaterialsList" title="Список требуемых документов" :disabledFields="{ quantity: true, check: true }" @change="store"></list-items-docs>
    <list-items-docs :items="decis.providePresenceList" title="Обеспечить явку" :disabledFields="{ quantity: true, check: true }" @change="store"></list-items-docs>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата вручения</small><!-- Дата уведомления -->
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <DatePickerMask class="adm-input adm-input--regular wmax240" v-model="decis.dateUved" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
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