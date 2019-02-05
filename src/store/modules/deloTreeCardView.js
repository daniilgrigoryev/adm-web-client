export default {
  state: {
    moduleName: 'deloTreeCardView',
    cid: null,
    bean: 'DeloTreeCardView',
    routeName: 'DeloTreeCardView',
    data: null,
    command: null
  },
  mutations: {
    deloTreeCardViewSetCid(state, cid) {
      state.cid = cid;
    },
    deloTreeCardViewSetData(state, data) {
      state.data = data;
    },
    deloTreeCardViewSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    deloTreeCardViewSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    deloTreeCardViewSetData(vm, data) {
      vm.state.data = data;
    },
    deloTreeCardViewSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    deloTreeCardViewGetCommand: state => () => {
      return state.command
    },
    deloTreeCardViewGetData: state => {
      return state.data
    }
  }
};
