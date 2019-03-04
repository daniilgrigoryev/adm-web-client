export default {
  state: {
    moduleName: 'frmEdDecisEdit',
    cid: null,
    bean: 'FrmEdDecisEdit',
    routeName: 'FrmEdDecisEdit',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisEditSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisEditSetData(state, data) {
      state.data = data;
    },
    frmEdDecisEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisEditSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisEditGetCommand: state => () => {
      return state.command
    },
    frmEdDecisEditGetData: state => {
      return state.data
    }
  }
};
