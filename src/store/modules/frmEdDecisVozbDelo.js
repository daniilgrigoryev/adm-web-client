export default {
  state: {
    moduleName: 'frmEdDecisVozbDelo',
    cid: null,
    bean: 'FrmEdDecisVozbDelo',
    routeName: 'FrmEdDecisVozbDelo',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisVozbDeloSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisVozbDeloSetData(state, data) {
      state.data = data;
    },
    frmEdDecisVozbDeloSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisVozbDeloSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisVozbDeloSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisVozbDeloSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisVozbDeloGetCommand: state => () => {
      return state.command
    },
    frmEdDecisVozbDeloGetData: state => {
      return state.data
    }
  }
};
