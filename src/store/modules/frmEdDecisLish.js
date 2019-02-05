export default {
  state: {
    moduleName: 'frmEdDecisLish',
    cid: null,
    bean: 'FrmEdDecisLish',
    routeName: 'FrmEdDecisLish',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisLishSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisLishSetData(state, data) {
      state.data = data;
    },
    frmEdDecisLishSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisLishSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisLishSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisLishSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisLishGetCommand: state => () => {
      return state.command
    },
    frmEdDecisLishGetData: state => {
      return state.data
    }
  }
};
