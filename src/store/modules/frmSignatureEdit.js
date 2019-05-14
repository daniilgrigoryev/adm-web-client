export default {
  state: {
    moduleName: 'frmSignatureEdit',
    cid: null,
    bean: 'FrmSignatureEdit',
    routeName: 'FrmSignatureEdit',
    data: null,
    command: null
  },
  mutations: {
    frmSignatureEditSetCid(state, cid) {
      state.cid = cid;
    },
    frmSignatureEditSetData(state, data) {
      state.data = data;
    },
    frmSignatureEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmSignatureEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmSignatureEditSetData(vm, data) {
      vm.state.data = data;
    },
    frmSignatureEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmSignatureEditGetCommand: state => () => {
      return state.command
    },
    frmSignatureEditGetData: state => {
      return state.data
    }
  }
};
