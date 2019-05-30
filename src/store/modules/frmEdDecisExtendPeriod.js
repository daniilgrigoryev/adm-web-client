export default {
  state: {
    moduleName: 'frmEdDecisExtendPeriod',
    cid: null,
    bean: 'frmEdDecisExtendPeriod',
    routeName: 'frmEdDecisExtendPeriod',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisExtendPeriodSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisExtendPeriodSetData(state, data) {
      state.data = data;
    },
    frmEdDecisExtendPeriodSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisExtendPeriodSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisExtendPeriodSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisExtendPeriodSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisExtendPeriodGetCommand: state => () => {
      return state.command
    },
    frmEdDecisExtendPeriodGetData: state => {
      return state.data
    }
  }
};
