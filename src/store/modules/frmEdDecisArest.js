export default {
  state: {
    moduleName: 'frmEdDecisArest',
    cid: null,
    bean: 'FrmEdDecisArest',
    routeName: 'FrmEdDecisArest',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisArestSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisArestSetData(state, data) {
      state.data = data;
    },
    frmEdDecisArestSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisArestSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisArestSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisArestSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisArestGetCommand: state => () => {
      return state.command
    },
    frmEdDecisArestGetData: state => {
      return state.data
    }
  }
};
