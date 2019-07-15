import RequestApi from "~/assets/js/api/requestApi";
import * as formStack from '~/assets/js/api/formStack';
export default {
  props: {
    decis: {
      type: Object,
      default: {}
    },
  },
  methods: {
    store() {
      this.$emit("store");
    },
    changeOrganNapravlKod() {
      this.$emit("changeOrganNapravlKod");
    },
    showOrganModal(visible) {
      this.$emit("showOrganModal", visible);
    },
  },
}
