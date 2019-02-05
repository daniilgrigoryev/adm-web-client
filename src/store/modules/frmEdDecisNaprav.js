export default {
  state: {
    moduleName: 'frmEdDecisNaprav',
    cid: null,
    bean: 'FrmEdDecisNaprav',
    routeName: 'FrmEdDecisNaprav',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisNapravSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisNapravSetData(state, data) {
      state.data = data;
    },
    frmEdDecisNapravSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisNapravSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisNapravSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisNapravSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisNapravGetCommand: state => () => {
      return state.command
    },
    frmEdDecisNapravGetData: state => {
      return state.data
    }
  }
};
