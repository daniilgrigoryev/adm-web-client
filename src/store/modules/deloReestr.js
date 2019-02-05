export default {
  state: {
    moduleName: 'deloReestr',
    cid: null,
    bean: 'DeloReestr',
    routeName: 'DeloReestr',
    data: null,
    command: null
  },
  mutations: {
    deloReestrSetCid(state, cid) {
      state.cid = cid;
    },
    deloReestrSetData(state, data) {
      state.data = data;
    },
    deloReestrSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    deloReestrSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    deloReestrSetData(vm, data) {
      vm.state.data = data;
    },
    deloReestrSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    deloReestrGetCommand: state => () => {
      return state.command
    },
    deloReestrGetData: state => {
      return state.data
    }
  }
};
