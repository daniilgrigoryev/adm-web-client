export default {
  state: {
    moduleName: 'frmEdDecisDostavl',
    cid: null,
    bean: 'FrmEdDecisDostavl',
    routeName: 'FrmEdDecisDostavl',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisDostavlSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisDostavlSetData(state, data) {
      state.data = data;
    },
    frmEdDecisDostavlSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisDostavlSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisDostavlSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisDostavlSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisDostavlGetCommand: state => () => {
      return state.command
    },
    frmEdDecisDostavlGetData: state => {
      return state.data
    }
  }
};
