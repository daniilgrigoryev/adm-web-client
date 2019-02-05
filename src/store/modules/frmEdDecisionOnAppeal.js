export default {
  state: {
    moduleName: 'frmEdDecisionOnAppeal',
    cid: null,
    bean: 'FrmEdDecisionOnAppeal',
    routeName: 'FrmEdDecisionOnAppeal',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisionOnAppealSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisionOnAppealSetData(state, data) {
      state.data = data;
    },
    frmEdDecisionOnAppealSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisionOnAppealSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisionOnAppealSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisionOnAppealSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisionOnAppealGetCommand: state => () => {
      return state.command
    },
    frmEdDecisionOnAppealGetData: state => {
      return state.data
    }
  }
};
