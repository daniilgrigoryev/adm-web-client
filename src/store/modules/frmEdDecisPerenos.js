export default {
  state: {
    moduleName: 'frmEdDecisPerenos',
    cid: null,
    bean: 'FrmEdDecisPerenos',
    routeName: 'FrmEdDecisPerenos',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisPerenosSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisPerenosSetData(state, data) {
      state.data = data;
    },
    frmEdDecisPerenosSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisPerenosSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisPerenosSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisPerenosSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisPerenosGetCommand: state => () => {
      return state.command
    },
    frmEdDecisPerenosGetData: state => {
      return state.data
    }
  }
};
