export default {
  state: {
    moduleName: 'frmEdIspolnFSSP',
    cid: null,
    bean: 'FrmEdIspolnFSSP',
    routeName: 'FrmEdIspolnFSSP',
    data: null,
    command: null
  },
  mutations: {
    frmEdIspolnFSSPSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdIspolnFSSPSetData(state, data) {
      state.data = data;
    },
    frmEdIspolnFSSPSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdIspolnFSSPSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdIspolnFSSPSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdIspolnFSSPSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdIspolnFSSPGetCommand: state => () => {
      return state.command
    },
    frmEdIspolnFSSPGetData: state => {
      return state.data
    }
  }
};
