<template>
  <div>
    <ul class="tree">
      <li @click="parentNodeClick">
        <a href="javascript:void(0)" class="tree__link " :class='[{"tree__link--selected" : node.selected}, deloBgCorrection]'>
          <div class="tree__icon">
            <img :src="iconNode" alt="">
          </div>
          <div v-html="dataNode" class="tree__text-wrap"></div>
          <img v-if="isParent && isFolder" class="tree__arrow" :class="{open: open}" src="../../assets/images/controls-switch-chevron-down.svg" />
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
  import RequestApi from "~/assets/js/api/requestApi";
  import * as ConstantUtils from "~/assets/js/utils/constantUtils";
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import docTipEnum from "~/assets/js/utils/docTipEnum";
  import decisIspolnEnum from "~/assets/js/utils/decisIspolnEnum";
  import * as ispolnShtraf from '~/assets/images/ispolnShtraf.png';
  import * as ispolnUved from '~/assets/images/ispolnUved.png';
  import * as decis from '~/assets/images/decis.png';
  import * as predDoc from '~/assets/images/predDoc.png';
  import * as delo from '~/assets/images/delo.png';
  import * as amtc from '~/assets/images/amtc.png';
  import * as uchast from '~/assets/images/uchast.png';
  import * as ispolnDecisAppeal from '~/assets/images/ispolnDecisAppeal.png';
  import * as ispolnAppeal from '~/assets/images/ispolnAppeal.png';
  import * as deloProizv from '~/assets/images/deloProizv.png';
  import * as photo from '~/assets/images/photo.png';

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
        open: false,
      }
    },
    computed: {
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
              case docTipEnum.MEDIA_DOC:
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
      deloBgCorrection(){
        let node = this.node;
        let params = node.nodeParams;
        
        if(node.recType == "DELO"){
          switch (params.delo_apn_check_priority) {
            // 0-3 - красный
            // 4-7 - жёлтый
            // 8 и выше - зелёный
            case 0:
            case 1:
            case 2:
            case 3: {
              return "bg-pink-thin";
            }
            case 4:
            case 5:
            case 6:
            case 7:{
              return "bg-yellow-thin";
            }
            default: {
              return "";
            }
          }
        }
      },
      dataNode() {
        let node = this.node;
        let params = node.nodeParams;
        
        switch (node.recType) {
          case "DELO": {
            return `
              <h4>
                Дело
                по ${params.delo_apn_stotv}
                <span class="date">${params.delo_apn_dat}</span>
              </h4>
              <p>
                ${params.delo_apn_n}
              </p>
              
            `;
          }
          case "UCHASTFL":
          case "UCHASTUL":
          case "UCHASTOTHER": {
            let uchastBirthday = params.uchast_birthday ? `<p class="other-info">Дата рождения ${params.uchast_birthday}</p>` : '';
            let uchast_tip_name = params.uchast_tip_name ? `, ${params.uchast_tip_name.slice(0, -1).slice(1)}` : '';
            return `
              <h4><div>${params.uchast_vid_name_short} ${uchast_tip_name}</div></h4>
              <p>${params.uchast_name_short} </p>
              ${uchastBirthday}
            `;
          }
          case "VEHS":
          case "VEHSOTHER": {
            return `
              <h4>Транспортное средство</h4>
              <p>${params.vehs_nspec}</p>
              <p class="other-info">${params.vehs_marka_avto} ${params.vehs_modavto_name}</p>
            `;
          }
          case "VU_PRED":
          case "VU_VYD": {
            return `
              <h4>${params.vu_pred_doc_tip}</h4>
              <p>${params.vu_pred_n}</p>
              <p class="other-info">Выдан ${params.vu_pred_dat_vyd}</p>
            `;
          }
          case 'DOCS_GALOB': {
            return `
              <h4>
                ${params.doc_other_tip_name}
                <span class="date">${params.doc_other_dat}</span>
              </h4>
              <p>
                ${params.doc_other_uchast_name}
              </p>
            `;
          }
          case "DOCS_OTHER": {
            switch (node.docTip) {
              case docTipEnum.DTP_FOTO:
              case docTipEnum.VEHS_FOTO:
              case docTipEnum.UCHAST_FOTO:
              case docTipEnum.DOCS_FOTO:
              case docTipEnum.MEDIA_DOC: {
                if (node.height > 3) {
                  return `
                  <p>${params.comments}</p>
                `;
                } else {
                  return `
                  <h4>
                    ${params.doc_other_tip_name}
                    <span class="date">${params.doc_other_dat}</span>
                  </h4>
                  <p>
                    ${params.doc_other_n}
                  </p>
                  <p class="other-info">${params.docs_other_fotomat_cnt}</p>
                `;
                }
              }
              case docTipEnum.VIDEOFIX_FOTO: {
                return `
                  <h4>
                    ${params.doc_other_tip_name}
                    <span class="date">${params.doc_other_dat}</span>
                  </h4>
                  <p>
                    ${params.doc_other_n}
                  </p>
                  <p class="other-info">${params.docs_other_fotomat_cnt}</p>
                `;
              }
              case docTipEnum.ADVICE: {
                return `
                  <h4>
                    ${params.doc_other_tip_name}
                    <span class="date">${params.doc_other_dat}</span>
                  </h4>
                  <p>
                    ${params.doc_other_n}
                  </p>
                  <p class="other-info">${params.docs_other_fotomat_cnt}</p>
                `;
              }
              case docTipEnum.ZALOB:
              case docTipEnum.APPEAL_CONCLUSION:
              case docTipEnum.APPEAL_DECISION: {
                return `
                  <h4>
                    ${params.doc_other_tip_name}
                    <span class="date">${params.doc_other_dat}</span>
                  </h4>
                  <p>
                    ${params.doc_other_n}
                  </p>
                  <p class="other-info">${params.docs_other_fotomat_cnt}</p>
                `;
              }
              case docTipEnum.OPL_SHTRAF:
              case docTipEnum.OPL_SHTRAF_UFK:
              case docTipEnum.OPL_SHTRAF_SUD:
              case docTipEnum.OPL_SHTRAF_SSP:
              case docTipEnum.OPL_SHTRAF_MPGU: {
                return `
                  <h4>
                    ${params.doc_other_tip_name}
                    <span class="date">${params.doc_other_dat}</span>
                  </h4>
                  <p>
                    ${params.doc_other_n}
                  </p>
                  <p class="other-info">${params.docs_other_fotomat_cnt}</p>
                `;
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
                return `
                  <h4>
                    ${params.doc_other_tip_name}
                    <span class="date">${params.doc_other_dat}</span>
                  </h4>
                  <p>
                    ${params.doc_other_n}
                  </p>
                  <p class="other-info">${params.docs_other_fotomat_cnt}</p>
                `;
              }
            }
            break;
          }
          case 'DECIS': {
            return `
              <h4>
                ${params.decis_name}
                <span class="date">${params.decis_dat}</span>
              </h4>
              <p>
              </p>
              <p class="red">${params.decis_mera}</p>
            `;
          }
          case 'DOCS_POST':
          case 'DOCS_POST_UL': {
            this.open = true;
            return `
              <h4>
                ${params.post_short_name}
                <span class="date">${params.post_dat_sost}</span>
              </h4>
              <p>
              </p>
              <p>${params.post_doc_n}</p>
            `;
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
                  this.open = true;
                  return `
                    <h4>
                      ${params.std_isp_name}
                      <span class="date">${params.std_isp_date}</span>
                    </h4>
                    <p>
                    </p>
                  `;
                }
                case decisIspolnEnum.IZMEN_POST_ON_GALOB:
                case decisIspolnEnum.OTMENA_DECIS_ON_GALOB: {
                  return `
                    <h4>
                      ${params.std_isp_name}
                      <span class="date">${params.std_isp_date}</span>
                    </h4>
                    <p>
                    </p>
                  `;
                }
              }
            }
            return `
              <h4>
                ${params.std_isp_name}
                <span class="date">${params.std_isp_date}</span>
              </h4>
              <p>
              </p>
            `;
          }
          case 'DOCS_OPRED': {
            this.open = true;
            return `
              <h4>
                ${params.doc_other_tip_name}
                <span class="date">${params.doc_other_dat}</span>
              </h4>
              <p>
                ${params.doc_other_n}
              </p>
            `;
          }
          case 'DOCS_PROT': {
            this.open = true;
            return `
              <h4>
                ${params.prot_short_name}
                <span class="date">${params.prot_dat_sost}</span>
              </h4>
              <p>
                ${params.prot_doc_n}
              </p>
            `;
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
            if (res) {
              return res;
            }
          }
        }
        return res;
      },
      parentNodeClick() {
        if (this.node.recType === "DOCS_OTHER" && this.node.docTip === docTipEnum.MEDIA_DOC && this.node.height > 3) {
          this.downloadMedia(this.node);
          return;
        }
        this.nodeClick(this.node);
        this.toggle();
      },
      toggle() {
        if (this.isFolder && this.isParent) {
          this.open = !this.open;
        }
      },
      async downloadMedia(node) {
        try {
          let eventResponse = await RequestApi.sendGetMediaFileHttpRequest({
            url: `${ConstantUtils.HTTP_URL_FILES}/${localStorage.getItem('admSid')}/${node.nodeParams.media_id}`
          });
          let data = null;
          if (eventResponse.response) {
            data = eventResponse.response;
          }
          if (data) {
            let element = document.createElement("a");
            element.href = window.URL.createObjectURL(data);
            element.setAttribute("download", `${node.nodeParams.comments}`);
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }
        } catch (e) {
          this.$Notice.warning({
            title: 'Ошибка получения данных',
            desc: e.message,
            duration: 10
          });
        }
      },
    }
  }
