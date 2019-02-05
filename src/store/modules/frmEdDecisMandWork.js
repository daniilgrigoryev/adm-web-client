export default {
  state: {
    moduleName: 'frmEdDecisMandWork',
    cid: null,
    bean: 'FrmEdDecisMandWork',
    routeName: 'FrmEdDecisMandWork',
    data: null,
    command: null
  },
  mutations: {
    frmEdDecisMandWorkSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdDecisMandWorkSetData(state, data) {
      state.data = data;
    },
    frmEdDecisMandWorkSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdDecisMandWorkSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdDecisMandWorkSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdDecisMandWorkSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdDecisMandWorkGetCommand: state => () => {
      return state.command
    },
    frmEdDecisMandWorkGetData: state => {
      return state.data
    }
  }
};
