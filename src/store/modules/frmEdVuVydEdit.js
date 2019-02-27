export default {
  state: {
    moduleName: 'frmEdVuVydEdit',
    cid: null,
    bean: 'FrmEdVuVydEdit',
    routeName: 'FrmEdVuVydEdit',
    data: null,
    command: null
  },
  mutations: {
    frmEdVuVydEditSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdVuVydEditSetData(state, data) {
      state.data = data;
    },
    frmEdVuVydEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdVuVydEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdVuVydEditSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdVuVydEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdVuVydEditGetCommand: state => () => {
      return state.command
    },
    frmEdVuVydEditGetData: state => {
      return state.data
    }
  }
};
