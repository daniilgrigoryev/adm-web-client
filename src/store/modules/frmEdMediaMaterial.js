export default {
  state: {
    moduleName: 'frmEdMediaMaterial',
    cid: null,
    bean: 'FrmEdMediaMaterial',
    routeName: 'FrmEdMediaMaterial',
    data: null,
    command: null
  },
  mutations: {
    frmEdMediaMaterialSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdMediaMaterialSetData(state, data) {
      state.data = data;
    },
    frmEdMediaMaterialSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdMediaMaterialSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdMediaMaterialSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdMediaMaterialSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdMediaMaterialGetCommand: state => () => {
      return state.command
    },
    frmEdMediaMaterialGetData: state => {
      return state.data
    }
  }
};
