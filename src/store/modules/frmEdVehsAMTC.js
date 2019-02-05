export default {
  state: {
    moduleName: 'frmEdVehsAMTC',
    cid: null,
    bean: 'FrmEdVehsAMTC',
    routeName: 'FrmEdVehsAMTC',
    data: null,
    command: null
  },
  mutations: {
    frmEdVehsAMTCSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdVehsAMTCSetData(state, data) {
      state.data = data;
    },
    frmEdVehsAMTCSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdVehsAMTCSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdVehsAMTCSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdVehsAMTCSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdVehsAMTCGetCommand: state => () => {
      return state.command
    },
    frmEdVehsAMTCGetData: state => {
      return state.data
    }
  }
};
