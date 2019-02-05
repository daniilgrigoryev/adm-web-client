export default {
  state: {
    moduleName: 'frmEdDelo',
    cid: null,
    bean: 'FrmEdDelo',
    routeName: 'FrmEdDelo',
    data: null,
    command: null
  },
  mutations: {
    frmEdDeloSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDeloSetData(state, data) {
      state.data = data;
    },
    frmEdDeloSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDeloSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDeloSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDeloSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDeloGetCommand: state => () => {
      return state.command
    },
    frmEdDeloGetData: state => {
      return state.data
    }
  }
};
