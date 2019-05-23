<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Статус</small>
      <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
          <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.status" clearable @on-change="storeElementData">
            <Option class="wmax360 " v-for="item in ownerStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemOwner",
    props: {
      info: Object
    },
    components: {
      Select: () => import('~/components/shared/CustomSelect'),
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        ownerStatusList: [
          {
            label: 'Физическое лицо',
            value: 1
          },
          {
            label: 'Юридическое лицо',
            value: 2
          }
        ]
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
