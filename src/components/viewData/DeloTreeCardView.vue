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
              <tree-node v-for="(item, index) in tree" :key="index" :node="item"></tree-node>
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
  import {bus} from "../../assets/js/utils/bus";
  import * as formStack from '../../assets/js/api/formStack';
  import Stack from '../../assets/js/api/stack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';
  import DeloInnerForm from "~/components/delo/DeloInnerForm";
  import TreeNode from "~/components/TreeNode";

  export default {
    name: "DeloTreeCardView",
    components: {
      DeloInnerForm,
      TreeNode
    },
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

        bus.$on('treeNodeClick', this.nodeClick);

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
      tree() {
        let res = [];
        if (this.dataStore) {
          res = this.arrayToTree(JSON.parse(JSON.stringify(this.dataStore.tree)));
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
        delete copyNode['children'];
        delete copyNode['height'];

        if (this.$refs.innerForm) {
          await this.$refs.innerForm.addForm(copyNode);
        }
      },
      arrayToTree(arr) {
        let tree = [];
        let mappedArr = {};
        let arrElem;
        let mappedElem;

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
  .delo__headding{
    border-bottom: 2px solid transparent;
  }
  .delo__headding:hover{
    border-bottom: 2px solid #00b1ff;
  }
</style>
