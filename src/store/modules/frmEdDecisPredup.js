export default {
  state: {
    moduleName: 'frmEdDecisPredup',
    cid: null,
    bean: 'FrmEdDecisPredup',
    routeName: 'FrmEdDecisPredup',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisPredupSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisPredupSetData(state, data) {
      state.data = data;
    },
    frmEdDecisPredupSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisPredupSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisPredupSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisPredupSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisPredupGetCommand: state => () => {
      return state.command
    },
    frmEdDecisPredupGetData: state => {
      return state.data
    }
  }
};
