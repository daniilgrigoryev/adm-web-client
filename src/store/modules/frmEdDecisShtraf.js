export default {
  state: {
    moduleName: 'frmEdDecisShtraf',
    cid: null,
    bean: 'FrmEdDecisShtraf',
    routeName: 'FrmEdDecisShtraf',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisShtrafSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisShtrafSetData(state, data) {
      state.data = data;
    },
    frmEdDecisShtrafSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisShtrafSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisShtrafSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisShtrafSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisShtrafGetCommand: state => () => {
      return state.command
    },
    frmEdDecisShtrafGetData: state => {
      return state.data
    }
  }
};
