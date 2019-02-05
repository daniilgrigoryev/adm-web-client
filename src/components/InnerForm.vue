<template>

</template>

<script>
  import * as funcUtils from "../assets/js/utils/funcUtils";
  import * as formStack from '../assets/js/api/formStack';
  import Stack from '../assets/js/api/stack';
  import * as innerFormStack from '../assets/js/api/innerFormStack';
  import RequestApi from "../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "InnerForm",
    async created() {
      try {
        let current = formStack.getCurrent();
        this.current = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        /*let currentModuleData = this.$store.state[current.moduleName].data;
        let currentNode = currentModuleData.tree.filter((item) => {
          if (item.recType + item.docId === this.current.params.recType + this.current.params.docId) {
            return item;
          }
        })[0];
        debugger;*/
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

    }
  }
</script>

<style scoped>

</style>
