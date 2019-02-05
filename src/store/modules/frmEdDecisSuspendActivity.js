export default {
  state: {
    moduleName: 'frmEdDecisSuspendActivity',
    cid: null,
    bean: 'FrmEdDecisSuspendActivity',
    routeName: 'FrmEdDecisSuspendActivity',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisSuspendActivitySetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisSuspendActivitySetData(state, data) {
      state.data = data;
    },
    frmEdDecisSuspendActivitySetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisSuspendActivitySetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisSuspendActivitySetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisSuspendActivitySetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisSuspendActivityGetCommand: state => () => {
      return state.command
    },
    frmEdDecisSuspendActivityGetData: state => {
      return state.data
    }
  }
};
