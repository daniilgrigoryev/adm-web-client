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
            <!-- TODO -->
            <p class="ml24 flex-parent flex-parent--center-cross" :class="changeClass(deloContext.stadKod)">
              <Icon class="mx6" type="ios-checkmark-circle" :size="23"/>
              <span class="adm-txt-regular line30_letter02">{{deloContext.stadName}}</span>
            </p>
          </div>
          <div class="delo-menu">
            <div class="delo-menu--body-wrap">
              <Poptip @click.native="menuVisibleContent('menuCreateDelo', menu.createDelo)" ref="menuCreateDelo" width="350" placement="bottom-start" class="delo-menu--poptip">
                <button :disabled="!menuVisible(menu.createDelo)" class="action-button">
                  <img :src="require('../../assets/images/create-case.svg')" alt="">
                  <span class="text">Создать дело</span>
                  <Icon type="md-arrow-dropdown" :size="16"/>
                </button>
                <div slot="content">
                  <ul class="delo-menu__poptip-list">
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
              <Poptip @click.native="menuVisibleContent('menuAddDocument', menu.addDocument)" ref="menuAddDocument" placement="bottom-end" class="delo-menu--poptip"><!--  width="700" -->
                <button :disabled="!menuVisible(menu.addDocument)" class="action-button">
                  <img :src="require('../../assets/images/add-document.svg')" alt="">
                  <span class="text">Добавить документ</span>
                  <Icon type="md-arrow-dropdown" :size="16"/>
                </button>
                <div slot="content" class="da">
                  <div class="search-wrap">
                    <img :src="require('../../assets/images/icons8-search.svg')" alt="">
                    <input type="text" class="search" placeholder="Найти…" v-model="searchForAddDocumentList">
                  </div>
                  <ul class="delo-menu__poptip-list">
                    <li v-for="item in filteredAddDocumentList" :key="item.id">
                      <Button :disabled="!menuItemVisible(menu.addDocument[item.visible]) || !item.action"
                              @click="item.action" type="text" class="adm-btn-regular">
                        {{item.text}}
                      </Button>
                    </li>
                  </ul>
                </div>
              </Poptip>
              <button :disabled="!menuVisible(menu.addUchast)" class="action-button" @click="addUchastWizard">
                <img :src="require('../../assets/images/add-participant.svg')" alt="">
                <span class="text">Добавить участника</span>
              </button>
              <button :disabled="!menuVisible(menu.addIspoln)" class="action-button" @click="addIspolnWizard">
                <img :src="require('../../assets/images/add-process.svg')" alt="">
                <span class="text">Добавить исполнение</span>
              </button>
            </div>

            <div class="special-buttons-wrap">
              <button @click="printDocument" title="печать дела">
                <img :src="require('../../assets/images/print.svg')" alt="">
              </button>
              <button @click="getLogs" title="Логи">
                <img :src="require('../../assets/images/log.svg')" alt="" style="right: -2px;">
              </button>
            </div>
            <frm-log v-if="logOpen"></frm-log>

          </div>
        </div>
        <hr class="txt-hr my0">
      </div>


      <div v-if="deloTree">
        <Row type="flex">
          <Col>
            <div class="tree_wrapper"><!-- scroll-styled -->
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
  import * as constants from "~/assets/js/utils/constants";
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
      TreeNode: () => import('~/components/viewData/TreeNode'),
      FrmLog: () => import('~/components/log/FrmLog')
    },
    async created() {
      await this.init();
      let vm = this;
      this.$store.watch(this.$store.getters.deloTreeCardViewGetCommand, async () => {
        try {
          await vm.init();
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
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
            DocumentUchast: 'DocumentUchast',
            Petition: 'Petition',
          },
          addUchast: {AddUchast: 'AddUchast'},
          addIspoln: {AddIspoln: 'AddIspoln'}
        },
        addDocumentList: [
          {
            text: "Приложить документ к делу",
            visible: "ApplyDocOnDelo",
            action: this.addDocPhotoWizard,
          },
          {
            text: "Объяснение",
            visible: "Explanation",
            action: "",
          },
          {
            text: "Протокол об АПН",
            visible: "ProtAPN",
            action: this.createWizardScenarioAPN,
          },
          {
            text: "Определение о проведении АР",
            visible: "OpredProvedAP",
            action: this.createWizardScenarioDefinition,
          },
          {
            text: "Постановление по делу об АПН",
            visible: "PostDeloAPN",
            action: this.createWizardScenarioPostDecisDelo,
          },
          {
            text: "Постановление о прекращении дела об АПН",
            visible: "PostPrekrDeloAPN",
            action: this.createWizardProtStopDelo,
          },
          {
            text: "Извещение",
            visible: "Izvesh",
            action: this.createWizardAddAdvice,
          },
          {
            text: "Перенос даты рассмотрения дела",
            visible: "ChangeDateRasmDelo",
            action: "",
          },
          {
            text: "Ходатайство о продлении сроков административного расследования",
            visible: "HodatayProdlSrok",
            action: this.createWizardAddPetition,
          },
          {
            text: "Определение по ходатайству",
            visible: "Petition",
            action: this.createWizardAddDefinitionPetition,
          },
          {
            text: "Решение по жалобе",
            visible: "DecicAppeal",
            action: "",
          },
          {
            text: "Заключение по жалобе",
            visible: "ConclusAppeal",
            action: "",
          },
          {
            text: "Документ участника",
            visible: "DocumentUchast",
            action: this.addPredDocWizard,
          },
        ],
        searchForAddDocumentList: "",
        logOpen: false,
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'deloTreeCardViewGetData'
      }),
      filteredAddDocumentList() {
        const s = this.searchForAddDocumentList.toLowerCase();
        const a = this.addDocumentList.filter(n => n.text.toLowerCase().includes(s));
        return a.length ? a : [{text: "Нет элементов"}]

      },
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
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
          case 'Petition': {
            return current.params.recType === 'DOCS_OTHER' && current.params.docTip === docTipEnum.PETITION;
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
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
      isTaxi() {
        let currentForm = innerFormStack.getCurrent();
        let nameCapitalized = currentForm.beanName.charAt(0).toLowerCase() + currentForm.beanName.slice(1);
        let data = this.$store.state[nameCapitalized].data;
        return funcUtils.isNotEmpty(data.deloTag) &&  data.deloTag.includes(constants.TAG_TAXI);
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      createWizardScenarioDefinition() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: this.isTaxi() ? 'CreateDefinitionTaxi' : 'CreateDefinition',
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      createWizardScenarioAPN() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: this.isTaxi() ? 'CreateProtTaxi' : 'CreateProtAPN',
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      createWizardScenarioProtTaxi(newDelo) {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: this.isTaxi() ? 'CreateProtTaxi' : 'CreateProtAPN',
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      createWizardScenarioDefinitionTaxi(newDelo) {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: this.isTaxi() ? 'CreateDefinitionTaxi' : 'CreateDefinition',
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      createWizardProtStopDelo() {
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      createWizardScenarioPostDecisDelo() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'CreateProtDecisDelo',
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      createWizardAddPetition() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'AddPetition',
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      createWizardAddDefinitionPetition() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'AddDefinitionPetition',
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      createWizardAddAdvice() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            scenarioName: 'AddAdvice',
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      getLogs() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height', 'nodeParams');
          let params = {
            node: copyNode
          };
          // this.logOpen = !this.logOpen;
          formStack.toNext({
            module: this.$store.state.frmLog,
            vm: this,
            notRemoved: true,
            params: params,
            withCreate: true
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message.error,});
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

  .delo-menu {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 100px;
    align-items: center;
    @media screen and (max-width: 1300px) {
      grid-gap: 10px;
    }
    .delo-menu--body-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .delo-menu--poptip {
        display: flex;
        align-items: center;
        .search-wrap {
          border-bottom: 1px solid #CCCCCC;
          height: 40px;
          padding: 5px 15px;
          display: flex;
          align-items: center;
          img {
            margin-right: 10px;
          }
          .search {
            width: 100%;
            height: 100%;
            border: none;
            font-size: 14px;
            &::placeholder {
              font-style: italic;
              color: #CCCCCC;
            }
          }
        }
        .delo-menu__poptip-list {
          width: 350px;
          padding: 10px 0;
          li {
            display: flex;
            align-items: center;
            button {
              text-align: left;
              white-space: normal;
              border-radius: 0;
              width: 100%;
              margin: 3px 0;
              padding: 3px 15px;
            }
          }
        }
      }
    }
    .action-button {
      display: flex;
      align-items: center;
      color: #1888cc;
      margin: 0 10px;
      transition: .3s ease;
      &:disabled {
        opacity: .3;
        .ivu-icon-md-arrow-dropdown {
          opacity: 0;
        }
      }
      img {
        width: 1em;
        height: 1em;
        font-size: 36px;
      }
      .text {
        padding: 0 5px 0 5px;
      }
    }
    .special-buttons-wrap {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 20px;
      align-items: center;
      button {
        width: 1em;
        height: 1em;
        font-size: 48px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        img {
          position: relative;
        }
        &:before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 0;
          height: 0;
          transition: .3s ease;
          background: #DCE4F7;
          border-radius: 50%;
          z-index: -1;
        }
        &:hover {
          &:before {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>


