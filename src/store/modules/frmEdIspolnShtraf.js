export default {
  state: {
    moduleName: 'frmEdIspolnShtraf',
    cid: null,
    bean: 'FrmEdIspolnShtraf',
    routeName: 'FrmEdIspolnShtraf',
    data: null,
    command: null
  },
  mutations: {
    frmEdIspolnShtrafSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdIspolnShtrafSetData(state, data) {
      state.data = data;
    },
    frmEdIspolnShtrafSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdIspolnShtrafSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdIspolnShtrafSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdIspolnShtrafSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdIspolnShtrafGetCommand: state => () => {
      return state.command
    },
    frmEdIspolnShtrafGetData: state => {
      return state.data
    }
  }
};
