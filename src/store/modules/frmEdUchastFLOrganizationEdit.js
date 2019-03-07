export default {
  state: {
    moduleName: 'frmEdUchastFLOrganizationEdit',
    cid: null,
    bean: 'FrmEdUchastFLEdit',
    routeName: 'FrmEdUchastFLOrganizationEdit',
    data: null,
    command: null
  },
  mutations: {
    frmEdUchastFLOrganizationEditSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdUchastFLOrganizationEditSetData(state, data) {
      state.data = data;
    },
    frmEdUchastFLOrganizationEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdUchastFLOrganizationEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdUchastFLOrganizationEditSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdUchastFLOrganizationEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdUchastFLOrganizationEditGetCommand: state => () => {
      return state.command
    },
    frmEdUchastFLOrganizationEditGetData: state => {
      return state.data
    }
  }
};
