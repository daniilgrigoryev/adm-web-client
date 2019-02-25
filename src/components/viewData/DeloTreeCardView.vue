<template>
  <div v-if="dataStore" class="layout">
    <Layout class="layout--inner">
      <button type="button" @click="getPrev">Назад</button>
      <button type="button" @click="clearInnerStack">Очистить стэк</button>
      <button type="button" @click="addUchastWizard">Добавить участника</button>

      <div v-if="deloContext" class="px36 py24">
        <div class="my12">
          <a href="#" @click="getDelo" class="adm-h1 link color-blue-base txt-underline-on-hover">Дело № {{deloContext.deloN}}</a>
        </div>
        <div class="my6">
          <span class="adm-txt-regular color-gray-medium">{{deloContext.deloDate}}</span>
          <span class="adm-txt-regular color-gray-medium">{{deloContext.stadName}}</span>
        </div>
        <div class="mt24">
          <b class="adm-text-big color-gray-medium">Статья дела</b>
          <p class="adm-txt-regular color-gray-medium">{{deloContext.stotvName}}</p>
        </div>
      </div>
      <hr class="txt-hr my0">
      <div v-if="deloTree">
        <Row type="flex">
          <Col>
            <ul class="tree h-full bg-blue-thin" style="max-width: 400px;">
              <li v-for="(item, index) in deloTree" v-if="item.parentCategory && item.recType">
                <a href="#" @click="nodeClick(item)" class="flex-parent flex-parent--center-cross flex-parent--wrap tree__link py18" :class='{"tree__link--selected" : item.selected }'>
                  <div class="bg-red ml18" style="width: 40px; height: 40px;">
                    <img src="" alt="">
                  </div>
                  <div class="col mx18">
                    <p v-html="item.name" class="adm-text-big color-dark-base txt-bold txt-break-word"></p>
                  </div>
                </a>
              </li>
              <hr class="txt-hr my0" v-else-if="!item.recType" />
            </ul>
          </Col>
          <Col :xs="24" :sm="16" :md="16" :lg="16">
            <div class="mx-auto">
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
  import * as formStack from '../../assets/js/api/formStack';
  import Stack from '../../assets/js/api/stack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';
  import DeloInnerForm from "~/components/delo/DeloInnerForm";

  export default {
    name: "DeloTreeCardView",
    components: {DeloInnerForm},
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
          await this.$refs.innerForm.addForm(this.deloInfo);
        } else {
          this.updateSelected();
        }
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

        await this.$refs.innerForm.addForm(copyNode);
      },
      arrayToTree(arr) {
        let tree = [];
        let mappedArr = {};
        let arrElem;
        let mappedElem;

        for (let i = 0, len = arr.length; i < len; i++) {
          arrElem = arr[i];
          mappedArr[arrElem.category] = arrElem;
          mappedArr[arrElem.category]['children'] = [];
        }

        for (let id in mappedArr) {
          if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            this.$set(mappedElem, 'selected', false);
            if (mappedElem.parentCategory) {
              mappedArr[mappedElem['parentCategory']]['children'].push(mappedElem);
            } else {
              tree.push(mappedElem);
            }
          }
        }
        return tree;
      },
      async clearInnerStack() {
        let params = {
          uid: this.$store.state.deloTreeCardView.moduleName
        };
        await innerFormStack.clearStack(params);
        this.$refs.innerForm.clearCurrent();
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

<style scoped>

</style>
