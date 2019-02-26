export default {
  state: {
    moduleName: 'frmEdVuPredEdit',
    cid: null,
    bean: 'FrmEdVuPredEdit',
    routeName: 'FrmEdVuPredEdit',
    data: null,
    command: null
  },
  mutations: {
    frmEdVuPredEditSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdVuPredEditSetData(state, data) {
      state.data = data;
    },
    frmEdVuPredEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdVuPredEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdVuPredEditSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdVuPredEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdVuPredEditGetCommand: state => () => {
      return state.command
    },
    frmEdVuPredEditGetData: state => {
      return state.data
    }
  }
};
