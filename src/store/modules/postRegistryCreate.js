export default {
  state: {
    moduleName: 'postRegistryCreate',
    cid: null,
    bean: 'PostRegistryCreate',
    routeName: 'PostRegistryCreate',
    data: null,
    command: null
  },
  mutations: {
    postRegistryCreateSetCid(state, cid) {
      state.cid = cid;
    },
    postRegistryCreateSetData(state, data) {
      state.data = data;
    },
    postRegistryCreateSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    postRegistryCreateSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    postRegistryCreateSetData(vm, data) {
      vm.state.data = data;
    },
    postRegistryCreateSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    postRegistryCreateGetCommand: state => () => {
      return state.command
    },
    postRegistryCreateGetData: state => {
      return state.data
    }
  }
};
