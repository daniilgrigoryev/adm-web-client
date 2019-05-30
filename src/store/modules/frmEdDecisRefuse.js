export default {
  state: {
    moduleName: 'frmEdDecisRefuse',
    cid: null,
    bean: 'frmEdDecisRefuse',
    routeName: 'frmEdDecisRefuse',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisRefuseSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisRefuseSetData(state, data) {
      state.data = data;
    },
    frmEdDecisRefuseSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisRefuseSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisRefuseSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisRefuseSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisRefuseGetCommand: state => () => {
      return state.command
    },
    frmEdDecisRefuseGetData: state => {
      return state.data
    }
  }
};
