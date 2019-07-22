<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Пункт НПА</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="22" :lg="22">
            <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.pnpaId" clearable filterable @on-change="storeElementData" @on-enter="storeElementData" :filterMethod="filterStotv">
              <Option class="" v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </CustomSelect>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Статья КРФоАП</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="22" :lg="22">
            <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.stotvId" clearable filterable @on-change="changeStotvSearchInfo" @on-enter="changeStotvSearchInfo" :filterMethod="filterStotv">
              <Option class="" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </CustomSelect>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item" v-if="KBKSearchInfoList">
      <small class="adm-form__label">КБК</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.kbk" clearable filterable :disabled="!data.stotvId" @on-change="storeElementData" @on-enter="storeElementData">
            <Option class="wmax360 " v-for="item in KBKSearchInfoList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Фактические сведения</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="22" :lg="22">
            <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.factSved" ></Input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дополнительные сведения</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="22" :lg="22">
            <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.dopSved" ></Input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item" v-if="!isCargo && !isGreen">
      <small class="adm-form__label"></small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <Checkbox class="amd-checkbox" v-model="data.isRemovedFromEvac" @on-change="storeElementData">Признак снятия транспортного средства, посредством которого было совершено нарушение, с эвакуатора</Checkbox>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import WizardItemProtFour from "~/components/wizard/items/WizardItemProtFour";
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as constants from "~/assets/js/utils/constants";

  export default {
    name: "WizardItemProtFour",
    extends: WizardItemProtFour,
    computed: {
      isCargo() {
        let res = null;
        if (this.info) {
          res = funcUtils.isNotEmpty(this.info.deloTag) && this.info.deloTag === constants.TAG_CARGO;
        }
        return res;
      },
      isGreen() {
        let res = null;
        if (this.info) {
          res = funcUtils.isNotEmpty(this.info.deloTag) && this.info.deloTag === constants.TAG_GREEN;
        }
        return res;
      },
    },
  }
</script>

<style scoped>

</style>
