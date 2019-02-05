export default {
  state: {
    moduleName: 'frmEdVuVyd',
    cid: null,
    bean: 'FrmEdVuVyd',
    routeName: 'FrmEdVuVyd',
    data: null,
    command: null
  },
  mutations: {
    frmEdVuVydSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdVuVydSetData(state, data) {
      state.data = data;
    },
    frmEdVuVydSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdVuVydSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdVuVydSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdVuVydSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdVuVydGetCommand: state => () => {
      return state.command
    },
    frmEdVuVydGetData: state => {
      return state.data
    }
  }
};
