export default {
  state: {
    moduleName: 'frmEdDocsOther',
    cid: null,
    bean: 'FrmEdDocsOther',
    routeName: 'FrmEdDocsOther',
    data: null,
    command: null
  },
  mutations: {
    frmEdDocsOtherSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDocsOtherSetData(state, data) {
      state.data = data;
    },
    frmEdDocsOtherSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDocsOtherSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDocsOtherSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDocsOtherSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDocsOtherGetCommand: state => () => {
      return state.command
    },
    frmEdDocsOtherGetData: state => {
      return state.data
    }
  }
};
