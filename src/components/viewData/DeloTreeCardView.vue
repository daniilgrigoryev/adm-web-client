<template>
  <div v-if="dataStore" class="layout">
    <div v-if="pdfData" class="pdf-viewer">
      <Icon @click="clearDocument" type="md-close" size="23" class="color-blue-base absolute right mr18 cursor-pointer"/>
      <embed class="pdf-data" :src="pdfData" />
    </div>
    <Layout class="layout--inner" style="min-height: calc(100vh - 66px);">
      <div v-if="deloContext" class="bg-white deloContext-sticky">
        <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross px60 py6">
          <div class="flex-parent flex-parent--center-cross">

            <Button @click="getPrev" type="text" style="outline: 0!important;"
                    class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus" title="вернуться назад">
              <Icon type="ios-arrow-dropleft"
                    class="  px0 py0 mx0 my0" :size="30"/>
            </Button>

            <a href="#" @click="getDelo" class="delo__headding link color-dark-lighter color-blue-light-on-hover">
              <span class="adm-h3">Дело №</span>
              <span class="adm-h2">{{deloContext.deloN}}</span>
            </a>
            <p class="ml24 flex-parent flex-parent--center-cross" :class="changeClass(deloContext.stadKod)">
              <Icon class="mx6" type="ios-checkmark-circle" :size="23"/>
              <span class="adm-txt-regular line30_letter02">{{deloContext.stadName}}</span>
            </p>
          </div>
          <div>
            <Poptip @click.native="menuVisibleContent('menuCreateDelo', menu.createDelo)" ref="menuCreateDelo" width="350" placement="bottom-start" class="amd-poptip-sub">
              <Button type="text"
                      :disabled="!menuVisible(menu.createDelo)"
                      class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                      style="box-shadow: none">
                <span>Создать дело  <Icon v-if="menuVisible(menu.createDelo)" type="md-arrow-dropdown" :size="16"/></span>
              </Button>
              <div slot="content">
                <ul class="amd-poptip-sub__nav">
                  <li>
                    <Button :disabled="!menuItemVisible(menu.createDelo.ProtAPNAnothFace)" @click="createWizardScenarioProtTaxi(true)" type="text" class="adm-btn-regular">Протокол об АПН на другое лицо</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.createDelo.OpredAPNAnothFace)" @click="createWizardScenarioDefinitionTaxi(true)" type="text" class="adm-btn-regular">Определение об АПН на другое лицо</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.createDelo.PostAPNAnothFace)" type="text" class="adm-btn-regular">Постановление об АПН на другое лицо</Button>
                  </li>
                </ul>
              </div>
            </Poptip>

            <Poptip @click.native="menuVisibleContent('menuAddDocument', menu.addDocument)" ref="menuAddDocument" placement="bottom-end" class="amd-poptip-sub"><!--  width="700" -->
              <Button type="text"
                      :disabled="!menuVisible(menu.addDocument)"
                      class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                      style="box-shadow: none">
                <span>Добавить документ
                  <Icon v-if="menuVisible(menu.addDocument)" type="md-arrow-dropdown" :size="16"/>
                </span>
              </Button>
              <div slot="content">
                <ul class="amd-poptip-sub__nav" style="max-width: 450px;">
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.ApplyDocOnDelo)" type="text" class="adm-btn-regular">Приложить документ к делу</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.AddFotoVideo)" @click="addDocPhotoWizard" type="text" class="adm-btn-regular">Добавить фото и видеоматериалы</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.Explanation)" type="text" class="adm-btn-regular">Объяснение</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.ProtAPN)" @click="createWizardScenarioAPN" type="text" class="adm-btn-regular">Протокол об АПН</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.OpredProvedAP)" @click="createWizardScenarioDefinition" type="text" class="adm-btn-regular">Опредение о проведении АР</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.PostDeloAPN)" @click="createWizardScenarioPost" type="text" class="adm-btn-regular">Постановление по делу об АПН</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.PostPrekrDeloAPN)" @click="createWizardProtStopDelo" type="text" class="adm-btn-regular">Постановление о прекращении дела об АПН</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.Izvesh)" type="text" class="adm-btn-regular">Извещение</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.ChangeDateRasmDelo)" type="text" class="adm-btn-regular">Перенос даты рассмотрения дела</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.HodatayProdlSrok)" type="text" class="adm-btn-regular">Ходатайство о продлении сроков административного расследования</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.DecicAppeal)" type="text" class="adm-btn-regular">Решение по жалобе</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.ConclusAppeal)" type="text" class="adm-btn-regular">Заключение по жалобе</Button>
                  </li>
                  <li>
                    <Button :disabled="!menuItemVisible(menu.addDocument.DocumentUchast)" type="text" @click="addPredDocWizard" class="adm-btn-regular">Документ участника</Button>
                  </li>
                </ul>
              </div>
            </Poptip>

            <Button :disabled="!menuVisible(menu.addUchast)"
                    type="text"
                    @click="addUchastWizard"
                    class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                    style="box-shadow: none">
              <span>Добавить участника</span>
            </Button>

            <Button :disabled="!menuVisible(menu.addIspoln)"
                    type="text"
                    @click="addIspolnWizard"
                    class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                    style="box-shadow: none">
              <span>Добавить исполнение</span>
            </Button>

            <Button type="text"
                    @click="printDocument"
                    class="bg-transparent border--0 link color-blue-base px0 py0 mb0 mx18 txt-underline-on-hover">
              <img src="../../assets/images/print.png" alt="" style="vertical-align: middle; margin-right: 20px;">
              <span
                style="color: #1888CC;	font-family: 'Open Sans';	font-size: 12px;	letter-spacing: 0.2px;	line-height: 16px;	text-align: center;">печать дела</span>
            </Button>
          </div>
        </div>
        <hr class="txt-hr my0">
      </div>


      <div v-if="deloTree">
        <Row type="flex">
          <Col>
            <div class="tree_wrapper scroll-styled">
              <tree-node v-for="(item, index) in tree" :key="index" :node="item" :nodeClick="nodeClick"></tree-node>
            </div>
          </Col>
          <Col class="col"> <!-- :xs="24" :sm="16" :md="16" :lg="16" -->
            <div class="wmax940"><!-- mx-auto -->
              <delo-inner-form :currentInnerBean="currentInnerBean"
                               @addForm="addForm" ref="deloInnerForm"
                               @getMainDelo="getMainDelo"></delo-inner-form>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import {mapGetters} from 'vuex';
  import decisEnum from "~/assets/js/utils/decisEnum";
  import decisIspolnEnum from "~/assets/js/utils/decisIspolnEnum";
  import docTipEnum from "~/assets/js/utils/docTipEnum";

  export default {
    name: "DeloTreeCardView",
    components: {
      DeloInnerForm: () => import('~/components/delo/DeloInnerForm'),
      TreeNode: () => import('~/components/viewData/TreeNode')
    },
    async created() {
      await this.init();
      let vm = this;
      this.$store.watch(this.$store.getters.deloTreeCardViewGetCommand, async () => {
        try {
          await vm.init();
        } catch (e) {
          alert(e.message);
        }
      });
    },
    async destroyed() {
      this.$store.dispatch('deloTreeCardViewSetCid', null);
      this.$store.dispatch('deloTreeCardViewSetData', null);
    },
    data() {
      return {
        currentInnerBean: null,
        firstTreeNode: null,
        pdfData: null,
        menu: {
          createDelo: {
            ProtAPNAnothFace: 'ProtAPNAnothFace',
            OpredAPNAnothFace: 'OpredAPNAnothFace',
            PostAPNAnothFace: 'PostAPNAnothFace'
          },
          addDocument: {
            ApplyDocOnDelo: 'ApplyDocOnDelo',
            AddFotoVideo: 'AddFotoVideo',
            Explanation: 'Explanation',
            ProtAPN: 'ProtAPN',
            OpredProvedAP: 'OpredProvedAP',
            PostDeloAPN: 'PostDeloAPN',
            PostPrekrDeloAPN: 'PostPrekrDeloAPN',
            Izvesh: 'Izvesh',
            ChangeDateRasmDelo: 'ChangeDateRasmDelo',
            HodatayProdlSrok: 'HodatayProdlSrok',
            DecicAppeal: 'DecicAppeal',
            ConclusAppeal: 'ConclusAppeal',
            DocumentUchast: 'DocumentUchast'
          },
          addUchast: {AddUchast: 'AddUchast'},
          addIspoln: {AddIspoln: 'AddIspoln'}
        }
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'deloTreeCardViewGetData'
      }),
      deloTree() {
        let res = [];
        if (this.dataStore) {
          for (let i = 0; i < this.dataStore.tree.length; i++) {
            let item = this.dataStore.tree[i];
            res.push(item);
          }
        }
        return res;
      },
      tree() {
        let res = [];
        if (this.dataStore) {
          res = this.arrayToTree(this.deloTree);
        }
        return res;
      },
      deloInfo() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.tree.getFirst();
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
      async init(mainDeloId) {
        try {
          let current = formStack.getCurrent();
          await this.$store.dispatch('deloTreeCardViewSetCid', current.cid);
          let prepareParams = {
            method: 'restore'
          };
          let deloId = mainDeloId || current.params.deloId;
          if (funcUtils.isNotEmpty(deloId)) {
            delete current.params.deloId;
            formStack.updateCurrent(current);
            prepareParams.method = 'getData';
            prepareParams.params = {
              'deloId': deloId
            };
          }

          let eventResponse = await RequestApi.prepareData(prepareParams);
          await this.$store.dispatch('fillModule', {'event': eventResponse});

          if (innerFormStack.stackSize() === 0) {
            this.getDelo();
          } else {
            this.currentInnerBean = {
              beanName: innerFormStack.getCurrent().beanName,
              cid: innerFormStack.getCurrent().cid
            };
            this.updateSelected();
          }
        } catch (e) {
          alert(e.message);
        }
      },
      async getMainDelo(mainDeloId) {
        try {
          let params = {
            deloId: mainDeloId
          };

          await formStack.toNext({
            module: this.$store.state.deloTreeCardView,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
          await this.init(mainDeloId);
        } catch (e) {
          alert(e.message);
        }
      },
      async getDelo() {
        await this.nodeClick(this.deloInfo);
      },
      updateSelected() {
        let current = innerFormStack.getCurrent();
        let jsonParams = null;
        if (funcUtils.isNotEmpty(current)) {
          jsonParams = this.stringifyCircularNode(current.params);
        }
        let firstTreeNode = JSON.stringify(this.getCopyObj(this.firstTreeNode, 'selected', 'children', 'height', 'nodeParams'));
        this.$set(this.firstTreeNode, 'selected', jsonParams === firstTreeNode);
        this.dataStore.tree.forEach((item) => {
          let copyNode = JSON.stringify(this.getCopyObj(item, 'selected', 'children', 'height', 'nodeParams'));
          this.$set(item, 'selected', jsonParams === copyNode);
        });
      },
      async addForm(node) {
        let eventResponse = await RequestApi.prepareData({
          method: 'getBeanNameByNode',
          params: {
            node: node
          }
        });
        let beanName = JSON.parse(eventResponse.response).data.beanName;
        await innerFormStack.toNext({
          beanName: beanName,
          params: node
        });
        this.currentInnerBean = {
          beanName: innerFormStack.getCurrent().beanName,
          cid: innerFormStack.getCurrent().cid
        };
      },
      async removeForm() {
        await innerFormStack.toPrev();
        this.currentInnerBean = {
          beanName: innerFormStack.getCurrent().beanName,
          cid: innerFormStack.getCurrent().cid
        };
      },
      getCopyObj(node) {
        let copyObj = JSON.parse(this.stringifyCircularNode(node));
        if (arguments.length > 1) {
          for (let i = 1; i < arguments.length; i++) {
            delete copyObj[arguments[i]];
          }
        }
        return copyObj;
      },
      stringifyCircularNode(node) {
        const seen = new WeakSet();
        let objectJSONreplacer = (key, value) => {
          if (typeof value === 'object' && funcUtils.isNotEmpty(value)) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
        return JSON.stringify(node, objectJSONreplacer);
      },
      async nodeClick(node) {
        await innerFormStack.clearStack();
        let copyNode = this.getCopyObj(node, 'selected', 'children', 'height', 'nodeParams');

        await this.addForm(copyNode);
        this.updateSelected();
      },
      changeClass(stadKod) {
        if (funcUtils.isNotEmpty(stadKod)) {
          switch (stadKod) {
            case 1: {
              // Возбуждено
              return "color-black";
            }
            case 2: {
              // Рассмотрение
              return "color-black";
            }
            case 3: {
              // Обжалование
              return "color-black";
            }
            case 4: {
              // Пересмотр
              return "color-black";
            }
            case 5: {
              // Исполнение
              return "color-black";
            }
            case 6: {
              // Исполнено
              return "color-black";
            }
            case 7: {
              // Прекращено
              return "color-red";
            }
            default: {
              return "";
            }
          }
        }
      },
      menuItemVisible(item) {
        let current = innerFormStack.getCurrent();
        if (funcUtils.isEmpty(current)) {
          return false;
        }

        switch (item) {
          case 'ProtAPNAnothFace': {
            return current.params.recType === 'DELO';
          }
          case 'OpredAPNAnothFace': {
            return current.params.recType === 'DELO';
          }
          case 'PostAPNAnothFace': {
            let galobs = {};
            let decisGalobs = [];
            let arrElem;

            for (let i = 0; i < this.dataStore.tree.length; i++) {
              arrElem = this.dataStore.tree[i];
              if (arrElem.recType === 'DOCS_GALOB') {
                galobs[arrElem.category] = arrElem;
              }
            }

            for (let i = 0; i < this.dataStore.tree.length; i++) {
              arrElem = this.dataStore.tree[i];
              let galob = galobs[arrElem.parentCategory];
              if (galob && arrElem.kod === decisEnum.PREKRASH_DELO) {
                decisGalobs.push(arrElem);
              }
            }
            return current.params.recType === 'DELO' && (this.deloContext.stadKod === 6 || this.deloContext.stadKod === 7) && decisGalobs.length > 0;
          }
          case 'ApplyDocOnDelo': {
            return current.params.recType === 'DELO';
          }
          case 'AddFotoVideo': {
            return current.params.recType === 'DELO';
          }
          case 'Explanation': {
            return current.params.recType === 'DELO';
          }
          case 'ProtAPN': {
            let apnDocs = this.dataStore.tree.filter((item) => {
              return item.recType === 'DOCS_POST' || item.recType === 'DOCS_PROT';
            });
            let pztcDocs = this.dataStore.tree.filter((item) => {
              return (item.recType === 'DOCS_OTHER' && item.kod === docTipEnum.PROT_ZADER_TC) || item.recType === 'DOCS_OPRED';
            });

            return current.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2) && (apnDocs.length === 0 || pztcDocs.length > 0);
          }
          case 'OpredProvedAP': {
            let apnDocs = this.dataStore.tree.filter((item) => {
              return item.recType === 'DOCS_POST' || item.recType === 'DOCS_PROT';
            });
            let pztcDocs = this.dataStore.tree.filter((item) => {
              return item.recType === 'DOCS_OTHER' && item.kod === docTipEnum.PROT_ZADER_TC;
            });
            let twoDays = 1000 * 60 * 60 * 24 * 2;
            let currentDate = new Date();
            let opreds = {};
            let decisVozbAPN = [];
            let arrElem;

            for (let i = 0; i < this.dataStore.tree.length; i++) {
              arrElem = this.dataStore.tree[i];
              if (arrElem.recType === 'DOCS_OPRED') {
                opreds[arrElem.category] = arrElem;
              }
            }

            for (let i = 0; i < this.dataStore.tree.length; i++) {
              arrElem = this.dataStore.tree[i];
              let opred = opreds[arrElem.parentCategory];
              if (opred && arrElem.kod === decisEnum.VOZB_DELO_APN) {
                decisVozbAPN.push(arrElem);
              }
            }
            return current.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2) && (decisVozbAPN.length === 0 && apnDocs.length === 0) || (pztcDocs.length > 0 && currentDate > (this.deloContext.deloDate + twoDays));
          }
          case 'PostDeloAPN': {
            let apnPost = this.dataStore.tree.filter((item) => {
              return item.recType === 'DOCS_POST';
            });
            let apnProt = this.dataStore.tree.filter((item) => {
              return item.recType === 'DOCS_PROT';
            });
            return current.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2) && apnProt.length > 0 && apnPost.length === 0;
          }
          case 'PostPrekrDeloAPN': {
            return current.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2);
          }
          case 'Izvesh': {
            let apnPost = this.dataStore.tree.filter((item) => {
              return item.recType === 'DOCS_POST';
            });
            return (current.params.recType === 'DOCS_OPRED' || current.params.recType === 'DOCS_PROT') && apnPost.length === 0;
          }
          case 'ChangeDateRasmDelo': {
            return current.params.recType === 'DOCS_OPRED' || current.params.recType === 'DOCS_PROT';
          }
          case 'HodatayProdlSrok': {
            return current.params.recType === 'DOCS_OPRED' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2);
          }
          case 'DecicAppeal': {
            return current.params.recType === 'DOCS_GALOB';
          }
          case 'ConclusAppeal': {
            return current.params.recType === 'DOCS_GALOB';
          }
          case 'DocumentUchast': {
            return current.params.recType === 'UCHASTFL' || current.params.recType === 'UCHASTOTHER';
          }
          case 'AddIspoln': {
            return current.params.recType === 'DECIS' && this.deloContext.stadKod !== 7;
          }
          case 'AddUchast': {
            return current.params.recType === 'DELO';
          }
        }
        return false;
      },
      menuVisible(menuItem) {
        let res = [];
        let items = Object.values(menuItem);
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          let itemVisible = this.menuItemVisible(item);
          res.push(itemVisible);
        }
        return res.includes(true);
      },
      menuVisibleContent(poptip, elements) {
        if (!this.menuVisible(elements)) {
          this.$refs[poptip].visible = false;
        }
      },
      arrayToTree(arr) {
        let tree = [];
        let mappedArr = {};
        let arrElem;
        let mappedElem;

        for (let i = 0; i < arr.length; i++) {
          arrElem = arr[i];
          if (funcUtils.isNotEmpty(arrElem.nodeInfo)) {
            let nodeParams = JSON.parse(arrElem.nodeInfo);
            for (let key in nodeParams) {
              if (nodeParams.hasOwnProperty(key) && funcUtils.isEmpty(nodeParams[key])) {
                nodeParams[key] = "";
              }
            }
            arrElem.nodeParams = nodeParams;
          }
        }

        this.firstTreeNode = this.getCopyObj(arr.getFirst(), 'children');
        tree.push(this.firstTreeNode);

        this.updateSelected();

        for (let i = 0; i < arr.length; i++) {
          arrElem = arr[i];
          arrElem.height = 0;
          let key = arrElem.category + '-' + arrElem.docId;
          mappedArr[key] = arrElem;
          mappedArr[key].children = [];
        }

        for (let i = 0; i < arr.length; i++) {
          arrElem = arr[i];
          if (arrElem.parentCategory && this.checkPostUvedom(arrElem)) {
            let key = arrElem.parentCategory + '-' + arrElem.parentDocId;
            let parentElem = mappedArr[key];
            parentElem.children.push(arrElem);
          }
        }

        for (let id in mappedArr) {
          if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            if (!mappedElem.parentCategory) {
              this.fillTree(tree, mappedElem, mappedElem);
            }
          }
        }

        return tree;
      },
      fillTree(tree, node, parent) {
        node.height += parent.height + 1;
        if (funcUtils.isNotEmpty(node.parentCategory) && funcUtils.isNotEmpty(node.recType) && this.isParent(node)) {
          tree.push(node);
        }
        if (funcUtils.isNotEmpty(node.children) && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            let nodeChild = node.children[i];
            this.fillTree(tree, nodeChild, node);
          }
        }
      },
      checkPostUvedom(node) {
        if (node.recType === 'DECIS_ISPOLN' && funcUtils.isNotEmpty(node.kod)) {
          switch (node.kod) {
            case decisIspolnEnum.POST_UVEDOM: {
              return true;
            }
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
              return false;
            }
            default: {
              return true;
            }
          }
        }
        return true;
      },
      isParent(node) {
        return node.height === 3;
      },
      getSelectedNode() {
        return this.deloTree.filter((item) => {
          if (item.selected) {
            return item;
          }
        }).getFirst();
      },
      async getPrev() {
        try {
          formStack.toPrev({
            vm: this
          });

          let current = formStack.getCurrent();
          if (current.routeName === this.$store.state.deloTreeCardView.routeName) {
            await this.init(current.params.deloId);
          }
        } catch (e) {
          alert(e.message);
        }
      },
      async printDocument() {
        let current = innerFormStack.getCurrent();
        let eventResponse = await RequestApi.prepareData({
          method: 'getPdfReport',
          cid: current.cid
        });
        if (eventResponse.response) {
          let data = JSON.parse(eventResponse.response).data;
          this.pdfData = 'data:application/pdf;base64,' + data;
        }
      },
      clearDocument() {
        this.pdfData = null;
      },
      addUchastWizard() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'AddUchast',
            node: copyNode,
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
      addPredDocWizard() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'AddPredDoc',
            node: copyNode,
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
      addDocPhotoWizard() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'AddDocPhoto',
            node: copyNode,
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
      addIspolnWizard() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'AddIspoln',
            node: copyNode,
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
      createWizardScenarioPZTC() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'CreateProtEvac',
            node: copyNode
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
      createWizardScenarioDefinition() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'CreateDefinition',
            node: copyNode
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
      createWizardScenarioAPN() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'CreateProtAPN',
            node: copyNode
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
      createWizardScenarioProtTaxi(newDelo) {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'CreateProtTaxi',
            node: copyNode,
            newDelo: newDelo
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
      createWizardScenarioDefinitionTaxi(newDelo) {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'CreateDefinitionTaxi',
            node: copyNode,
            newDelo: newDelo
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
      createWizardProtStopDelo(){
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'CreateProtStopDelo',
            node: copyNode
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
      createWizardScenarioPost() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'CreatePost',
            node: copyNode
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
  .pdf-viewer {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 99;
    background: rgb(82, 86, 89);

    i {
      top: 10px;
      color: #fff;
    }

    .pdf-data {
      position: relative;
      width: 100%;
      height: 100%;
      top: 40px;
    }
  }

  .delo__headding {
    border-bottom: 2px solid transparent;
  }

  .delo__headding:hover {
    border-bottom: 2px solid #00b1ff;
  }
</style>


