export default {
  state: {
    moduleName: 'frmEdUchastFLIndividEdit',
    cid: null,
    bean: 'FrmEdUchastFLEdit',
    routeName: 'FrmEdUchastFLIndividEdit',
    data: null,
    command: null
  },
  mutations: {
    frmEdUchastFLIndividEditSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdUchastFLIndividEditSetData(state, data) {
      state.data = data;
    },
    frmEdUchastFLIndividEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdUchastFLIndividEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdUchastFLIndividEditSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdUchastFLIndividEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdUchastFLIndividEditGetCommand: state => () => {
      return state.command
    },
    frmEdUchastFLIndividEditGetData: state => {
      return state.data
    }
  }
};
