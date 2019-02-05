<template>
  <div v-if="dataStore">
    <button type="button" @click="getPrev">Назад</button>
    <button type="button" @click="clearInnerStack">Очистить стэк</button>
    <div>
      <div>
        <ul>
          <li v-for="(item, index) in deloTree" v-if="item.parentCategory" style="list-style-type: none;">
            <span v-html="item.name"
                  v-if="item.recType"
                  :style="item.selected ? 'color: red;': 'color: black;'"
                  @click="itemClick(item)"></span>
            <hr v-else-if="!item.recType && item.category === -3" />
          </li>
        </ul>
      </div>
      <div>
        <inner-form v-if="sizeInnerStack > 0"></inner-form>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import Stack from '../../assets/js/api/stack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';
  import InnerForm from "~/components/InnerForm";

  export default {
    name: "DeloTreeCardView",
    components: {InnerForm},
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
          let stack = funcUtils.getFromSessionStorage(uid);
          if (funcUtils.isNotEmpty(stack)) {
            this.clearInnerStack();
          } else {
            funcUtils.addToSessionStorage(uid, new Stack());
          }
        }
        this.sizeInnerStack = innerFormStack.stackSize({
          uid: this.$store.state.deloTreeCardView.moduleName
        });

        let eventResponse = await RequestApi.prepareData(prepareParams);
        this.$store.dispatch('fillModule', {'event': eventResponse});
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
        let res = {};
        if (this.dataStore) {
          res = this.dataStore.tree;
          res.forEach((item) => {
            this.$set(item, 'selected', false);
          });
        }
        return res;
      },
    },
    methods: {
      async itemClick(item) {
        if (null === item.recType) {
          return;
        }
        this.dataStore.tree.forEach((item) => {
          item.selected = false;
        });
        item.selected = true;

        let copyItem = JSON.parse(JSON.stringify(item));
        delete copyItem['selected'];

        let eventResponse = await RequestApi.prepareData({
          method: 'getBeanNameByNode',
          params: {
            node: copyItem
          }
        });
        let beanName = JSON.parse(eventResponse.response).data.beanName;
        this.clearInnerStack();

        let current = await innerFormStack.toNext({
          beanName: beanName,
          params: item,
          uid: this.$store.state.deloTreeCardView.moduleName
        });
        this.sizeInnerStack = innerFormStack.stackSize({
          uid: this.$store.state.deloTreeCardView.moduleName
        });
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
