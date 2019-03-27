export default {
  state: {
    moduleName: 'authorization',
    cid: null,
    bean: null,
    routeName: 'Authorization',
    data: null,
    command: null
  },
  mutations: {
    authorizationSetCid(state, cid) {
      state.cid = cid;
    },
    authorizationSetData(state, data) {
      state.data = data;
    },
    authorizationSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    authorizationSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    authorizationSetData(vm, data) {
      vm.state.data = data;
    },
    authorizationSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    authorizationGetCommand: state => () => {
      return state.command
    },
    authorizationGetData: state => {
      return state.data
    }
  }
};
