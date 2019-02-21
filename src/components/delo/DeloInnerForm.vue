<template>
  <div v-if="sizeInnerStack > 0 && current">




    <div class="px36 py18 border-b border--gray-light">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <b class="adm-text-big" v-html="current.params.name"></b>
        <Button type="text" style="outline: 0!important;" class="px0 py0 mx12 my6 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>

      <div class="my12">
        <a href='#Links' class='link color-blue-base adm-txt-regular border--dash border-b mr24 color-blue-dark-on-hover'>Решение по делу</a>
        <a href='#Links' class='link color-blue-base adm-txt-regular border--dash border-b mr24 color-blue-dark-on-hover'>Сведения</a>
        <a href='#Links' class='link color-blue-base adm-txt-regular border--dash border-b mr24 color-blue-dark-on-hover'>Данные видеофиксации</a>
        <a href='#Links' class='link color-blue-base adm-txt-regular border--dash border-b mr24 color-blue-dark-on-hover'>Ошибки</a>
      </div>

    </div>



    <div class="hmin360 px36 py12">
      <frm-ed-delo v-if="isVisible('FrmEdDelo')"></frm-ed-delo>
      <frm-ed-docs-post v-if="isVisible('FrmEdDocsPost')"></frm-ed-docs-post>
      <frm-ed-docs-opred v-if="isVisible('FrmEdDocsOpred')"></frm-ed-docs-opred>
      <frm-ed-decis-shtraf v-if="isVisible('FrmEdDecisShtraf')"></frm-ed-decis-shtraf>
      <frm-ed-ispoln-shtraf v-if="isVisible('FrmEdIspolnShtraf')"></frm-ed-ispoln-shtraf>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import FrmEdDelo from "~/components/delo/FrmEdDelo";
  import FrmEdDocsPost from "~/components/delo/FrmEdDocsPost";
  import FrmEdDocsOpred from "~/components/delo/FrmEdDocsOpred";
  import FrmEdDecisShtraf from "~/components/delo/FrmEdDecisShtraf";
  import FrmEdIspolnShtraf from "~/components/delo/FrmEdIspolnShtraf";

  export default {
    name: "DeloInnerForm",
    props: {
      sizeInnerStack: Number
    },
    components: {
      FrmEdDocsOpred,
      FrmEdDocsPost,
      FrmEdDecisShtraf,
      FrmEdIspolnShtraf,
      FrmEdDelo
    },
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

        this.$emit('updateSelected');
      },
      async removeForm() {
        let current = formStack.getCurrent();
        await innerFormStack.toPrev({
          uid: current.moduleName
        });
        await this.updateSizeStack();
        this.current = innerFormStack.getCurrent({
          uid: current.moduleName
        });

        this.$emit('updateSelected');
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
