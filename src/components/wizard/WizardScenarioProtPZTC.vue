<template>
  <div class="wmax1920">
    <Row type="flex">
      <Col :xs="24" :sm="8" :md="6" :lg="6">
        <div class="bg-blue-thin h-full">
          <ul class="ml60 mr24 my24 min-nav">
              <li v-for="item in goToSectionNav" :key="item.id"  v-if="isVisible(item.name)">
                <a :href="'#' + item.name" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">{{item.title}}</a>
              </li>
            </ul>
        </div>
      </Col>
      <Col :xs="24" :sm="18" :md="18" :lg="18">
        <div>
          <Layout ref="Main" class="bg-white px36 py12" style="min-height: calc(100vh - 125px);">

            <wizard-item-doc-prot-evac v-if="isVisible('DocProtEvac')" ref="DocProtEvac" :info="getInfo('DocProtEvac')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-doc-prot-evac>

            <wizard-item-place id="DocProtEvac.PlaceSost" v-if="isVisible('DocProtEvac.PlaceSost')" ref="DocProtEvac.PlaceSost" :info="getInfo('DocProtEvac.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>

            <wizard-item-place v-if="isVisible('DocProtEvac.PlaceNar')" ref="DocProtEvac.PlaceNar" :info="getInfo('DocProtEvac.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>

            <wizard-item-vehs id="Vehs" v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs>

            <wizard-item-individual v-if="isVisible('Witness1')" ref="Witness1" :info="getInfo('Witness1')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>

            <wizard-item-address id="Witness1.regAddr"  v-if="isVisible('Witness1.regAddr')" ref="Witness1.regAddr" :info="getInfo('Witness1.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <wizard-item-individual v-if="isVisible('Witness2')" ref="Witness2" :info="getInfo('Witness2')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>

            <wizard-item-address id="Witness2.regAddr"  v-if="isVisible('Witness2.regAddr')" ref="Witness2.regAddr" :info="getInfo('Witness2.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

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
  import WizardItemDocProtEvac from "~/components/wizard/items/WizardItemDocProtEvac";
  import WizardItemPlace from "~/components/wizard/items/WizardItemPlace";
  import WizardItemAddress from "~/components/wizard/items/WizardItemAddress";
  import WizardItemIndividual from "~/components/wizard/items/WizardItemIndividual";
  import WizardItemVehs from "~/components/wizard/items/WizardItemVehs";

  export default {
    name: "WizardScenarioProtPZTC",
    props: {
      pathes: Object
    },
    components: {
      WizardItemDocProtEvac,
      WizardItemAddress,
      WizardItemIndividual,
      WizardItemPlace,
      WizardItemVehs
    },
    data() {
      return {
        goToSectionNav: [
          {
            title: "Место составления",
            name: "DocProtEvac.PlaceSost",
          },
          {
            title: "Транспортное средство",
            name: "Vehs",
          },
          {
            title: "Адрес регистрации",
            name: "Witness1.regAddr",
          },
        ]
      }
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
