export default {
  state: {
    moduleName: 'registryReestrItem',
    cid: null,
    bean: 'RegistryReestrItem',
    routeName: 'RegistryReestrItem',
    data: null,
    command: null
  },
  mutations: {
    registryReestrItemSetCid(state, cid) {
      state.cid = cid;
    },
    registryReestrItemSetData(state, data) {
      state.data = data;
    },
    registryReestrItemSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    registryReestrItemSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    registryReestrItemSetData(vm, data) {
      vm.state.data = data;
    },
    registryReestrItemSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    registryReestrItemGetCommand: state => () => {
      return state.command
    },
    registryReestrItemGetData: state => {
      return state.data
    }
  }
};
