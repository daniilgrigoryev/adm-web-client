export default {
  state: {
    moduleName: 'frnEdVehsAMTCEdit',
    cid: null,
    bean: 'FrnEdVehsAMTCEdit',
    routeName: 'FrnEdVehsAMTCEdit',
    data: null,
    command: null
  },
  mutations: {
    frnEdVehsAMTCEditSetCid(state, cid) {
      state.cid = cid;
    },
    frnEdVehsAMTCEditSetData(state, data) {
      state.data = data;
    },
    frnEdVehsAMTCEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frnEdVehsAMTCEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frnEdVehsAMTCEditSetData(vm, data) {
      vm.state.data = data;
    },
    frnEdVehsAMTCEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frnEdVehsAMTCEditGetCommand: state => () => {
      return state.command
    },
    frnEdVehsAMTCEditGetData: state => {
      return state.data
    }
  }
};
