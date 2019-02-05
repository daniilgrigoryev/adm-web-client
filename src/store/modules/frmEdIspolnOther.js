export default {
  state: {
    moduleName: 'frmEdIspolnOther',
    cid: null,
    bean: 'FrmEdIspolnOther',
    routeName: 'FrmEdIspolnOther',
    data: null,
    command: null
  },
  mutations: {
    frmEdIspolnOtherSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdIspolnOtherSetData(state, data) {
      state.data = data;
    },
    frmEdIspolnOtherSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdIspolnOtherSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdIspolnOtherSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdIspolnOtherSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdIspolnOtherGetCommand: state => () => {
      return state.command
    },
    frmEdIspolnOtherGetData: state => {
      return state.data
    }
  }
};
