export default {
  state: {
    moduleName: 'registryReestr',
    cid: null,
    bean: 'RegistryReestr',
    routeName: 'RegistryReestr',
    data: null,
    command: null
  },
  mutations: {
    registryReestrSetCid(state, cid) {
      state.cid = cid;
    },
    registryReestrSetData(state, data) {
      state.data = data;
    },
    registryReestrSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    registryReestrSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    registryReestrSetData(vm, data) {
      vm.state.data = data;
    },
    registryReestrSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    registryReestrGetCommand: state => () => {
      return state.command
    },
    registryReestrGetData: state => {
      return state.data
    }
  }
};
