<template>
  <div v-if="dataStore" class="layout">
    <Layout class="layout--inner" style="min-height: calc(100vh - 66px);">


      <div v-if="deloContext" class="bg-white">
        <!-- style="padding-left: 60px; padding-right: 40px; padding-bottom: 10px; padding-top: 40px;" -->
        <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross px60 py12">
          <div class="flex-parent flex-parent--center-cross">

            <Button @click="getPrev" type="text" style="outline: 0!important;"
                    class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus" title="вернуться назад">
              <Icon type="ios-arrow-dropleft"
                    class="  px0 py0 mx0 my0" :size="45"/>
            </Button>

            <a href="#" @click="getDelo" class="delo__headding link color-dark-lighter color-blue-light-on-hover">
              <span class="adm-h3">Дело №</span>
              <span class="adm-h1">{{deloContext.deloN}}</span>
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
                  <li v-if="menuItemVisible(menu.createDelo[0])">
                    <Button type="text" class="adm-btn-regular">Протокол об АПН на другое лицо</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.createDelo[1])">
                    <Button type="text" class="adm-btn-regular">Определение об АПН на другое лицо</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.createDelo[2])">
                    <Button type="text" class="adm-btn-regular">Постановление об АПН на другое лицо</Button>
                  </li>
                </ul>
              </div>
            </Poptip>

            <Poptip v-if="menuVisible(menu.addDocument)" width="700" placement="bottom-end" class="amd-poptip-sub">
              <Button type="text"
                      class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                      style="box-shadow: none">
                <span>Добавить документ
                  <Icon type="md-arrow-dropdown" :size="16"/>
                </span>
              </Button>
              <div slot="content">
                <ul class="amd-poptip-sub__nav">
                  <li v-if="menuItemVisible(menu.addDocument[0])">
                    <Button type="text" class="adm-btn-regular">Приложить документ к делу</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[1])">
                    <Button type="text" class="adm-btn-regular">Добавить фото и видеоматериалы</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[2])">
                    <Button type="text" class="adm-btn-regular">Объяснение</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[3])">
                    <Button type="text" class="adm-btn-regular">Протокол об АПН</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[4])">
                    <Button type="text" class="adm-btn-regular">Опредение о проведении АР</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[5])">
                    <Button type="text" class="adm-btn-regular">Постановление по делу об АПН</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[6])">
                    <Button type="text" class="adm-btn-regular">Постановление о прекращении дела об АПН</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[7])">
                    <Button type="text" class="adm-btn-regular">Извещение</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[8])">
                    <Button type="text" class="adm-btn-regular">Перенос даты рассмотрения дела</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[9])">
                    <Button type="text" class="adm-btn-regular">Ходатайство о продлении сроков административного расследования</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[10])">
                    <Button type="text" class="adm-btn-regular">Решение по жалобе</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[11])">
                    <Button type="text" class="adm-btn-regular">Заключение по жалобе</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[12])">
                    <Button type="text" class="adm-btn-regular">Приостановление исполнения</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[13])">
                    <Button type="text" class="adm-btn-regular">Возобновление исполнения</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[14])">
                    <Button type="text" class="adm-btn-regular">Уплата штрафа (ГИБДД)</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[15])">
                    <Button type="text" class="adm-btn-regular">Передача в ГИБДД</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[16])">
                    <Button type="text" class="adm-btn-regular">Возврат материала из суда</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[17])">
                    <Button type="text" class="adm-btn-regular">Проверено после возврата из ФССП</Button>
                  </li>
                  <li v-if="menuItemVisible(menu.addDocument[18])">
                    <Button type="text" class="adm-btn-regular">Документ участника</Button>
                  </li>
                </ul>
              </div>
            </Poptip>

            <Button type="text"
                    class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                    style="box-shadow: none">
              <span>Добавить участника</span>
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
          createDelo: [
            'ProtAPNAnothFace',
            'OpredAPNAnothFace',
            'PostAPNAnothFace'
          ],
          addDocument: [
            'ApplyDocOnDelo',
            'AddFotoVideo',
            'Explanation',
            'ProtAPN',
            'OpredProvedAP',
            'PostDeloAPN',
            'PostPrekrDeloAPN',
            'Izvesh',
            'ChangeDateRasmDelo',
            'HodatayProdlSrok',
            'DecicAppeal',
            'ConclusAppeal',
            'SuspensIspoln',
            'ResumptIspoln',
            'PaymentShtraf',
            'TransferGIBDD',
            'ReturnMaterial',
            'CheckReturnFSSP',
            'DocumentUchast'
          ]
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
            return currentForm.params.recType === 'DELO' && (this.deloContext.stadKod === 6 || this.deloContext.stadKod === 7);
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
            return currentForm.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2);
          }
          case 'OpredProvedAP': {
            return currentForm.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2);
          }
          case 'PostDeloAPN': {
            return currentForm.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2);
          }
          case 'PostPrekrDeloAPN': {
            return currentForm.params.recType === 'DELO' && (this.deloContext.stadKod === 1 || this.deloContext.stadKod === 2);
          }
          case 'Izvesh': {
            break;
          }
          case 'ChangeDateRasmDelo': {
            break;
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
          case 'SuspensIspoln': {
            return currentForm.params.recType === 'DECIS';
          }
          case 'ResumptIspoln': {
            return currentForm.params.recType === 'DECIS';
          }
          case 'PaymentShtraf': {
            return currentForm.params.recType === 'DECIS';
          }
          case 'TransferGIBDD': {
            break;
          }
          case 'ReturnMaterial': {
            break;
          }
          case 'CheckReturnFSSP': {
            break;
          }
          case 'DocumentUchast': {
            return currentForm.params.recType === 'UCHASTFL' || currentForm.params.recType === 'UCHASTUL' || currentForm.params.recType === 'UCHASTOTHER';
          }
        }
        return false;
      },
      menuVisible(items) {
        let res = false;
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

        for (let i = 0, len = arr.length; i < len; i++) {
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


