export default {
  state: {
    moduleName: 'frmEdDocsPetitionEdit',
    cid: null,
    bean: 'FrmEdDocsPetitionEdit',
    routeName: 'FrmEdDocsPetitionEdit',
    data: null,
    command: null
  },
  mutations: {
    frmEdDocsPetitionEditSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDocsPetitionEditSetData(state, data) {
      state.data = data;
    },
    frmEdDocsPetitionEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDocsPetitionEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDocsPetitionEditSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDocsPetitionEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDocsPetitionEditGetCommand: state => () => {
      return state.command
    },
    frmEdDocsPetitionEditGetData: state => {
      return state.data
    }
  }
};
