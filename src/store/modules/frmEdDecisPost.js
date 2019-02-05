export default {
  state: {
    moduleName: 'frmEdDecisPost',
    cid: null,
    bean: 'FrmEdDecisPost',
    routeName: 'FrmEdDecisPost',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisPostSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisPostSetData(state, data) {
      state.data = data;
    },
    frmEdDecisPostSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisPostSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisPostSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisPostSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisPostGetCommand: state => () => {
      return state.command
    },
    frmEdDecisPostGetData: state => {
      return state.data
    }
  }
};
