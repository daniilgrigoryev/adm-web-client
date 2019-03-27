<template>
  <div class="wmax1920 prot-pztc">
    <Row type="flex">
      <Col :xs="24" :sm="8" :md="6" :lg="6">
        <div class="bg-blue-thin h-full">
          <ul class="ml60 mr24 my24 min-nav" v-if="isVisible('DocProtEvac')">
              <li v-for="item in goToSectionNav" :key="item.id">
                <a :href="'#' + item.name" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">{{item.title}}</a>
              </li>
            </ul>
        </div>
      </Col>
      <Col :xs="24" :sm="18" :md="18" :lg="18">
        <div>
          <Layout ref="Main" class="bg-white px36 py12" style="min-height: calc(100vh - 125px);">
            <wizard-item-doc-prot-evac v-if="isVisible('DocProtEvac')" ref="DocProtEvac" :info="getInfo('DocProtEvac')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-doc-prot-evac>
            <wizard-item-place v-if="isVisible('DocProtEvac.PlaceNar')" ref="DocProtEvac.PlaceNar" :info="getInfo('DocProtEvac.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
            <wizard-item-place id="DocProtEvac.PlaceSost" v-if="isVisible('DocProtEvac.PlaceSost')" ref="DocProtEvac.PlaceSost" :info="getInfo('DocProtEvac.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
            <wizard-item-vehs id="Vehs" v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs>
          </Layout>
          <div class="px36 py12 flex-parent flex-parent--end-main border-t border-b border--gray-faint bg-white-light adm-btn-footer--sticky">
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
  import WizardItemDocProtEvac from "./items/WizardItemDocProtEvac.vue";
  import WizardItemPlace from "./items/WizardItemPlace.vue";
  import WizardItemLvok from "./items/WizardItemLvok.vue";
  import WizardItemOrganization from "./items/WizardItemOrganization.vue";
  import WizardItemOwner from "./items/WizardItemOwner.vue";
  import WizardItemPredDoc from "./items/WizardItemPredDoc.vue";
  import WizardItemAddress from "./items/WizardItemAddress.vue";
  import WizardItemIndividual from "./items/WizardItemIndividual.vue";
  import WizardItemVehs from "./items/WizardItemVehs.vue";

  export default {
    name: "WizardScenarioProtPZTC",
    props: {
      pathes: Object
    },
    components: {
      WizardItemDocProtEvac,
      WizardItemAddress,
      WizardItemIndividual,
      WizardItemLvok,
      WizardItemOrganization,
      WizardItemOwner,
      WizardItemPredDoc,
      WizardItemPlace,
      WizardItemVehs
    },
    data() {
      return {
        goToSectionNav: [
          {
            title: "Ввод данных по протоколу о задержании ТС",
            name: "head",
          },
          {
            title: "Составил",
            name: "sost",
          },
          {
            title: "Сведения об эвакуации",
            name: "evac",
          },
          {
            title: "Сведения о нарушении",
            name: "nar",
          },
          {
            title: "Транспортное средство",
            name: "tc",
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
        } else {
          this.getPrev();
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

<style lang="scss">
  .prot-pztc {
    .adm-form {
      .adm-form__headding {
        margin: 0;
      }
      .adm-form__label {
        min-width: 210px;
        width: auto;
      }
    }
  }
</style>
