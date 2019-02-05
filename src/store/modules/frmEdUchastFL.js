export default {
  state: {
    moduleName: 'frmEdUchastFL',
    cid: null,
    bean: 'FrmEdUchastFL',
    routeName: 'FrmEdUchastFL',
    data: null,
    command: null
  },
  mutations: {
    frmEdUchastFLSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdUchastFLSetData(state, data) {
      state.data = data;
    },
    frmEdUchastFLSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdUchastFLSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdUchastFLSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdUchastFLSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdUchastFLGetCommand: state => () => {
      return state.command
    },
    frmEdUchastFLGetData: state => {
      return state.data
    }
  }
};
