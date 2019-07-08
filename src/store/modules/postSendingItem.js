export default {
  state: {
    moduleName: 'postSendingItem',
    cid: null,
    bean: 'PostSendingItem',
    routeName: 'PostSendingItem',
    data: null,
    command: null
  },
  mutations: {
    postSendingItemSetCid(state, cid) {
      state.cid = cid;
    },
    postSendingItemSetData(state, data) {
      state.data = data;
    },
    postSendingItemSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    postSendingItemSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    postSendingItemSetData(vm, data) {
      vm.state.data = data;
    },
    postSendingItemSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    postSendingItemGetCommand: state => () => {
      return state.command
    },
    postSendingItemGetData: state => {
      return state.data
    }
  }
};
