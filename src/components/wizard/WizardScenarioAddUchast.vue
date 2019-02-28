<template>
  <div class="wmax1920 mx-auto">
    <Row type="flex">
      <Col :xs="24" :sm="8" :md="6" :lg="6">
          <div class="bg-blue-thin h-full">
            <ul class="ml60 mr24 my24 min-nav">
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Постановление составил</a></li>
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Лицо в отношении которого заводится дело</a></li>
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Транспортное средство</a></li>
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Владелец транспортного средства</a></li>
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Нарушение</a></li>
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Решение по делу</a></li>
            </ul>
          </div>
      </Col>
      <Col :xs="24" :sm="18" :md="18" :lg="18">
        <div>
          <Layout ref="Main" class="bg-white px36 py12" style="min-height: calc(100vh - 125px);">

            <wizard-item-add-uchast v-if="isVisible('Uchast')" ref="DocProtFirst" :info="getInfo('Uchast')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-add-uchast>

            <wizard-item-individual v-if="isVisible('Uchast.Individual')" ref="Uchast.Individual" :info="getInfo('Uchast.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>

            <wizard-item-address v-if="isVisible('Uchast.Individual.regAddr')" ref="Uchast.Individual.regAddr" :info="getInfo('Uchast.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <wizard-item-organization v-if="isVisible('Uchast.Organization')" ref="Uchast.Organization" :info="getInfo('Uchast.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization>

            <wizard-item-address v-if="isVisible('Uchast.Organization.regAddr')" ref="Uchast.Organization.regAddr" :info="getInfo('Uchast.Organization.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

          </Layout>

          <div class="px36 py12 flex-parent flex-parent--end-main border-t border-b border--gray-faint bg-white-light">
            <Button @click="getPrev" type="text">Отменить возбуждение дела</Button>
            <Button @click="save" type="primary" class="ml12">Возбудить</Button>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import WizardItemAddUchast from "~/components/wizard/items/WizardItemAddUchast";
  import WizardItemAddress from "~/components/wizard/items/WizardItemAddress";
  import WizardItemIndividual from "~/components/wizard/items/WizardItemIndividual";
  import WizardItemOrganization from "~/components/wizard/items/WizardItemOrganization";

  export default {
    name: "WizardScenarioAddUchast",
    props: {
      pathes: Object
    },
    components: {
      WizardItemAddUchast,
      WizardItemAddress,
      WizardItemIndividual,
      WizardItemOrganization
    },
    methods: {
      isVisible(path) {
        if (funcUtils.isEmpty(this.pathes)) {
          return false;
        } else {
          return funcUtils.isNotEmpty(this.pathes[path]);
        }
      },
      getInfo(path) {
        if (funcUtils.isEmpty(this.pathes)) {
          return false;
        } else {
          return this.pathes[path];
        }
      },
      storeElementData(params) {
        this.$emit('storeElementData', params);
      },
      updateComponents(cids) {
        this.$emit('updateComponents', cids);
      },
      async save() {
        let eventResponse = await RequestApi.prepareData({
          method: 'make'
        });
        let resp =  JSON.parse(eventResponse.response);
        if (resp.error && resp.error.errorMsg) {
          alert(resp.error.errorMsg);
        }
      },
      getPrev() {
        try {
          formStack.toPrev({
            vm: this
          });
        } catch (e) {
          alert(e.message);
        }
      },
    }
  }
</script>

<style scoped>

</style>
