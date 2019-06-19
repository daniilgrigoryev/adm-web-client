export default {
  state: {
    moduleName: 'docsReestr',
    cid: null,
    bean: 'DocsReestr',
    routeName: 'DocsReestr',
    data: null,
    command: null
  },
  mutations: {
    docsReestrSetCid(state, cid) {
      state.cid = cid;
    },
    docsReestrSetData(state, data) {
      state.data = data;
    },
    docsReestrSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    docsReestrSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    docsReestrSetData(vm, data) {
      vm.state.data = data;
    },
    docsReestrSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    docsReestrGetCommand: state => () => {
      return state.command
    },
    docsReestrGetData: state => {
      return state.data
    },
    docsReestrGetCid: state => {
      return state.cid
    }
  }
};
