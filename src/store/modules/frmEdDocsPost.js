export default {
  state: {
    moduleName: 'frmEdDocsPost',
    cid: null,
    bean: 'FrmEdDocsPost',
    routeName: 'FrmEdDocsPost',
    data: null,
    command: null
  },
  mutations: {
    frmEdDocsPostSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDocsPostSetData(state, data) {
      state.data = data;
    },
    frmEdDocsPostSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDocsPostSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDocsPostSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDocsPostSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDocsPostGetCommand: state => () => {
      return state.command
    },
    frmEdDocsPostGetData: state => {
      return state.data
    }
  }
};
