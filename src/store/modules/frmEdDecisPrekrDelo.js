export default {
  state: {
    moduleName: 'frmEdDecisPrekrDelo',
    cid: null,
    bean: 'FrmEdDecisPrekrDelo',
    routeName: 'FrmEdDecisPrekrDelo',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisPrekrDeloSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisPrekrDeloSetData(state, data) {
      state.data = data;
    },
    frmEdDecisPrekrDeloSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisPrekrDeloSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisPrekrDeloSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisPrekrDeloSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisPrekrDeloGetCommand: state => () => {
      return state.command
    },
    frmEdDecisPrekrDeloGetData: state => {
      return state.data
    }
  }
};
