<template>
  <div v-if="dataStore" class="layout">
    <Layout class="layout--inner" style="min-height: calc(100vh - 66px);">


      <div v-if="deloContext" class="bg-white">
        <!-- style="padding-left: 60px; padding-right: 40px; padding-bottom: 10px; padding-top: 40px;" -->
        <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross px60 py24">
          <div class="flex-parent flex-parent--center-cross">

            <Button @click="getPrev" type="text" style="outline: 0!important;"
                    class="py0 px0 mr18 bg-transparent-on-hover" title="вернуться назад">
              <Icon type="ios-arrow-dropleft"
                    class="bg-whte color-gray-light color-blue-on-hover transition px0 py0 mx0 my0" :size="45"/>
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
            <Poptip width="350" placement="bottom-start" class="amd-poptip-sub">
              <Button type="text"
                      class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                      style="box-shadow: none">
                <span>Возбуждение дела  <Icon type="md-arrow-dropdown" :size="16"/></span>
              </Button>
              <div slot="content">
                <ul class="amd-poptip-sub__nav">
                  <li>
                    <Button type="text" class="adm-btn-regular">Определение о возбуждении дела</Button>
                  </li>
                  <li>
                    <Button type="text" class="adm-btn-regular">Протокол изъятия вещей и документов</Button>
                  </li>
                  <li>
                    <Button type="text" class="adm-btn-regular">Протокол осмотра места</Button>
                  </li>
                </ul>
              </div>
            </Poptip>

            <Poptip width="700" placement="bottom-end" class="amd-poptip-sub">
              <Button @click="hideMore = !hideMore" type="text"
                      class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                      style="box-shadow: none">
                <span>Рассмотрение дела 
                  <Icon v-if="hideMore" type="md-arrow-dropup" :size="16"/>
                  <Icon v-else type="md-arrow-dropdown" :size="16"/>
                </span>
              </Button>
              <div slot="content">
                <div class="grid">
                  <div class="col col--6">
                    <ul class="amd-poptip-sub__nav">
                      <li>
                        <Button type="text" class="adm-btn-regular">Постановление об АПН</Button>
                      </li>
                      <li>
                        <Button type="text" class="adm-btn-regular">Определение об АПН</Button>
                      </li>
                      <li>
                        <Button type="text" class="adm-btn-regular">Протокол об АПН на бланке</Button>
                      </li>
                      <hr class="txt-hr adm-txt-hr my0">
                      <li>
                        <Button type="text" class="adm-btn-regular">Жалоба</Button>
                      </li>
                      <li>
                        <Button type="text" class="adm-btn-regular">Решение по жалобе</Button>
                      </li>
                      <li>
                        <Button type="text" class="adm-btn-regular">Заключение по жалобе</Button>
                      </li>
                      <hr class="txt-hr adm-txt-hr my0">
                      <li>
                        <Button type="text" class="adm-btn-regular">Добавить Участника дела</Button>
                      </li>
                      <li>
                        <Button type="text" class="adm-btn-regular">Добавить Транспортное средство</Button>
                      </li>
                      <hr class="txt-hr adm-txt-hr my0">
                      <li>
                        <Button type="text" class="adm-btn-regular">Предьявленный документ</Button>
                      </li>
                      <li>
                        <Button type="text" class="adm-btn-regular">Добавить фото и видео материалы</Button>
                      </li>
                    </ul>
                  </div>
                  <div class="col col--6">
                    <ul class="amd-poptip-sub__nav">
                      <li>
                        <Button type="text" class="adm-btn-regular">Протокол задержания ТС</Button>
                      </li>
                      <li>
                        <Button type="text" class="adm-btn-regular">Разрешение на выдачу ТС</Button>
                      </li>
                      <hr class="txt-hr adm-txt-hr my0">
                      <li>
                        <Button type="text" class="adm-btn-regular">Протокол изьятия вещей и документов</Button>
                      </li>
                      </li>
                      <li>
                        <Button type="text" class="adm-btn-regular">Протокол Осмотра места</Button>
                      </li>
                      <li>
                        <Button type="text" class="adm-btn-regular">Обьяснение</Button>
                      </li>
                      <li>
                        <Button type="text" class="adm-btn-regular">Извещение</Button>
                      </li>
                      <li>
                        <Button type="text" class="adm-btn-regular">Документ pdf</Button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <hr class="txt-hr my0">
                  <ul class="amd-poptip-sub__nav">
                    <li>
                      <Button type="text" class="adm-btn-regular py6 mb0" style="margin-top: 10px;">
                        <div class="flex-parent flex-parent--center-cross">
                          <span>Перенос даты рассмотрения дела</span>
                          <i class="ml24"><img src="../../assets/images/carry_date.svg" alt=""></i>
                        </div>
                      </Button>
                    </li>
                  </ul>
                </div>

              </div>
            </Poptip>


            <Poptip width="350" placement="bottom-start" class="amd-poptip-sub">
              <Button type="text"
                      class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover mx18 px0 py0 mb0'
                      style="box-shadow: none">
                <span>Исполнение дела  <Icon type="md-arrow-dropdown" :size="16"/></span>
              </Button>
              <div slot="content">
                <ul class="amd-poptip-sub__nav">
                  <li>
                    <Button @click="createWizardScenarioAPN" type="text" class="adm-btn-regular">Протокол АПН на
                      бланке
                    </Button>
                  </li>
                  <li>
                    <Button type="text" class="adm-btn-regular">Протокол АПН на A4, статья 20.25 ч.1</Button>
                  </li>
                  <li>
                    <Button @click="createWizardScenarioPost" type="text" class="adm-btn-regular">Постановление об АПН
                    </Button>
                  </li>
                  <li>
                    <Button @click="createWizardScenarioPZTC" type="text" class="adm-btn-regular">Протокол задержания
                      ТС
                    </Button>
                  </li>
                </ul>
              </div>
            </Poptip>

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
            <div class="h-full bg-blue-thin">
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
        hideMore: false,
        sizeInnerStack: 0,
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
      arrayToTree(arr) {
        let tree = [];
        let mappedArr = {};
        let arrElem;
        let mappedElem;

        let copyDelo = this.getCopyObj(arr[0], 'children');
        tree.push(copyDelo);

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
        this.updateSelected();
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
            scenarioName: 'CreateProtPZTC',
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


