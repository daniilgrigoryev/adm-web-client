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
    components: {
      WizardItemDocProt2025,
      WizardItemLvok2025,
      WizardItemAddress,
      WizardItemIndividual,
      WizardItemPlace,
      WizardItemPredDoc
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
    computed: {

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
