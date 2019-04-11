<template>
  <div>
    <ul class="tree">
      <li @click="parentNodeClick">
        <a href="javascript:void(0)" class="flex-parent flex-parent--center-cross flex-parent--wrap tree__link py18" :class='{"tree__link--selected" : node.selected }'>
          <div class="ml18" style="width: 30px; height: 30px;">
            <img :src="iconNode" alt="">
          </div>
          <div class="col mx18 formatter">
            <p v-html="format" class="adm-text-big color-dark-base"></p>
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
      this.open = this.node.height !== 3 || this.hasSelectedChildren(this.node);
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
              case docTipEnum.ZALOB:
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
      dataNode() {
        let node = this.node;
        switch (node.recType) {
          case "DELO": {
            /*
            node.nodeParams
            {
              "delo_apn_check_priority": 4,
              "delo_apn_n": "337",
              "delo_apn_dat": "08.03.2016",
              "delo_apn_stotv": "ч.1 ст.12.26 КРФоАП",
              "delo_apn_viol_name": null,
              "delo_apn_block_isp": null
            }*/
            return `<p class="adm-text-big color-dark-base">Дело №${node.nodeParams.delo_apn_n} от ${node.nodeParams.delo_apn_dat} по ${node.nodeParams.delo_apn_stotv}</p>`;
          }
          case "UCHASTFL":
          case "UCHASTUL":
          case "UCHASTOTHER": {
            /*{
              "uchast_check_state": 2,
              "uchast_vid": 1,
              "uchast_vid_name_short": "ЛВОК",
              "uchast_tip_name": "(Водитель)",
              "uchast_name_short": "И.В.ПАВЛОВА",
              "uchast_birthday": "05.08.1989"
            }*/
            return '';
          }
          case "VEHS":
          case "VEHSOTHER": {
            /*{
              "vehs_check_state": 2,
              "vehs_nspec": "Р407НЕ90",
              "vehs_marka_avto": "АВТОЛАЙН",
              "vehs_modavto_name": "32361"
            }*/
            return amtc;
          }
          case "VU_PRED":
          case "VU_VYD": {
            /*{
              "vu_pred_doc_tip": "ВУ",
              "vu_pred_n": "90ЕН847564",
              "vu_pred_dat_vyd": "",
              "vu_pred_status": "Задержан"
            }*/
            return '';
          }
          case 'DOCS_GALOB': {
            /*{
              "doc_other_tip": "b2",
              "doc_other_appeal_category": 1,
              "doc_other_tip_name": "Жалоба",
              "doc_other_uchast_name": "И.В. Павлова",
              "doc_other_n": "Б/Н",
              "doc_other_dat": "20.03.2016",
              "docs_other_fotomat_cnt": null
            }*/
            return '';
          }
          case "DOCS_OTHER": {
            switch (node.docTip) {
              case docTipEnum.DTP_FOTO:
              case docTipEnum.VEHS_FOTO:
              case docTipEnum.UCHAST_FOTO:
              case docTipEnum.DOCS_FOTO:
              case docTipEnum.VIDEOFIX_FOTO: {
                /*{
                  "doc_other_tip": "404",
                  "doc_other_appeal_category": null,
                  "doc_other_tip_name": "Фотофиксация",
                  "doc_other_uchast_name": null,
                  "doc_other_n": "18810150180626000105",
                  "doc_other_dat": "26.06.2018",
                  "docs_other_fotomat_cnt": "(3 шт.)"
                }*/
                return '';
              }
              case docTipEnum.ADVICE: {
                /*{
                  "doc_other_tip": "404",
                  "doc_other_appeal_category": null,
                  "doc_other_tip_name": "Фотофиксация",
                  "doc_other_uchast_name": null,
                  "doc_other_n": "18810150180626000105",
                  "doc_other_dat": "26.06.2018",
                  "docs_other_fotomat_cnt": "(3 шт.)"
                }*/
                return '';
              }
              case docTipEnum.ZALOB:
              case docTipEnum.APPEAL_CONCLUSION:
              case docTipEnum.APPEAL_DECISION: {
                /*{
                  "doc_other_tip": "404",
                  "doc_other_appeal_category": null,
                  "doc_other_tip_name": "Фотофиксация",
                  "doc_other_uchast_name": null,
                  "doc_other_n": "18810150180626000105",
                  "doc_other_dat": "26.06.2018",
                  "docs_other_fotomat_cnt": "(3 шт.)"
                }*/
                return '';
              }
              case docTipEnum.OPL_SHTRAF:
              case docTipEnum.OPL_SHTRAF_UFK:
              case docTipEnum.OPL_SHTRAF_SUD:
              case docTipEnum.OPL_SHTRAF_SSP:
              case docTipEnum.OPL_SHTRAF_MPGU: {
                /*{
                  "doc_other_tip": "404",
                  "doc_other_appeal_category": null,
                  "doc_other_tip_name": "Фотофиксация",
                  "doc_other_uchast_name": null,
                  "doc_other_n": "18810150180626000105",
                  "doc_other_dat": "26.06.2018",
                  "docs_other_fotomat_cnt": "(3 шт.)"
                }*/
                return '';
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
                /*{
                  "doc_other_tip": "74",
                  "doc_other_appeal_category": null,
                  "doc_other_tip_name": "Прот.направления",
                  "doc_other_uchast_name": null,
                  "doc_other_n": "90НН576456",
                  "doc_other_dat": "08.03.2016",
                  "docs_other_fotomat_cnt": null
                }*/
                return '';
              }
            }
            break;
          }
          case 'DECIS': {
            /*{
              "decis_kod": 65,
              "decis_name": "Оштрафовать",
              "decis_priz_mera": "+",
              "decis_mera": "на 500 руб.",
              "decis_dat": "26.06.2018"
            }*/
            return '';
          }
          case 'DOCS_POST':
          case 'DOCS_POST_UL': {
            /*{
              "post_short_name": "Постановление ВФ",
              "post_doc_n": "18810150180626000105",
              "post_dat_sost": " от 26.06.2018"
            }*/
            return '';
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
                  /*{
                    "std_isp_type": 1,
                    "std_isp_kod": 20,
                    "std_isp_name": "Почтовое уведомление",
                    "std_isp_date": "19.10.2017",
                    "std_isp_sumopl": null
                  }*/
                  return '';
                }
                case decisIspolnEnum.IZMEN_POST_ON_GALOB:
                case decisIspolnEnum.OTMENA_DECIS_ON_GALOB: {
                  /*{
                    "std_isp_type": 1,
                    "std_isp_kod": 19,
                    "std_isp_name": "Отмена решением по жалобе",
                    "std_isp_date": "25.03.2016",
                    "std_isp_sumopl": null
                  }*/
                  return '';
                }
              }
            }
            /*{
              "std_isp_type": 1,
              "std_isp_kod": 20,
              "std_isp_name": "Почтовое уведомление",
              "std_isp_date": "26.06.2018",
              "std_isp_sumopl": null
            }*/
            return '';
          }
          case 'DOCS_OPRED': {
            /*{
              "doc_other_tip": "33",
              "doc_other_appeal_category": null,
              "doc_other_tip_name": "Определение",
              "doc_other_uchast_name": null,
              "doc_other_n": "Б/Н",
              "doc_other_dat": "28.01.2011",
              "docs_other_fotomat_cnt": null
            }*/
            return '';
          }
          case 'DOCS_PROT': {
            /*{
              "prot_short_name": "Прот.об АПН",
              "prot_doc_n": "1111111",
              "prot_dat_sost": " от 10.04.2019"
            }*/
            return '';
          }
        }
        return null;
      },
    },
    methods: {
      hasSelectedChildren(node) {
        if (node.selected) {
          return true;
        }
        let res = false;
        if (node.children && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            let child = node.children[i];
            res = this.hasSelectedChildren(child);
          }
        }
        return res;
      },
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
