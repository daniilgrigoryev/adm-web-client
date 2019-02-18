<template>
  <div v-if="sizeInnerStack > 0">
    <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross px36 py12 bg-white-light border-t border-b border--gray-faint">
      <b class="adm-text-big" v-html="current.params.name"></b>
      <Button type="text" style="outline: 0!important;" class="px0 py0 mx12 my6 cursor-pointer">
        <img src='../../assets/images/wiki.svg' class="wmax-none">
      </Button>
    </div>
    <div class="hmin360 px36 py12" style="background-color: rgba(255,2,2,0.11)">
      <frm-ed-delo v-if="isVisible('FrmEdDelo')"></frm-ed-delo>
    </div>
    <div class="px36 py12 flex-parent flex-parent--end-main border-t border-b border--gray-faint bg-white-light">
      <Button type="text">Отменить изменения</Button>
      <Button type="primary" class="ml12">Сохранить</Button>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import FrmEdDelo from "~/components/delo/FrmEdDelo";

  export default {
    name: "DeloInnerForm",
    props: {
      sizeInnerStack: Number
    },
    components: {FrmEdDelo},
    async created() {
      try {
        if (this.sizeInnerStack > 0) {
          let current = formStack.getCurrent();
          this.current = innerFormStack.getCurrent({
            uid: current.moduleName
          });
          this.current.restore = true;
        }
      } catch (e) {
        alert(e.message);
      }
    },
    data() {
      return {
        current: null
      }
    },
    computed: {},
    methods: {
      async addForm(node) {
        let eventResponse = await RequestApi.prepareData({
          method: 'getBeanNameByNode',
          params: {
            node: node
          }
        });
        let beanName = JSON.parse(eventResponse.response).data.beanName;
        let current = await innerFormStack.toNext({
          beanName: beanName,
          params: node,
          uid: this.$store.state.deloTreeCardView.moduleName
        });
        await this.updateSizeStack();
        this.current = current;
      },
      removeForm() {
        let current = formStack.getCurrent();
        innerFormStack.toPrev({
          uid: current.moduleName
        });
        this.current = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        this.sizeInnerStack--;
      },
      async updateSizeStack() {
        await this.$emit('updateSizeStack', {
          uid: formStack.getCurrent().moduleName
        });
      },
      isVisible(beanName) {
        return funcUtils.isNotEmpty(this.current) && this.current.beanName === beanName;
      },
    }
  }
</script>

<style scoped>

</style>
