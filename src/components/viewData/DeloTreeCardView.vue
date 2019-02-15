<template>
  <div v-if="dataStore" class="layout">
    <Layout class="layout--inner">
      <button type="button" @click="getPrev">Назад</button>
      <button type="button" @click="clearInnerStack">Очистить стэк</button>

      <div v-if="deloInfo" class="px36 py24">
        <div class="my12">
          <span v-html="deloInfo.name" class="adm-h1 color-gray-medium"></span>
        </div>
       <!-- <div class="mt24">
          <b class="adm-text-big color-gray-medium">Статья дела</b>
          <p class="adm-txt-regular color-gray-medium">{{deloInfo.stotvGr}}</p>
        </div>-->
      </div>
      <hr class="txt-hr my0">
      <div>
        <Row>
          <Col :xs="24" :sm="8" :md="8" :lg="8">
            <ul class="tree">
              <li v-for="(item, index) in deloTree" v-if="item.parentCategory">
                <a v-if="item.recType" href="#" @click="itemClick(item)" class="flex-parent flex-parent--wrap tree__link tree__link--selected border-t border-b border--gray-faint py12">
                  <div class="bg-red ml18" style="width: 40px; height: 40px;">
                    <img src="" alt="">
                  </div>
                  <div class="col mx18">
                    <p v-html="item.name" class="adm-text-big color-dark-base txt-bold txt-break-word"></p>
                  </div>
                </a>
                <hr class="txt-hr my0" v-else-if="!item.recType && item.category === -3" />
              </li>
            </ul>
          </Col>
          <Col :xs="24" :sm="16" :md="16" :lg="16" style="padding: 0">
            <div class="">
              <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross px36 py12 bg-white-light border-t border-b border--gray-faint">
                <b class="adm-text-big">Заголовок открытой формы</b>
                <Button type="text" style="outline: 0!important;" class="px0 py0 mx12 my6 cursor-pointer">
                  <img src='../../assets/images/wiki.svg' class="wmax-none">
                </Button>
              </div>
              <div class="hmin360 px36 py12" style="background-color: rgba(255,2,2,0.11)">
                <inner-form v-if="sizeInnerStack > 0"></inner-form>
              </div>
              <div class="px36 py12 flex-parent flex-parent--end-main border-t border-b border--gray-faint bg-white-light">
                <Button type="text">Отменить изменения</Button>
                <Button type="primary" class="ml12">Сохранить</Button>
              </div>
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
        sizeInnerStack: 0,
        deloTip: {
          'APN': 'Дело об административном правонарушение',
          'DTP': 'Дело о дорожно-транспортном происшествии',
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
