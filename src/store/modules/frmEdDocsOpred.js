export default {
  state: {
    moduleName: 'frmEdDocsOpred',
    cid: null,
    bean: 'FrmEdDocsOpred',
    routeName: 'FrmEdDocsOpred',
    data: null,
    command: null
  },
  mutations: {
    frmEdDocsOpredSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDocsOpredSetData(state, data) {
      state.data = data;
    },
    frmEdDocsOpredSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDocsOpredSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDocsOpredSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDocsOpredSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDocsOpredGetCommand: state => () => {
      return state.command
    },
    frmEdDocsOpredGetData: state => {
      return state.data
    }
  }
};
