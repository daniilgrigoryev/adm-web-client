<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Дата вручения</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateUved" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата вступления</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="22" :md="22" :lg="22">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateVstup" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
          </Col>
          <Col :xs="2" :md="2" :lg="2">
            <Button @click="calcDateVstup" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="ios-bookmarks-outline" class=" " title="Расчитать дату вступления в законную силу" :size="30" />
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";
  import wizardItemDocPostFinalMethods from "~/components/mixins/post/wizardItemDocPostFinalMethods.js";

  export default {
    name: "WizardItemDocPostFinal",
    mixins: [wizardItemDocPostFinalMethods],
    components: {
    },
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null
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
        this.data = JSON.parse(JSON.parse(eventResponse.response).data);

        if (funcUtils.isNotEmpty(this.data.dateUved)) {
          this.data.dateUved = new Date(this.data.dateUved);
        }

        if (funcUtils.isNotEmpty(this.data.dateIspoln)) {
          this.data.dateIspoln = new Date(this.data.dateIspoln);
        }
      },

      async storeElementData() {
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
