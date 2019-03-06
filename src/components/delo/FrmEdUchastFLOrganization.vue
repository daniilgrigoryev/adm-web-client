<template>
  <div v-if="body">
    {{ body }}
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdUchastFLOrganization",
    async created() {
      try {
        // body.uchastStatusName
        // body.uchastVidName
        // body.uchastTip, body.uchastTipName | concatByDelimiter('-')
        // body.organization.inn
        // body.organization.ogrn
        // body.organization.kpp
        // body.organization.dateReg | formatDateTime('DD.MM.YYYY HH:mm')
        // body.organization.address.adrFull
        // body.factAddr.adrFull
        // body.organization.address.phone
      } catch (e) {
        alert(e.message);
      }
    },
    data() {
      return {}
    },
    methods: {},
    computed: {
      ...mapGetters({
        dataStore: 'frmEdUchastFLGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      }
    },
  }
</script>

<style scoped>

</style>
