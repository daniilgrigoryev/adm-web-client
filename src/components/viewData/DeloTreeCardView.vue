<template>
  <div v-if="dataStore" class="layout">
    <Layout class="layout--inner" style="min-height: calc(100vh - 66px);">
      <div v-if="deloContext" class="bg-white">
        <!-- style="padding-left: 60px; padding-right: 40px; padding-bottom: 10px; padding-top: 40px;" -->
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
              <Icon class="color-green-bas mx6" type="ios-checkmark-circle-outline" :size="23"/>
              <span class="adm-txt-regular line30_letter02">{{deloContext.stadName}}</span>
            </p>
          </div>
          <div>
            <Poptip v-if="menuVisible(menu.createDelo)" width="350" placement="bottom-start" class="amd-poptip-sub">
              <Button type="text"
                      class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                      style="box-shadow: none">
                <span>Создать дело  <Icon type="md-arrow-dropdown" :size="16"/></span>
              </Button>
              <div slot="content">
                <ul class="amd-poptip-sub__nav">
                  <li v-if="menuItemVisible(menu.createDelo.ProtAPNAnothFace)">
                    <Button type="text" class="adm-btn-regular">Протокол об АПН на другое лицо</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.createDelo.OpredAPNAnothFace)">
                    <Button type="text" class="adm-btn-regular">Определение об АПН на другое лицо</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.createDelo.PostAPNAnothFace)">
                    <Button type="text" class="adm-btn-regular">Постановление об АПН на другое лицо</Button>
                  </li>
                </ul>
              </div>
            </Poptip>

            <Poptip v-if="menuVisible(menu.addDocument)" placement="bottom-end" class="amd-poptip-sub"><!--  width="700" -->
              <Button type="text"
                      class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                      style="box-shadow: none">
                <span>Добавить документ
                  <Icon type="md-arrow-dropdown" :size="16"/>
                </span>
              </Button>
              <div slot="content">
                <ul class="amd-poptip-sub__nav">
                  <li v-if="menuItemVisible(menu.addDocument.ApplyDocOnDelo)">
                    <Button type="text" class="adm-btn-regular">Приложить документ к делу</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.AddFotoVideo)">
                    <Button type="text" class="adm-btn-regular">Добавить фото и видеоматериалы</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.Explanation)">
                    <Button type="text" class="adm-btn-regular">Объяснение</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.ProtAPN)">
                    <Button @click="createWizardScenarioAPN" type="text" class="adm-btn-regular">Протокол об АПН</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.OpredProvedAP)">
                    <Button @click="createWizardScenarioDefinition" type="text" class="adm-btn-regular">Опредение о проведении АР</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.PostDeloAPN)">
                    <Button @click="createWizardScenarioPost" type="text" class="adm-btn-regular">Постановление по делу об АПН</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.PostPrekrDeloAPN)">
                    <Button type="text" class="adm-btn-regular">Постановление о прекращении дела об АПН</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.Izvesh)">
                    <Button type="text" class="adm-btn-regular">Извещение</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.ChangeDateRasmDelo)">
                    <Button type="text" class="adm-btn-regular">Перенос даты рассмотрения дела</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.HodatayProdlSrok)">
                    <Button type="text" class="adm-btn-regular">Ходатайство о продлении сроков административного расследования</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.DecicAppeal)">
                    <Button type="text" class="adm-btn-regular">Решение по жалобе</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.ConclusAppeal)">
                    <Button type="text" class="adm-btn-regular">Заключение по жалобе</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument.DocumentUchast)">
                    <Button type="text" class="adm-btn-regular">Документ участника</Button>
                  </li>
                </ul>
              </div>
            </Poptip>

            <Button v-if="menuVisible(menu.addUchast)"
                    type="text"
                    @click="addUchastWizard"
                    class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                    style="box-shadow: none">
              <span>Добавить участника</span>
            </Button>

            <Button v-if="menuVisible(menu.addIspoln)"
                    type="text"
                    class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                    style="box-shadow: none">
              <span>Добавить исполнение</span>
            </Button>

            <Button type="text"
                    class="bg-transparent border--0 link color-blue-base px0 py0 mb0 mx18 txt-underline-on-hover">
              <img src="../../assets/images/print.png" alt="" style="vertical-align: middle; margin-right: 20px;">
              <span
                style="color: #1888CC;	font-family: 'Open Sans';	font-size: 12px;	letter-spacing: 0.2px;	line-height: 16px;	text-align: center;">печать дела</span>
            </Button>
            <!--
                        <ButtonGroup>
                          <Button type="default" @click="clearInnerStack">Очистить стэк</Button>
                          <Button type="default" @click="addUchastWizard">Добавить участника</Button>
                        </ButtonGroup> -->
          </div>
        </div>


      </div>


      <hr class="txt-hr my0">
      <div v-if="deloTree">
        <Row type="flex">
          <Col>
            <div class="bg-blue-thin tree_wrapper">
              <tree-node v-for="(item, index) in tree" :key="index" :node="item" :nodeClick="nodeClick"></tree-node>
            </div>
          </Col>
          <Col class="col"> <!-- :xs="24" :sm="16" :md="16" :lg="16" -->
            <div class="wmax940"><!-- mx-auto -->
              <delo-inner-form ref="innerForm"
                               :sizeInnerStack="sizeInnerStack"
                               @updateSizeStack="updateSizeStack"
                               @getMainDelo="getMainDelo"
                               @updateSelected="updateSelected"></delo-inner-form>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import Stack from '../../assets/js/api/stack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import {mapGetters} from 'vuex';
  import DeloInnerForm from "~/components/delo/DeloInnerForm";
  import TreeNode from "~/components/shared/TreeNode";
  import decisEnum from "../../assets/js/utils/decisEnum";
  import docTipEnum from "../../assets/js/utils/docTipEnum";

  export default {
    name: "DeloTreeCardView",
    components: {
      DeloInnerForm,
      TreeNode
    },
    async created() {

      await this.init();

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
    },
    async destroyed() {
      let current = formStack.getCurrent();
      let prev = formStack.getPrev();
      if ((funcUtils.isEmpty(prev) || prev.routeName !== this.$store.state.deloTreeCardView.routeName) && (funcUtils.isNotEmpty(current) && current.routeName !== this.$store.state.deloTreeCardView.routeName)) {
        this.clearIfExist();
      }
      this.$store.dispatch('deloTreeCardViewSetCid', null);
      this.$store.dispatch('deloTreeCardViewSetData', null);
    },
    data() {
      return {
        sizeInnerStack: 0,
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
      async init(mainDeloId) {
        try {
          let current = formStack.getCurrent();
          await this.$store.dispatch('deloTreeCardViewSetCid', current.cid);
          let prepareParams = {
            method: 'restore'
          };
          if (funcUtils.isNotEmpty(this.$route.params.deloId) && funcUtils.isEmpty(mainDeloId)) {
            this.clearIfExist();
          }
          let deloId = mainDeloId || this.$route.params.deloId;
          if (funcUtils.isNotEmpty(deloId)) {
            prepareParams.method = 'getData';
            prepareParams.params = {
              'deloId': deloId
            };
            let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
            let innerStack = funcUtils.getFromSessionStorage(uid);
            if (funcUtils.isNotEmpty(innerStack)) {
              await this.clearInnerStack();
            } else {
              funcUtils.addToSessionStorage(uid, new Stack());
            }
          }
          this.updateSizeStack();

          let eventResponse = await RequestApi.prepareData(prepareParams);
          await this.$store.dispatch('fillModule', {'event': eventResponse});
          if (this.sizeInnerStack === 0) {
            if (this.$refs.innerForm) {
              this.nodeClick(this.deloInfo);
            }
          } else {
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
      async clearIfExist() {
        let toRemove = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          let key = sessionStorage.key(i);
          if (funcUtils.isString(key) && key.indexOf(this.$store.state.deloTreeCardView.moduleName) !== -1) {
            if (formStack.stackSize() > 0) {
              await innerFormStack.clearStack(key);
            }
            toRemove.push(key);
          }
        }
        for (let i = 0; i < toRemove.length; i++) {
          let key = toRemove[i];
          sessionStorage.removeItem(key);
        }
      },
      async clearComponent() {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        await innerFormStack.clearStack(uid);
        sessionStorage.removeItem(uid);
      },
      async getDelo() {
        await this.nodeClick(this.deloInfo);
      },
      updateSelected() {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
        this.deloTree.forEach((item) => {
          let copyNode = this.getCopyObj(item, 'selected', 'children', 'height');
          copyNode = JSON.stringify(copyNode);
          this.$set(item, 'selected', funcUtils.isNotEmpty(currentForm) && JSON.stringify(currentForm.params) === copyNode);
        });
      },
      getCopyObj(node) {
        let cache = [];
        let objectJSONreplacer = function (key, value) {
          if (typeof value === 'object' && funcUtils.isNotEmpty(value)) {
            if (cache.indexOf(value) !== -1) {
              try {
                return JSON.parse(JSON.stringify(value));
              } catch (error) {
                return;
              }
            }
            cache.push(value);
          }
          return value;
        };
        let copyObj = JSON.parse(JSON.stringify(node, objectJSONreplacer));
        cache = null;
        if (arguments.length > 1) {
          for (let i = 1; i < arguments.length; i++) {
            delete copyObj[arguments[i]];
          }
        }
        return copyObj;
      },
      async nodeClick(node) {
        await this.clearInnerStack();
        let copyNode = this.getCopyObj(node, 'selected', 'children', 'height');

        if (this.$refs.innerForm) {
          await this.$refs.innerForm.addForm(copyNode);
          this.updateSelected();
        }
      },
      changeClass(stadKod) {
        if (funcUtils.isNotEmpty(stadKod)) {
          switch (stadKod) {
            case 1: {
              // Возбуждено
              return "color-red";
            }
            case 2: {
              // Рассмотрение
              return "color-orange";
            }
            case 3: {
              // Обжалование
              return "color-yellow";
            }
            case 4: {
              // Пересмотр
              return "color-green";
            }
            case 5: {
              // Исполнение
              return "color-blue";
            }
            case 6: {
              // Исполнено
              return "color-purple";
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
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
        if (funcUtils.isEmpty(currentForm)) {
          return false;
        }

        switch (item) {
          case 'ProtAPNAnothFace': {
            return currentForm.params.recType === 'DELO';
          }
          case 'OpredAPNAnothFace': {
            return currentForm.params.recType === 'DELO';
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
            return currentForm.params.recType === 'DELO' && (this.deloContext.stadKod === 6 || this.deloContext.stadKod === 7) && decisGalobs.length > 0;
          }
          case 'ApplyDocOnDelo': {
            return currentForm.params.recType === 'DELO';
          }
          case 'AddFotoVideo': {
            return currentForm.params.recType === 'DELO';
          }
          case 'Explanation': {
            return currentForm.params.recType === 'DELO';
          }
          case 'ProtAPN': {
            let apnDocs = this.dataStore.tree.filter((item) => {
              return item.recType === 'DOCS_POST' || item.recType === 'DOCS_PROT';
            });
            let pztcDocs = this.dataStore.tree.filter((item) => {
              return (item.recType === 'DOCS_OTHER' && item.kod === docTipEnum.PROT_ZADER_TC) || item.recType === 'DOCS_OPRED';
            });

            return currentForm.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2) && (apnDocs.length === 0 || pztcDocs.length > 0);
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
            return currentForm.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2) && (decisVozbAPN.length === 0 && apnDocs.length === 0) || (pztcDocs.length > 0 && currentDate > (this.deloContext.deloDate + twoDays));
          }
          case 'PostDeloAPN': {
            let apnPost = this.dataStore.tree.filter((item) => {
              return item.recType === 'DOCS_POST';
            });
            let apnProt = this.dataStore.tree.filter((item) => {
              return item.recType === 'DOCS_PROT';
            });
            return currentForm.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2) && apnProt.length > 0 && apnPost.length === 0;
          }
          case 'PostPrekrDeloAPN': {
            return currentForm.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2);
          }
          case 'Izvesh': {
            let apnPost = this.dataStore.tree.filter((item) => {
              return item.recType === 'DOCS_POST';
            });
            return (currentForm.params.recType === 'DOCS_OPRED' || currentForm.params.recType === 'DOCS_PROT') && apnPost.length === 0;
          }
          case 'ChangeDateRasmDelo': {
            return currentForm.params.recType === 'DOCS_OPRED' || currentForm.params.recType === 'DOCS_PROT';
          }
          case 'HodatayProdlSrok': {
            return currentForm.params.recType === 'DOCS_OPRED' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2);
          }
          case 'DecicAppeal': {
            return currentForm.params.recType === 'DOCS_GALOB';
          }
          case 'ConclusAppeal': {
            return currentForm.params.recType === 'DOCS_GALOB';
          }
          case 'DocumentUchast': {
            return currentForm.params.recType === 'UCHASTFL' || currentForm.params.recType === 'UCHASTUL' || currentForm.params.recType === 'UCHASTOTHER';
          }
          case 'AddIspoln': {
            return currentForm.params.recType === 'DECIS' && this.deloContext.stadKod !== 7;
          }
          case 'AddUchast': {
            return currentForm.params.recType === 'DELO';
          }
        }
        return false;
      },
      menuVisible(menuItem) {
        let res = false;
        let items = Object.values(menuItem);
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          let itemVisible = this.menuItemVisible(item);
          if (itemVisible) {
            res = true;
            break;
          }
        }
        return res;
      },
      arrayToTree(arr) {
        let tree = [];
        let mappedArr = {};
        let arrElem;
        let mappedElem;
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);

        let copyDelo = this.getCopyObj(arr[0], 'children');
        tree.push(copyDelo);
        arr.forEach((item) => {
          this.$set(item, 'selected', funcUtils.isNotEmpty(currentForm) && JSON.stringify(currentForm.params) === JSON.stringify(item));
        });

        for (let i = 0; i < arr.length; i++) {
          arrElem = arr[i];
          arrElem.height = 0;
          mappedArr[arrElem.category] = arrElem;
          mappedArr[arrElem.category].children = [];
        }

        for (let i = 0; i < arr.length; i++) {
          arrElem = arr[i];
          if (arrElem.parentCategory) {
            mappedArr[arrElem.parentCategory].children.push(arrElem);
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
      isParent(node) {
        return node.height === 3;
      },
      async clearInnerStack() {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        await innerFormStack.clearStack(uid);
        if (this.$refs.innerForm) {
          this.$refs.innerForm.clearCurrent();
        }
        this.sizeInnerStack = 0;
        // this.updateSelected();
      },
      updateSizeStack() {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        this.sizeInnerStack = innerFormStack.stackSize(uid);
      },
      getSelectedNode() {
        return this.deloTree.filter((item) => {
          if (item.selected) {
            return item;
          }
        })[0];
      },
      async getPrev() {
        try {
          await this.clearComponent();
          formStack.toPrev({
            vm: this
          });

          let current = formStack.getCurrent();
          if (current.routeName === this.$store.state.deloTreeCardView.routeName) {
            await this.init(current.params.deloId);
            this.$refs.innerForm.init();
          }
        } catch (e) {
          alert(e.message);
        }
      },
      addUchastWizard() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height');
          let params = {
            scenarioName: 'AddUchast',
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
      createWizardScenarioPZTC() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height');
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
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height');
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
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height');
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
      createWizardScenarioPost() {
        try {
          let copyNode = this.getCopyObj(this.getSelectedNode(), 'selected', 'children', 'height');
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
  .delo__headding {
    border-bottom: 2px solid transparent;
  }

  .delo__headding:hover {
    border-bottom: 2px solid #00b1ff;
  }
</style>


