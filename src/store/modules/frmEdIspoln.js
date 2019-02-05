export default {
  state: {
    moduleName: 'frmEdIspoln',
    cid: null,
    bean: 'FrmEdIspoln',
    routeName: 'FrmEdIspoln',
    data: null,
    command: null
  },
  mutations: {
    frmEdIspolnSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdIspolnSetData(state, data) {
      state.data = data;
    },
    frmEdIspolnSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdIspolnSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdIspolnSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdIspolnSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdIspolnGetCommand: state => () => {
      return state.command
    },
    frmEdIspolnGetData: state => {
      return state.data
    }
  }
};
