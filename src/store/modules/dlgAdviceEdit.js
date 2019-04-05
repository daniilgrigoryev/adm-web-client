export default {
  state: {
    moduleName: 'dlgAdviceEdit',
    cid: null,
    bean: 'DlgAdviceEdit',
    routeName: 'DlgAdviceEdit',
    data: null,
    command: null
  },
  mutations: {
    dlgAdviceEditSetCid(state, cid) {
      state.cid = cid;
    },
    dlgAdviceEditSetData(state, data) {
      state.data = data;
    },
    dlgAdviceEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dlgAdviceEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    dlgAdviceEditSetData(vm, data) {
      vm.state.data = data;
    },
    dlgAdviceEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    dlgAdviceEditGetCommand: state => () => {
      return state.command
    },
    dlgAdviceEditGetData: state => {
      return state.data
    }
  }
};