</script>

<style lang="scss">
  .tree-parent {
    .tree {
      width: 400px;
      z-index: 8;
      .tree__link {
        padding: 8px 15px;
        &:before {
          width: 350px;
        }
        .tree__text-wrap {
          h4 {
            font-size: 14px;
          }
          p {
            font-size: 14px;
          }
        }
      } 
    }
  }
  .tree {
    width: 430px;
    .tree__link {
      display: grid;
      grid-gap: 25px;
      grid-template-columns: 40px 1fr;
      width: 100%;
      align-items: center;
      padding: 10px 15px;
      padding-left: 25px;
      position: relative;
      &:before {
        width: 350px;
      }
      .tree__arrow {
        position: absolute;
        right: -5px;
        display: flex;
        align-items: center;
        justify-content: center;
        &.open {
          transform: rotate(180deg);
        }
      }
      .tree__icon {
        height: 40px;
        width: 40px;
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .tree__text-wrap {
        letter-spacing: 0.2px;	
        width: 100%;
        padding-right: 20px;
        h4 {
          color: #000;	
          font-size: 16px;	
          padding-bottom: 4px;
          display: flex;
          justify-content: space-between;
        }
        .date {
          flex: none;
          font-size: 12px;	
          font-style: italic;	
          text-align: right;
          color: #797979;
        }
        small {
          color: #797979;
          font-size: 12px;
          font-weight: 400;
        }
        p {
          font-size: 18px;	
          font-weight: 600;	
          letter-spacing: 0.2px;
          line-height: 16px;
          color: #373737;
          &.red {
            color: #de6262;
          }
          &.other-info {
            color: #373737;	
            font-weight: 400;
            font-size: 14px;	
            padding-top: 2px;
          }
        }
      }
    }
  }
</style>
