export default {
  state: {
    moduleName: 'frmEdIspolnEdit',
    cid: null,
    bean: 'FrmEdIspolnEdit',
    routeName: 'FrmEdIspolnEdit',
    data: null,
    command: null
  },
  mutations: {
    frmEdIspolnEditSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdIspolnEditSetData(state, data) {
      state.data = data;
    },
    frmEdIspolnEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdIspolnEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdIspolnEditSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdIspolnEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdIspolnEditGetCommand: state => () => {
      return state.command
    },
    frmEdIspolnEditGetData: state => {
      return state.data
    }
  }
};
