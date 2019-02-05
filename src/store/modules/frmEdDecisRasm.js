export default {
  state: {
    moduleName: 'frmEdDecisRasm',
    cid: null,
    bean: 'FrmEdDecisRasm',
    routeName: 'FrmEdDecisRasm',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisRasmSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisRasmSetData(state, data) {
      state.data = data;
    },
    frmEdDecisRasmSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisRasmSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisRasmSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisRasmSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisRasmGetCommand: state => () => {
      return state.command
    },
    frmEdDecisRasmGetData: state => {
      return state.data
    }
  }
};
