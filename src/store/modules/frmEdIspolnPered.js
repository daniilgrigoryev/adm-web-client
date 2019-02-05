export default {
  state: {
    moduleName: 'frmEdIspolnPered',
    cid: null,
    bean: 'FrmEdIspolnPered',
    routeName: 'FrmEdIspolnPered',
    data: null,
    command: null
  },
  mutations: {
    frmEdIspolnPeredSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdIspolnPeredSetData(state, data) {
      state.data = data;
    },
    frmEdIspolnPeredSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdIspolnPeredSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdIspolnPeredSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdIspolnPeredSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdIspolnPeredGetCommand: state => () => {
      return state.command
    },
    frmEdIspolnPeredGetData: state => {
      return state.data
    }
  }
};
