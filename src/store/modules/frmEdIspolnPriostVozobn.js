export default {
  state: {
    moduleName: 'frmEdIspolnPriostVozobn',
    cid: null,
    bean: 'FrmEdIspolnPriostVozobn',
    routeName: 'FrmEdIspolnPriostVozobn',
    data: null,
    command: null
  },
  mutations: {
    frmEdIspolnPriostVozobnSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdIspolnPriostVozobnSetData(state, data) {
      state.data = data;
    },
    frmEdIspolnPriostVozobnSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdIspolnPriostVozobnSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdIspolnPriostVozobnSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdIspolnPriostVozobnSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdIspolnPriostVozobnGetCommand: state => () => {
      return state.command
    },
    frmEdIspolnPriostVozobnGetData: state => {
      return state.data
    }
  }
};
