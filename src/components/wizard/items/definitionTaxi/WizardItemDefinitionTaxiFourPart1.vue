<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Пункт НПА</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="22" :lg="22">
            <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.pnpaId" clearable filterable @on-change="storeElementData">
              <Option class="" v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Статья КРФоАП</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="22" :lg="22">
            <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.stotvId" clearable filterable @on-change="changeStotvSearchInfo">
              <Option class="" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item" v-if="KBKSearchInfoList">
      <small class="adm-form__label">КБК</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.kbk" clearable filterable :disabled="!data.stotvId" @on-change="storeElementData">
            <Option class="wmax360 " v-for="item in KBKSearchInfoList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
          </Select>
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
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";
  import wizardItemProtFourMethods from "~/components/mixins/prot/wizardItemProtFourMethods";
  import {bus} from "~/assets/js/utils/bus";

  export default {
    name: "WizardItemDefinitionTaxiFourPart1",
    mixins: [wizardItemProtFourMethods],
    components: {
    },
    props: {
      info: Object
    },
    async created() {
      await this.initData();
      bus.$on('setDataWizardItemDefinitionTaxiFourPart1', this.setDataWizardItemDefinitionTaxiFourPart1);
    },
    data() {
      return {
        data: null,
      }
    },
    methods: {
      async initData() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getElementData',
          params: {
            eCID: this.info.eCID
          }
        });
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          await this.fillPnpaList();
          await this.fillStotvSearchInfo();

          this.data = data;
        }

        if (funcUtils.isNotEmpty(this.data.stotvId)) {
          this.fillKBKSearchInfo();
        }
      },
      setDataWizardItemDefinitionTaxiFourPart1(data) {
        this.data = data;
      },

      async storeElementData() {
        bus.$emit('setDataWizardItemDefinitionTaxiFourPart2', this.data);

        return new Promise((resolve, reject) => {
          this.$emit('storeElementData', {
            eCID: this.info.eCID,
            data: this.data,
            resolve: resolve
          });
        });
      },
    }
  }
</script>

<style scoped>

</style>
