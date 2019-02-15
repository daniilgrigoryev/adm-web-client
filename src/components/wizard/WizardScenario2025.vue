<template>
  <div class="wmax1920">
    <Row type="flex">
      <!-- <Col :xs="24" :sm="8" :md="6" :lg="6">
          <div class="bg-blue-thin h-full scroll-hidden">
            <ul class="ml60 mr24 my24">
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Постановление составил</a></li>
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Лицо в отношении которого заводится дело</a></li>
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Транспортное средство</a></li>
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Владелец транспортного средства</a></li>
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Нарушение</a></li>
              <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Решение по делу</a></li>
            </ul>
          </div>
      </Col> -->
      <Col :xs="24" :sm="18" :md="18" :lg="18">
        <div>
          <Layout ref="Main" class="bg-white hmin360 px36 py12">

            <wizard-item-doc-prot2025 v-if="isVisible('DocProt')" ref="DocProt" :info="getInfo('DocProt')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-doc-prot2025>

            <wizard-item-place v-if="isVisible('DocProt.PlaceSost')" ref="DocProt.PlaceSost" :info="getInfo('DocProt.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>

            <wizard-item-lvok2025 v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-lvok2025>

            <wizard-item-pred-doc v-if="isVisible('LVOK.PredDoc')" ref="LVOK.PredDoc" :info="getInfo('LVOK.PredDoc')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pred-doc>

            <wizard-item-address v-if="isVisible('LVOK.regAddr')" ref="LVOK.regAddr" :info="getInfo('LVOK.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <wizard-item-individual v-if="isVisible('Repres')" ref="Repres" :info="getInfo('Repres')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>

            <wizard-item-address v-if="isVisible('Repres.regAddr')" ref="Repres.regAddr" :info="getInfo('Repres.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

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
  import WizardItemDocProt2025 from "~/components/wizard/items/WizardItemDocProt2025";
  import WizardItemLvok2025 from "~/components/wizard/items/WizardItemLvok2025";
  import WizardItemPlace from "~/components/wizard/items/WizardItemPlace";
  import WizardItemPredDoc from "~/components/wizard/items/WizardItemPredDoc";
  import WizardItemAddress from "~/components/wizard/items/WizardItemAddress";
  import WizardItemIndividual from "~/components/wizard/items/WizardItemIndividual";

  export default {
    name: "WizardScenario2025",
    props: {
      pathes: Object
    },
    components: {
      WizardItemDocProt2025,
      WizardItemLvok2025,
      WizardItemAddress,
      WizardItemIndividual,
      WizardItemPlace,
      WizardItemPredDoc
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
