export default {
  state: {
    moduleName: 'dlgAppeal',
    cid: null,
    bean: 'DlgAppeal',
    routeName: 'DlgAppeal',
    data: null,
    command: null
  },
  mutations: {
    dlgAppealSetCid(state, cid) {
      state.cid = cid;
    },
    dlgAppealSetData(state, data) {
      state.data = data;
    },
    dlgAppealSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dlgAppealSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    dlgAppealSetData(vm, data) {
      vm.state.data = data;
    },
    dlgAppealSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    dlgAppealGetCommand: state => () => {
      return state.command
    },
    dlgAppealGetData: state => {
      return state.data
    }
  }
};
