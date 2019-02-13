<template>
  <div v-if="data">
    <Form :label-width="180" label-position="right">
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата уведомления</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker type="date" v-model="data.dateUved" format="dd-MM-yyyy" @on-change="storeElementData" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата исполнения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker type="date" v-model="data.dateIspoln" format="dd-MM-yyyy" @on-change="storeElementData" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemDocPostFinal",
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

      storeElementData() {
        this.$emit('storeElementData', {
          eCID: this.info.eCID,
          data: this.data
        });
      },
    }
  }
</script>

<style scoped>

</style>
