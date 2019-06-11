<template>
  <div>
    <ul class="tree">
      <li @click="parentNodeClick">
        <a href="javascript:void(0)" class="tree__link " :class='[{"tree__link--selected" : node.selected}, deloBgCorrection]'>
          <div class="tree__icon">
            <img :src="iconNode" alt="">
          </div>
          <div v-html="dataNode" class="tree__text-wrap"></div>
          <img v-if="isParent && isFolder" @click="toggle" class="tree__arrow" :class="{open: open}" src="../../assets/images/icons/controls-switch-chevron-down.svg" />
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
  import * as constants from "~/assets/js/utils/constants";
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import docTipEnum from "~/assets/js/utils/docTipEnum";
  import decisIspolnEnum from "~/assets/js/utils/decisIspolnEnum";


  import * as shtraf from '~/assets/images/icons/shtraf.svg';
  import * as izveschenie from '~/assets/images/icons/izveschenie.svg';
  import * as reshenie1_1 from '~/assets/images/icons/add-process.svg';
  import * as reshenie1 from '~/assets/images/icons/reshenie-variant-1.svg';
  import * as reshenie2 from '~/assets/images/icons/reshenie-variant-2.svg';
  import * as VU from '~/assets/images/icons/udostoverenie-chelovek.svg';
  import * as delo from '~/assets/images/icons/delo.svg';
  import * as amtc from '~/assets/images/icons/ts.svg';
  import * as uchast from '~/assets/images/icons/uchastnik.svg';
  import * as photo from '~/assets/images/icons/foto-kamera-varialt-1.svg';
  import * as posnanovlenie from '~/assets/images/icons/posnanovlenie.svg';
  import * as protokol from '~/assets/images/icons/protokol.svg';
  import * as pztsAll from '~/assets/images/icons/protokol-ts-zaderzhanie.svg';
  import * as opredelenie from '~/assets/images/icons/opredelenie.svg';
  import * as protOtstrUprTC from '~/assets/images/icons/protokol-ts-otstranenie.svg';
  import * as protMed from '~/assets/images/icons/protokol-alcohol.svg';
  import * as protZaderTC from '~/assets/images/icons/protokol-ts-zaderzhanie.svg';
  import * as protokolIzjatie from '~/assets/images/icons/protokol-izjatie.svg';

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
          case constants.DELO: {
            return delo;
          }
          case constants.UCHASTFL:
          case constants.UCHASTUL:
          case constants.UCHASTOTHER: {
            return uchast;
          }
          case constants.VEHS:
          case constants.VEHSOTHER: {
            return amtc;
          }
          case constants.VU_PRED:
          case constants.VU_VYD: {
            return VU;
          }
          case constants.DOCS_GALOB: {
            return reshenie1;
          }
          case constants.DOCS_OTHER: {
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
                return izveschenie;
              }
              case docTipEnum.ZALOB:
              case docTipEnum.APPEAL_CONCLUSION:
              case docTipEnum.PETITION:
              case docTipEnum.APPEAL_DECISION: {
                return reshenie1;
              }
              case docTipEnum.OPL_SHTRAF:
              case docTipEnum.OPL_SHTRAF_UFK:
              case docTipEnum.OPL_SHTRAF_SUD:
              case docTipEnum.OPL_SHTRAF_SSP:
              case docTipEnum.OPL_SHTRAF_MPGU: {
                return shtraf;
              }
              case docTipEnum.PROT_OTSTR_UPR_TC: {
                return protOtstrUprTC
              }
              case docTipEnum.PROT_MED:{
                return protMed
              }
              case docTipEnum.PROT_ZADER_TC: {
                return protZaderTC;
              }
              case docTipEnum.PROT_IZYAT_VESH_DOC:{
                return protokolIzjatie;
              }
              case docTipEnum.ACT_OCAO:
              case docTipEnum.PROT_ZAPR_EKSPLUAT_TC:
              case docTipEnum.PROT_DOSMOTR_TC:
              case docTipEnum.PROT_OSMOTR_MESTA_APN:
              case docTipEnum.PROT_AREST_TC_VESH:
              case docTipEnum.PROT_DOSTAVL_FL:
              case docTipEnum.PROT_ZADER_FL:
              case docTipEnum.PROT_DOSMOTR_FL:
              case docTipEnum.PROT_OSMOTR_POMESH:
              case docTipEnum.RAZR_VYID_TC: {
                return pztsAll;
              }
            }
            break;
          }
          case constants.DECIS: {
            return reshenie1_1;
          }
          case constants.DOCS_POST:
          case constants.DOCS_POST_UL: {
            return posnanovlenie;
          }
          case constants.DECIS_ISPOLN: {
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
                  return izveschenie;
                }
                case decisIspolnEnum.OPL_SHTRAF: {
                  return shtraf;
                }
                case decisIspolnEnum.IZMEN_POST_ON_GALOB:
                case decisIspolnEnum.OTMENA_DECIS_ON_GALOB: {
                  return reshenie1;
                }
              }
            }
            return reshenie2;
          }
          case constants.DOCS_OPRED: {
            return opredelenie;
          }
          case constants.DOCS_PROT: {
            return protokol;
          }
        }
        return '';
      },
      deloBgCorrection(){
        let node = this.node;
        let params = node.nodeParams;

        if(node.recType === constants.DELO){
          switch (params.delo_apn_check_priority) {
            // 0-3 - красный
            case 0:
            case 1:
            case 2:
            case 3: {
              return "bg-pink-thin";
            }
            // 4-7 - жёлтый
            case 4:
            case 5:
            case 6:
            case 7:{
              return "bg-yellow-thin";
            }
            // 8 и выше - зелёный
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
          case constants.DELO: {
            let deloContext = this.$store.getters.deloTreeCardViewGetData.context;
            let colorClass = "";
            switch (deloContext.stadKod) {
              case constants.STAD_VOZB: {
                // Возбуждено
                colorClass = "green";
                break
              }
              case constants.STAD_REVIEW: {
                // Рассмотрение
                colorClass = "black";
                break
              }
              case constants.STAD_APPEAL: {
                // Обжалование
                colorClass = "black";
                break
              }
              case constants.STAD_REVISION: {
                // Пересмотр
                colorClass = "black";
                break
              }
              case constants.STAD_EXECUTION: {
                // Исполнение
                colorClass = "black";
                break
              }
              case constants.STAD_PERFORMED: {
                // Исполнено
                colorClass = "black";
                break
              }
              case constants.STAD_TERMINATED: {
                // Прекращено
                colorClass = "red";
                break
              }
              default: {
                colorClass = "";
                break
              }
            }
            return `
              <h4>
                Дело
                <span class="date">${params.delo_apn_dat}</span>
              </h4>
              <p>${params.delo_apn_n}</p>
              <p class="other-info">
                по ${params.delo_apn_stotv}
                <span class="delo-status ${colorClass}">
                  ${deloContext.stadName}
                </span>
               </p>
            `;
          }
          case constants.UCHASTFL:
          case constants.UCHASTUL:
          case constants.UCHASTOTHER: {
            let uchastBirthday = params.uchast_birthday ? `<p class="other-info">Дата рождения ${params.uchast_birthday}</p>` : '';
            let uchast_tip_name = params.uchast_tip_name ? `, ${params.uchast_tip_name.slice(0, -1).slice(1)}` : '';
            return `
              <h4><div>${params.uchast_vid_name_short}${uchast_tip_name}</div></h4>
              <p>${params.uchast_name_short} </p>
              ${uchastBirthday}
            `;
          }
          case constants.VEHS:
          case constants.VEHSOTHER: {
            return `
              <h4>Транспортное средство</h4>
              <p>${params.vehs_nspec}</p>
              <p class="other-info">${params.vehs_marka_avto} ${params.vehs_modavto_name}</p>
            `;
          }
          case constants.VU_PRED:
          case constants.VU_VYD: {
            return `
              <h4>${params.vu_pred_doc_tip}</h4>
              <p>${params.vu_pred_n}</p>
              <p class="other-info">Выдан ${params.vu_pred_dat_vyd}</p>
            `;
          }
          case constants.DOCS_GALOB: {
            return `
              <h4>
                ${params.doc_tip_name}
                <span class="date">${params.dat_sost}</span>
              </h4>
              <p>
                ${params.uchast_name}
              </p>
            `;
          }
          case constants.DOCS_OTHER: {
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
                    ${params.doc_tip_name}
                    <span class="date">${params.dat_sost}</span>
                  </h4>
                  <p>
                    ${params.media_materials_cnt}
                  </p>
                `;
                }
              }
              case docTipEnum.VIDEOFIX_FOTO: {
                return `
                  <h4>
                    ${params.doc_tip_name}
                    <span class="date">${params.dat_sost}</span>
                  </h4>
                  <p>
                    ${params.doc_n}
                  </p>
                  <p class="other-info">${params.media_materials_cnt}</p>
                `;
              }
              case docTipEnum.ADVICE: {
                return `
                  <h4>
                    ${params.doc_tip_name}
                    <span class="date">${params.dat_sost}</span>
                  </h4>
                  <p>
                    ${params.doc_n}
                  </p>
                  <p class="other-info">${params.media_materials_cnt}</p>
                `;
              }
              case docTipEnum.ZALOB:
              case docTipEnum.APPEAL_CONCLUSION:
              case docTipEnum.PETITION:
              case docTipEnum.APPEAL_DECISION: {
                return `
                  <h4>
                    ${params.doc_tip_name}
                    <span class="date">${params.dat_sost}</span>
                  </h4>
                  <p>
                    ${params.doc_n}
                  </p>
                  <p class="other-info">${params.media_materials_cnt}</p>
                `;
              }
              case docTipEnum.OPL_SHTRAF:
              case docTipEnum.OPL_SHTRAF_UFK:
              case docTipEnum.OPL_SHTRAF_SUD:
              case docTipEnum.OPL_SHTRAF_SSP:
              case docTipEnum.OPL_SHTRAF_MPGU: {
                return `
                  <h4>
                    ${params.doc_tip_name}
                    <span class="date">${params.dat_sost}</span>
                  </h4>
                  <p>
                    ${params.doc_n}
                  </p>
                  <p class="other-info">${params.media_materials_cnt}</p>
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
                    ${params.doc_tip_name}
                    <span class="date">${params.dat_sost}</span>
                  </h4>
                  <p>
                    ${params.doc_n}
                  </p>
                  <p class="other-info">${params.media_materials_cnt}</p>
                `;
              }
            }
            break;
          }
          case constants.DECIS: {
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
          case constants.DOCS_POST:
          case constants.DOCS_POST_UL: {
            this.open = true;
            return `
              <h4>
                ${params.doc_tip_name}
                <span class="date">${params.dat_sost}</span>
              </h4>
              <p>
              </p>
              <p>${params.doc_n}</p>
            `;
          }
          case constants.DECIS_ISPOLN: {
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
          case constants.DOCS_OPRED: {
            this.open = true;
            return `
              <h4>
                ${params.doc_tip_name}
                <span class="date">${params.dat_sost}</span>
              </h4>
              <p>
                ${params.doc_n}
              </p>
            `;
          }
          case constants.DOCS_PROT: {
            this.open = true;
            return `
              <h4>
                ${params.doc_tip_name}
                <span class="date">${params.dat_sost}</span>
              </h4>
              <p>
                ${params.doc_n}
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
      async parentNodeClick() {
        if (this.node.recType === constants.DOCS_OTHER && this.node.docTip === docTipEnum.MEDIA_DOC && this.node.height > 3) {
          this.downloadMedia(this.node);
          return;
        }
        await this.nodeClick(this.node);
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
      grid-gap: 20px;
      grid-template-columns: 48px 1fr;
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
        height: 48px;
        width: 100%;
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
        .delo-status {
          display: flex;
          align-items: center;
          color: #808080;
          font-weight: 600;
          font-size: 13px;
          margin-right: -25px;
          &:before {
            margin-right: 5px;
            content: "";
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #000;
          }
          &.green:before {
            background: #01AA46;
          }
          &.black:before {
            background: #000;
          }
          &.red:before {
            background: #dc2b28;
          }
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
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
  }
</style>
