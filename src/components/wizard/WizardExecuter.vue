<template>
  <div class="bg-blue-thin">
    <Row>
      <Col :xs="24" :sm="6" :md="6" :lg="6">
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
      </Col>
      <Col :xs="24" :sm="18" :md="18" :lg="18">
        <div class="bg-white">
          <div class="hmin360 px36 py12">
            <wizard-item-doc-post-first v-if="isVisible('DocPostFirst')" ref="DocPostFirst" :info="getInfo('DocPostFirst')" @storeElementData="storeElementData"></wizard-item-doc-post-first>

            <wizard-item-place v-if="isVisible('DocPostFirst.PlaceSost')" ref="DocPostFirst.PlaceSost" :info="getInfo('DocPostFirst.PlaceSost')" title="Место вынесения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>

            <hr class="txt-hr my24">

            <wizard-item-lvok v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData"></wizard-item-lvok>

            <wizard-item-pred-doc v-if="isVisible('LVOK.PredDoc')" ref="LVOK" :info="getInfo('LVOK.PredDoc')" @storeElementData="storeElementData"></wizard-item-pred-doc>

            <wizard-item-individual v-if="isVisible('LVOK.Individual')" ref="LVOK.Individual" :info="getInfo('LVOK.Individual')" @storeElementData="storeElementData"></wizard-item-individual>

            <wizard-item-address v-if="isVisible('LVOK.Individual.regAddr')" ref="LVOK.Individual.regAddr" :info="getInfo('LVOK.Individual.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <wizard-item-address v-if="isVisible('LVOK.Individual.factAddr')" ref="LVOK.Individual.factAddr" :info="getInfo('LVOK.Individual.factAddr')" title="Адрес места жительства" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <wizard-item-organization v-if="isVisible('LVOK.Organization')" ref="LVOK.Organization" :info="getInfo('LVOK.Organization')" @storeElementData="storeElementData"></wizard-item-organization>

            <wizard-item-address v-if="isVisible('LVOK.Organization.regAddr')" ref="LVOK.Organization.regAddr" :info="getInfo('LVOK.Organization.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <wizard-item-address v-if="isVisible('LVOK.Organization.factAddr')" ref="LVOK.Organization.factAddr" :info="getInfo('LVOK.Organization.factAddr')" title="Адрес" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <hr class="txt-hr my24">

            <wizard-item-vehs v-if="isVisible('Vehs')" ref="Vehs" :info="getInfo('Vehs')" @storeElementData="storeElementData"></wizard-item-vehs>

            <wizard-item-owner v-if="isVisible('Owner')" ref="Owner" :info="getInfo('Owner')" @storeElementData="storeElementData"></wizard-item-owner>

            <hr class="txt-hr my24">

            <wizard-item-individual v-if="isVisible('Owner.Individual')" ref="Owner.Individual" :info="getInfo('Owner.Individual')" @storeElementData="storeElementData"></wizard-item-individual>

            <wizard-item-address v-if="isVisible('Owner.Individual.regAddr')" ref="Owner.Individual.regAddr" :info="getInfo('Owner.Individual.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <wizard-item-address v-if="isVisible('Owner.Individual.factAddr')" ref="Owner.Individual.factAddr" :info="getInfo('Owner.Individual.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <wizard-item-organization v-if="isVisible('Owner.Organization')" ref="Owner.Organization" :info="getInfo('Owner.Organization')" @storeElementData="storeElementData"></wizard-item-organization>

            <wizard-item-address v-if="isVisible('Owner.Organization.regAddr')" ref="Owner.Organization.regAddr" :info="getInfo('Owner.Organization.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <wizard-item-address v-if="isVisible('Owner.Organization.factAddr')" ref="Owner.Organization.factAddr" :info="getInfo('Owner.Organization.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>

            <wizard-item-doc-post-second v-if="isVisible('DocPostSecond')" ref="DocPostSecond" :info="getInfo('DocPostSecond')" @storeElementData="storeElementData"></wizard-item-doc-post-second>

            <wizard-item-place v-if="isVisible('DocPostSecond.PlaceNar')" ref="DocPostSecond.PlaceNar" :info="getInfo('DocPostSecond.PlaceNar')" title="Место нарушения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>

            <wizard-item-decis v-if="isVisible('DecisMain')" ref="DecisMain" :info="getInfo('DecisMain')" @storeElementData="storeElementData"></wizard-item-decis>

            <wizard-item-decis v-if="isVisible('DecisAdd')" ref="DecisAdd" :info="getInfo('DecisAdd')" @storeElementData="storeElementData"></wizard-item-decis>

            <wizard-item-doc-post-final v-if="isVisible('DocPostFinal')" ref="DocPostFirst" :info="getInfo('DocPostFinal')" @storeElementData="storeElementData"></wizard-item-doc-post-final>
          </div>
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
  import WizardItemAddress from "~/components/wizard/items/WizardItemAddress";
  import WizardItemDecis from "~/components/wizard/items/WizardItemDecis";
  import WizardItemDocPostFinal from "~/components/wizard/items/WizardItemDocPostFinal";
  import WizardItemDocPostFirst from "~/components/wizard/items/WizardItemDocPostFirst";
  import WizardItemDocPostSecond from "~/components/wizard/items/WizardItemDocPostSecond";
  import WizardItemIndividual from "~/components/wizard/items/WizardItemIndividual";
  import WizardItemLvok from "~/components/wizard/items/WizardItemLvok";
  import WizardItemOrganization from "~/components/wizard/items/WizardItemOrganization";
  import WizardItemOwner from "~/components/wizard/items/WizardItemOwner";
  import WizardItemPlace from "~/components/wizard/items/WizardItemPlace";
  import WizardItemPredDoc from "~/components/wizard/items/WizardItemPredDoc";
  import WizardItemVehs from "~/components/wizard/items/WizardItemVehs";

  export default {
    name: "WizardExecuter",
    components: {
      WizardItemAddress,
      WizardItemDecis,
      WizardItemDocPostFinal,
      WizardItemDocPostFirst,
      WizardItemDocPostSecond,
      WizardItemIndividual,
      WizardItemLvok,
      WizardItemOrganization,
      WizardItemOwner,
      WizardItemPlace,
      WizardItemPredDoc,
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
        debugger;
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
