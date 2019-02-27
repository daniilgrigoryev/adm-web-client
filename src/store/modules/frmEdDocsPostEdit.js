export default {
  state: {
    moduleName: 'frmEdDocsPostEdit',
    cid: null,
    bean: 'FrmEdDocsPostEdit',
    routeName: 'FrmEdDocsPostEdit',
    data: null,
    command: null
  },
  mutations: {
    frmEdDocsPostEditSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDocsPostEditSetData(state, data) {
      state.data = data;
    },
    frmEdDocsPostEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDocsPostEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDocsPostEditSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDocsPostEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDocsPostEditGetCommand: state => () => {
      return state.command
    },
    frmEdDocsPostEditGetData: state => {
      return state.data
    }
  }
};
