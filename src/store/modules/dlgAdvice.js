export default {
  state: {
    moduleName: 'dlgAdvice',
    cid: null,
    bean: 'DlgAdvice',
    routeName: 'DlgAdvice',
    data: null,
    command: null
  },
  mutations: {
    dlgAdviceSetCid(state, cid) {
      state.cid = cid;
    },
    dlgAdviceSetData(state, data) {
      state.data = data;
    },
    dlgAdviceSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dlgAdviceSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    dlgAdviceSetData(vm, data) {
      vm.state.data = data;
    },
    dlgAdviceSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    dlgAdviceGetCommand: state => () => {
      return state.command
    },
    dlgAdviceGetData: state => {
      return state.data
    }
  }
};
