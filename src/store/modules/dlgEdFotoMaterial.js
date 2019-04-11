export default {
  state: {
    moduleName: 'dlgEdFotoMaterial',
    cid: null,
    bean: 'DlgEdFotoMaterial',
    routeName: 'DlgEdFotoMaterial',
    data: null,
    command: null
  },
  mutations: {
    dlgEdFotoMaterialSetCid(state, cid) {
      state.cid = cid;
    },
    dlgEdFotoMaterialSetData(state, data) {
      state.data = data;
    },
    dlgEdFotoMaterialSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dlgEdFotoMaterialSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    dlgEdFotoMaterialSetData(vm, data) {
      vm.state.data = data;
    },
    dlgEdFotoMaterialSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    dlgEdFotoMaterialGetCommand: state => () => {
      return state.command;
    },
    dlgEdFotoMaterialGetData: state => {
      return state.data;
    },
    dlgEdFotoMaterialGetDataForMap: state => () => {
      return state.data;
    }
  }
};
