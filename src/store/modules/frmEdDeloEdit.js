export default {
  state: {
    moduleName: 'frmEdDeloEdit',
    cid: null,
    bean: 'FrmEdDeloEdit',
    routeName: 'FrmEdDeloEdit',
    data: null,
    command: null
  },
  mutations: {
    frmEdDeloEditSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDeloEditSetData(state, data) {
      state.data = data;
    },
    frmEdDeloEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDeloEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDeloEditSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDeloEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDeloEditGetCommand: state => () => {
      return state.command
    },
    frmEdDeloEditGetData: state => {
      return state.data
    }
  }
};
