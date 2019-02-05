export default {
  state: {
    moduleName: 'frmEdIspolnPeredArest',
    cid: null,
    bean: 'FrmEdIspolnPeredArest',
    routeName: 'FrmEdIspolnPeredArest',
    data: null,
    command: null
  },
  mutations: {
    frmEdIspolnPeredArestSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdIspolnPeredArestSetData(state, data) {
      state.data = data;
    },
    frmEdIspolnPeredArestSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdIspolnPeredArestSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdIspolnPeredArestSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdIspolnPeredArestSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdIspolnPeredArestGetCommand: state => () => {
      return state.command
    },
    frmEdIspolnPeredArestGetData: state => {
      return state.data
    }
  }
};
