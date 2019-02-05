export default {
  state: {
    moduleName: 'frmEdVuPred',
    cid: null,
    bean: 'FrmEdVuPred',
    routeName: 'FrmEdVuPred',
    data: null,
    command: null
  },
  mutations: {
    frmEdVuPredSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdVuPredSetData(state, data) {
      state.data = data;
    },
    frmEdVuPredSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdVuPredSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdVuPredSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdVuPredSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdVuPredGetCommand: state => () => {
      return state.command
    },
    frmEdVuPredGetData: state => {
      return state.data
    }
  }
};
