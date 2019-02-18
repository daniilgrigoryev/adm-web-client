<template>
  <div v-if="dataStore" class="layout">
    <Layout class="layout--inner">
      <button type="button" @click="getPrev">Назад</button>
      <button type="button" @click="clearInnerStack">Очистить стэк</button>

      <div v-if="deloContext" class="px36 py24">
        <div class="my12">
          <span @click="nodeClick(deloInfo)" class="adm-h1 color-gray-medium">Дело № {{deloContext.deloN}}</span>
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
        <Row>
          <Col :xs="24" :sm="8" :md="8" :lg="8">
            <ul class="tree">
              <li v-for="(item, index) in deloTree" v-if="item.parentCategory && item.recType">
                <a href="#" @click="nodeClick(item)" class="flex-parent flex-parent--wrap tree__link tree__link--selected border-t border-b border--gray-faint py12">
                  <div class="bg-red ml18" style="width: 40px; height: 40px;">
                    <img src="" alt="">
                  </div>
                  <div class="col mx18">
                    <p v-html="item.name" class="adm-text-big color-dark-base txt-bold txt-break-word"></p>
                  </div>
                </a>
              </li>
              <hr class="txt-hr my0" v-else-if="!item.recType && item.category === -3" />
            </ul>
          </Col>
          <Col :xs="24" :sm="16" :md="16" :lg="16" style="padding: 0">
            <div class="">
              <delo-inner-form ref="innerForm" :sizeInnerStack="sizeInnerStack" @updateSizeStack="updateSizeStack"></delo-inner-form>
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
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + sessionStorage.getItem('wid');
          let innerStack = funcUtils.getFromSessionStorage(uid);
          if (funcUtils.isNotEmpty(innerStack)) {
            this.clearInnerStack();
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
            this.$set(item, 'selected', false);
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
      async nodeClick(node) {
        this.clearInnerStack();

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
      clearInnerStack() {
        let params = {
          uid: this.$store.state.deloTreeCardView.moduleName
        };
        innerFormStack.clearStack(params);
        this.sizeInnerStack = 0;
      },
      updateSizeStack(params) {
        this.sizeInnerStack = innerFormStack.stackSize(params);
      },
      getPrev() {
        this.clearInnerStack();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + sessionStorage.getItem('wid');
        sessionStorage.removeItem(uid);
        try {
          formStack.toPrev({
            vm: this
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
