export default {
  state: {
    moduleName: 'frmLog',
    cid: null,
    bean: 'FrmLog',
    routeName: 'FrmLog',
    data: null,
    command: null
  },
  mutations: {
    frmLogSetCid(state, cid) {
      state.cid = cid;
    },
    frmLogSetData(state, data) {
      state.data = data;
    },
    frmLogSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmLogSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmLogSetData(vm, data) {
      vm.state.data = data;
    },
    frmLogSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmLogGetCommand: state => () => {
      return state.command
    },
    frmLogGetData: state => {
      return state.data
    }
  }
};
