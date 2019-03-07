export default {
  state: {
    moduleName: 'addressViewEdit',
    cid: null,
    bean: 'AddressViewEdit',
    routeName: 'AddressViewEdit',
    data: null,
    command: null
  },
  mutations: {
    addressViewEditSetCid(state, cid) {
      state.cid = cid;
    },
    addressViewEditSetData(state, data) {
      state.data = data;
    },
    addressViewEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    addressViewEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    addressViewEditSetData(vm, data) {
      vm.state.data = data;
    },
    addressViewEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    addressViewEditGetCommand: state => () => {
      return state.command
    },
    addressViewEditGetData: state => {
      return state.data
    }
  }
};
