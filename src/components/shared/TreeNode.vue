<template>
  <div>
    <ul class="tree">
      <li @click="parentNodeClick">
        <a href="javascript:void(0)" class="flex-parent flex-parent--center-cross flex-parent--wrap tree__link py18" :class='{"tree__link--selected" : node.selected }'>
          <div class="ml18" style="width: 30px; height: 30px;">
            <img :src="iconNode" alt="">
          </div>
          <div class="col mx18 formatter">
            <p v-html="format" class="adm-text-big color-dark-base txt-break-word"></p>
          </div>
          <span v-if="isParent && isFolder">
            <img v-if='open' src='../../assets/images/controls-switch-chevron-up.svg'>
            <img v-else src='../../assets/images/controls-switch-chevron-down.svg'>
          </span>
        </a>
      </li>
    </ul>
    <tree-node
      v-show="open"
      :class="isParent ? 'tree-parent' : ''"
      v-for="(nodeChild, index) in node.children"
      :key="index"
      :nodeClick="nodeClick"
      :node="nodeChild">
    </tree-node>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import docTipEnum from "../../assets/js/utils/docTipEnum";
  import decisIspolnEnum from "../../assets/js/utils/decisIspolnEnum";
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
    name: "TreeNode",
    props: {
      node: Object,
      nodeClick: Function
    },
    created() {
      this.open = this.node.height !== 3;
    },
    data() {
      return {
        open: false
      }
    },
    computed: {
      format(){
        let nodeName = this.node.name.replace(/\<br\>/g," ").replace(/\<b\>/g," ");
        return nodeName;
      },
      isParent() {
        return this.node.height === 3;
      },
      isFolder() {
        return this.node.children && this.node.children.length > 0;
      },
      iconNode() {
        let node = this.node;
        switch (node.recType) {
          case "DELO": {
            return delo;
          }
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
              case docTipEnum.ADVICE: {
                return ispolnUved;
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
    },
    methods: {
      parentNodeClick() {
        this.nodeClick(this.node);
        this.toggle();
      },
      toggle() {
        if (this.isFolder && this.isParent) {
          this.open = !this.open;
        }
      }
    }
  }
</script>

<style lang='scss'>
  .bold {
  }
</style>
