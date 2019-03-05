<template>
  <div v-if="dataStore" class="layout">
    <Layout class="layout--inner" style="min-height: calc(100vh - 66px);">
      <div v-if="deloContext" class="bg-white" style="padding-left: 60px; padding-right: 40px; padding-bottom: 10px; padding-top: 40px;">

        <div class="flex-parent flex-parent--space-between-main">
          
          <div>
            <a href="#" @click="getDelo" class="delo__headding link color-dark-lighter color-blue-light-on-hover">
              <span class="adm-h3">Дело №</span>
              <span class="adm-s28">{{deloContext.deloN}}</span>
            </a>
            <div>
              <span class="adm-txt-regular line30_letter02 color-dark-lighter">{{deloContext.deloDate | formatDateTime('DD.MM.YYYY')}}</span>
              <span class="adm-txt-regular line30_letter02 color-dark-lighter ml24">{{deloContext.stadName}}</span>
            </div>
          </div>

          <div>
            <Button type="primary" @click="getPrev"><Icon type="ios-arrow-back"></Icon>Назад</Button>
            <Button type="default" @click="clearInnerStack">Очистить стэк</Button>
            <Button type="default" @click="addUchastWizard">Добавить участника</Button>

            <Button type="text" class="bg-transparent border--0 link color-blue-base px0 py0 mb0 mx18 txt-underline-on-hover">
              <img src="../../assets/images/print.png" alt="" style="vertical-align: middle; margin-right: 20px;">
              <span style="	color: #1888CC;	font-family: 'Open Sans';	font-size: 12px;	letter-spacing: 0.2px;	line-height: 16px;	text-align: center;">печать дела</span>
            </Button>
          </div>
        </div>

        <div class="mt24">
          <b class="adm-text-big line30_letter02 color-dark-lighter">Статья дела</b>
          <p class="adm-txt-regular color-dark-lighter">{{deloContext.stotvKod + ', ' +deloContext.stotvName}}</p>
        </div>



      </div>
      <hr class="txt-hr my0">
      <div v-if="deloTree">
        <Row type="flex">
          <Col>
          <div class="h-full bg-blue-thin">
            <ul class="tree">
              <li v-for="(item, index) in deloTree" v-if="item.parentCategory && item.recType">
                <a href="#" @click="nodeClick(item)" class="flex-parent flex-parent--center-cross flex-parent--wrap tree__link py18" :class='{"tree__link--selected" : item.selected }'>
                  <div class="ml18" style="width: 40px; height: 40px;">
                    <img :src="getIconByNode(item)" alt="">
                  </div>
                  <div class="col mx18">
                    <p v-html="item.name" class="adm-text-big color-dark-base txt-break-word"></p>
                  </div>
                </a>
              </li>
              <hr class="txt-hr my0" v-else-if="!item.recType" />
            </ul>
          </div>
          </Col>
          <Col class="col"> <!-- :xs="24" :sm="16" :md="16" :lg="16" -->
            <div class="wmax940"><!-- mx-auto -->
              <delo-inner-form ref="innerForm" :sizeInnerStack="sizeInnerStack" @updateSizeStack="updateSizeStack" @updateSelected="updateSelected"></delo-inner-form>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import docTipEnum from "../../assets/js/utils/docTipEnum";
  import decisIspolnEnum from "../../assets/js/utils/decisIspolnEnum";
  import * as formStack from '../../assets/js/api/formStack';
  import Stack from '../../assets/js/api/stack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';
  import DeloInnerForm from "~/components/delo/DeloInnerForm";
  import * as ispolnShtraf from '../../assets/images/ispolnShtraf.png';
  import * as ispolnUved from '../../assets/images/ispolnUved.png';
  import * as decis from '../../assets/images/decis.png';
  import * as predDoc from '../../assets/images/predDoc.png';
  import * as delo from '../../assets/images/delo.png';
  import * as amtc from '../../assets/images/amtc.png';
  import * as uchast from '../../assets/images/uchast.png';
  import * as ispolnDecisAppeal from '../../assets/images/ispolnDecisAppeal.png';
  import * as ispolnAppeal from '../../assets/images/ispolnAppeal.png';
  import * as deloProizv from '../../assets/images/deloProizv.png';
  import * as photo from '../../assets/images/photo.png';

  export default {
    name: "DeloTreeCardView",
    components: {DeloInnerForm},
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('deloTreeCardViewSetCid', current.cid);
        let prepareParams = {
          method: 'restore'
        };
        if (funcUtils.isNotEmpty(this.$route.params.deloId)) {
          prepareParams.method = 'getData';
          prepareParams.params = {
            'deloId': this.$route.params.deloId
          };
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + sessionStorage.getItem('admWid');
          let innerStack = funcUtils.getFromSessionStorage(uid);
          if (funcUtils.isNotEmpty(innerStack)) {
            await this.clearInnerStack();
          } else {
            funcUtils.addToSessionStorage(uid, new Stack());
          }
        }
        this.updateSizeStack({
          uid: this.$store.state.deloTreeCardView.moduleName
        });

        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch('fillModule', {'event': eventResponse});

        if (this.sizeInnerStack === 0) {
          if (this.$refs.innerForm) {
            await this.$refs.innerForm.addForm(this.deloInfo);
          }
        } else {
          this.updateSelected();
        }

        let vm = this;
        this.$store.watch(this.$store.getters.deloTreeCardViewGetCommand, async () => {
          try {
            let eventResponse = await RequestApi.prepareData({
              method: 'restore',
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            alert(e.message);
          }
        });
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('deloTreeCardViewSetCid', null);
      this.$store.dispatch('deloTreeCardViewSetData', null);
    },
    data() {
      return {
        sizeInnerStack: 0
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'deloTreeCardViewGetData'
      }),
      deloTree() {
        let res = [];
        if (this.dataStore) {
          for (let i = 1; i < this.dataStore.tree.length; i++) {
            let item = this.dataStore.tree[i];
            res.push(item);
          }
        }
        return res;
      },
      deloInfo() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.tree[0];
        }
        return res;
      },
      deloContext() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.context;
        }
        return res;
      },
    },
    methods: {
      async getDelo() {
        await this.nodeClick(this.deloInfo);
      },
      updateSelected() {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        this.deloTree.forEach((item) => {
          delete item['selected'];
          this.$set(item, 'selected', funcUtils.isNotEmpty(currentForm) && JSON.stringify(currentForm.params) === JSON.stringify(item));
        });
      },
      async nodeClick(node) {
        await this.clearInnerStack();

        let copyNode = JSON.parse(JSON.stringify(node));
        delete copyNode['selected'];

        if (this.$refs.innerForm) {
          await this.$refs.innerForm.addForm(copyNode);
        }
      },
      getIconByNode(node) {
        switch (node.recType) {
          case "UCHASTFL":
          case "UCHASTUL":
          case "UCHASTOTHER": {
            return uchast;
          }
          case "VEHS":
          case "VEHSOTHER": {
            return amtc;
          }
          case "VU_PRED":
          case "VU_VYD": {
            return predDoc;
          }
          case 'DOCS_GALOB': {
            return ispolnAppeal;
          }
          case "DOCS_OTHER": {
            switch (node.docTip) {
              case docTipEnum.DTP_FOTO:
              case docTipEnum.VEHS_FOTO:
              case docTipEnum.UCHAST_FOTO:
              case docTipEnum.DOCS_FOTO:
              case docTipEnum.VIDEOFIX_FOTO: {
                return photo;
              }
              case docTipEnum.ZALOB: {
                return ispolnDecisAppeal;
              }
              case docTipEnum.APPEAL_CONCLUSION:
              case docTipEnum.APPEAL_DECISION: {
                return ispolnDecisAppeal;
              }
              case docTipEnum.OPL_SHTRAF:
              case docTipEnum.OPL_SHTRAF_UFK:
              case docTipEnum.OPL_SHTRAF_SUD:
              case docTipEnum.OPL_SHTRAF_SSP:
              case docTipEnum.OPL_SHTRAF_MPGU: {
                return ispolnShtraf;
              }
              case docTipEnum.ACT_OCAO:
              case docTipEnum.PROT_MED:
              case docTipEnum.PROT_OTSTR_UPR_TC:
              case docTipEnum.PROT_ZAPR_EKSPLUAT_TC:
              case docTipEnum.PROT_ZADER_TC:
              case docTipEnum.PROT_DOSMOTR_TC:
              case docTipEnum.PROT_IZYAT_VESH_DOC:
              case docTipEnum.PROT_OSMOTR_MESTA_APN:
              case docTipEnum.PROT_AREST_TC_VESH:
              case docTipEnum.PROT_DOSTAVL_FL:
              case docTipEnum.PROT_ZADER_FL:
              case docTipEnum.PROT_DOSMOTR_FL:
              case docTipEnum.PROT_OSMOTR_POMESH:
              case docTipEnum.RAZR_VYID_TC: {
                return deloProizv;
              }
            }
            break;
          }
          case 'DECIS': {
            return decis;
          }
          case 'DOCS_POST':
          case 'DOCS_POST_UL': {
            return deloProizv;
          }
          case 'DECIS_ISPOLN': {
            if (funcUtils.isNotEmpty(node.kod)) {
              switch (node.kod) {
                case decisIspolnEnum.POST_UVEDOM:
                case decisIspolnEnum.POST_PRIEM:
                case decisIspolnEnum.POST_VRUCH:
                case decisIspolnEnum.POST_VOZVRAT:
                case decisIspolnEnum.POST_DOSYL:
                case decisIspolnEnum.POST_NEVRUCH:
                case decisIspolnEnum.POST_CHRAN:
                case decisIspolnEnum.POST_TEMP_CHRAN:
                case decisIspolnEnum.POST_PROCESSING:
                case decisIspolnEnum.POST_IMPORT:
                case decisIspolnEnum.POST_EXPORT:
                case decisIspolnEnum.POST_TAMOZHN:
                case decisIspolnEnum.POST_NEUD_VRUCH:
                case decisIspolnEnum.POST_REG_OTPR:
                case decisIspolnEnum.POST_TAMOZHN_FIN:
                case decisIspolnEnum.POST_PERED_TEMP_CHRAN:
                case decisIspolnEnum.POST_REMOVING:
                case decisIspolnEnum.POST_OPERATION:
                case decisIspolnEnum.POST_UNDEF: {
                  return ispolnUved;
                }
                case decisIspolnEnum.IZMEN_POST_ON_GALOB:
                case decisIspolnEnum.OTMENA_DECIS_ON_GALOB: {
                  return ispolnDecisAppeal;
                }
              }
            }
            return deloProizv;
          }
          case 'DOCS_OPRED':
          case 'DOCS_PROT': {
            return deloProizv;
          }
        }
        return '';
      },
      arrayToTree(arr) {
        let tree = [];
        let mappedArr = {};
        let arrElem;
        let mappedElem;

        for (let i = 0, len = arr.length; i < len; i++) {
          arrElem = arr[i];
          mappedArr[arrElem.category] = arrElem;
          mappedArr[arrElem.category]['children'] = [];
        }

        for (let id in mappedArr) {
          if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            this.$set(mappedElem, 'selected', false);
            if (mappedElem.parentCategory) {
              mappedArr[mappedElem['parentCategory']]['children'].push(mappedElem);
            } else {
              tree.push(mappedElem);
            }
          }
        }
        return tree;
      },
      async clearInnerStack() {
        let params = {
          uid: this.$store.state.deloTreeCardView.moduleName
        };
        await innerFormStack.clearStack(params);
        if (this.$refs.innerForm) {
          this.$refs.innerForm.clearCurrent();
        }
        this.sizeInnerStack = 0;
        this.updateSelected();
      },
      updateSizeStack(params) {
        this.sizeInnerStack = innerFormStack.stackSize(params);
      },
      async getPrev() {
        await this.clearInnerStack();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + sessionStorage.getItem('admWid');
        sessionStorage.removeItem(uid);
        try {
          formStack.toPrev({
            vm: this
          });
        } catch (e) {
          alert(e.message);
        }
      },
      addUchastWizard() {
        try {
          let params = {
            scenarioName: 'AddUchast',
            node: this.deloInfo
          };

          formStack.toNext({
            module: this.$store.state.wizardExecuter,
            vm: this,
            notRemoved: true,
            params: params,
            withCreate: true
          });
        } catch (e) {
          alert(e.message);
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .truck-card{
    background-image: url('../../assets/images/truck.png');
    background-repeat: no-repeat;
    background-position:  97% 97%;
  }
  .taxi-card{
    background-image: url('../../assets/images/taxi.png');
    background-repeat: no-repeat;
    background-position:  97% 97%;
  }
  .delo__headding{
    border-bottom: 2px solid transparent;
  }
  .delo__headding:hover{
    border-bottom: 2px solid #00b1ff;
  }
</style>
