export default {
  state: {
    moduleName: 'frmEdDocsProt',
    cid: null,
    bean: 'FrmEdDocsProt',
    routeName: 'FrmEdDocsProt',
    data: null,
    command: null
  },
  mutations: {
    frmEdDocsProtSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDocsProtSetData(state, data) {
      state.data = data;
    },
    frmEdDocsProtSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDocsProtSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDocsProtSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDocsProtSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDocsProtGetCommand: state => () => {
      return state.command
    },
    frmEdDocsProtGetData: state => {
      return state.data
    }
  }
};
