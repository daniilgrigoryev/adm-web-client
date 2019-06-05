export default {
  state: {
    moduleName: 'postRegistryEdit',
    cid: null,
    bean: 'PostRegistryEdit',
    routeName: 'PostRegistryEdit',
    data: null,
    command: null
  },
  mutations: {
    postRegistryEditSetCid(state, cid) {
      state.cid = cid;
    },
    postRegistryEditSetData(state, data) {
      state.data = data;
    },
    postRegistryEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    postRegistryEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    postRegistryEditSetData(vm, data) {
      vm.state.data = data;
    },
    postRegistryEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    postRegistryEditGetCommand: state => () => {
      return state.command
    },
    postRegistryEditGetData: state => {
      return state.data
    }
  }
};
