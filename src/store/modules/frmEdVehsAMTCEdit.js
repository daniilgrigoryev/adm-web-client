export default {
  state: {
    moduleName: 'frmEdVehsAMTCEdit',
    cid: null,
    bean: 'FrmEdVehsAMTCEdit',
    routeName: 'FrmEdVehsAMTCEdit',
    data: null,
    command: null
  },
  mutations: {
    frmEdVehsAMTCEditSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdVehsAMTCEditSetData(state, data) {
      state.data = data;
    },
    frmEdVehsAMTCEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdVehsAMTCEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdVehsAMTCEditSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdVehsAMTCEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdVehsAMTCEditGetCommand: state => () => {
      return state.command
    },
    frmEdVehsAMTCEditGetData: state => {
      return state.data
    }
  }
};
