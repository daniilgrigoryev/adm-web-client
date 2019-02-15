<template>
  <div class="bg-blue-thin">
    <Row>
      <!--<Col :xs="24" :sm="6" :md="6" :lg="6">
        <div class="bg-blue-thin">
          <ul class="ml60 mr24 mt24">
            <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Постановление составил</a></li>
            <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Лицо в отношении которого заводится дело</a></li>
            <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Транспортное средство</a></li>
            <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Владелец транспортного средства</a></li>
            <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Нарушение</a></li>
            <li class=""><a href="#" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Решение по делу</a></li>
          </ul>
        </div>
      </Col>-->
      <Col :xs="24" :sm="18" :md="18" :lg="18">
        <div class="bg-white">
          <Layout ref="Main" class="hmin360 px36 py12">

            <wizard-item-doc-prot-first v-if="isVisible('DocProtFirst')" ref="DocProtFirst" :info="getInfo('DocProtFirst')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-doc-prot-first>

            <wizard-item-place v-if="isVisible('DocProtFirst.PlaceSost')" ref="DocProtFirst.PlaceSost" :info="getInfo('DocProtFirst.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>

            <wizard-item-place v-if="isVisible('DocProtFirst.PlaceNar')" ref="DocProtFirst.PlaceNar" :info="getInfo('DocProtFirst.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>

            <wizard-item-vehs v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-vehs>

            <wizard-item-individual v-if="isVisible('Witness1')" ref="Witness1" :info="getInfo('Witness1')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>

            <wizard-item-address v-if="isVisible('Witness1.regAddr')" ref="Witness1.regAddr" :info="getInfo('Witness1.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <wizard-item-individual v-if="isVisible('Witness2')" ref="Witness2" :info="getInfo('Witness2')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>

            <wizard-item-address v-if="isVisible('Witness2.regAddr')" ref="Witness2.regAddr" :info="getInfo('Witness2.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

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
  import WizardItemDocProtFirst from "~/components/wizard/items/WizardItemDocProtFirst";
  import WizardItemPlace from "~/components/wizard/items/WizardItemPlace";
  import WizardItemAddress from "~/components/wizard/items/WizardItemAddress";
  import WizardItemIndividual from "~/components/wizard/items/WizardItemIndividual";
  import WizardItemVehs from "~/components/wizard/items/WizardItemVehs";

  export default {
    name: "WizardScenarioProtPZTC",
    components: {
      WizardItemDocProtFirst,
      WizardItemAddress,
      WizardItemIndividual,
      WizardItemPlace,
      WizardItemVehs
    },
    async created() {
      try {
        let prepareParams = {
          method: 'restore'
        };
        if (funcUtils.isNotEmpty(this.$route.params.scenarioName)) {
          prepareParams.method = 'loadScenario';
          prepareParams.params = {
            'name': this.$route.params.scenarioName
          };
        }

        let eventResponse = await RequestApi.prepareData(prepareParams);
        let cids = Object.keys(JSON.parse(eventResponse.response).data);
        let info = {};
        for (let i = 0; i < cids.length; i++) {
          let cid = cids[i];
          eventResponse = await RequestApi.prepareData({
            method: 'getElementInfo',
            params: {
              eCID: cid
            }
          });
          info[cid] = JSON.parse(eventResponse.response).data;
        }
        let pathes = {};
        for (let prop in info) {
          if (info.hasOwnProperty(prop)) {
            let data = info[prop];
            data.eCID = prop;
            pathes[data.path] = data;
          }
        }
        this.pathes = pathes;
      } catch (e) {
        alert(e.message);
      }
    },
    data() {
      return {
        pathes: null
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
      async storeElementData(params) {
        let eventResponse = await RequestApi.prepareData({
          method: 'storeElementData',
          params: {
            eCID: params.eCID,
            data: JSON.stringify(params.data, funcUtils.replacer)
          },
          withSpinner: false
        });
        let cids = JSON.parse(eventResponse.response).data;
        if (funcUtils.isEmpty(cids)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
          eventResponse = await RequestApi.prepareData({
            method: 'getChain',
            withSpinner: false
          });
          cids = JSON.parse(eventResponse.response).data;
        }
        await this.updateComponents(cids);
      },
      async updateComponents(cids) {
        let cidsKeySet = Object.keys(cids);
        for (let i = 0; i < cidsKeySet.length; i++) {
          let cid = cidsKeySet[i];
          let prop = cids[cid];
          let child = this.getChild(cid);
          if (child && funcUtils.isEmpty(prop)) {
            delete this.pathes[child.info.path];
            this.$forceUpdate();
          } else if (child && funcUtils.isNotEmpty(prop)) {
            child.initData();
          } else if (!child && funcUtils.isNotEmpty(prop)) {
            let eventResponse = await RequestApi.prepareData({
              method: 'getElementInfo',
              params: {
                eCID: cid
              }
            });
            let info = JSON.parse(eventResponse.response).data;
            if (funcUtils.isEmpty(this.pathes[info.path])) {
              info.eCID = cid;
              this.pathes[info.path] = info;
              this.$forceUpdate();
            }
          }
        }
      },
      getChild(cid) {
        let res = null;
        let children = this.pathes;
        for (let prop in children) {
          if (children.hasOwnProperty(prop)) {
            let child = children[prop];
            if (child.eCID === cid) {
              return this.$refs[child.path];
            }
          }
        }
        return res;
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
