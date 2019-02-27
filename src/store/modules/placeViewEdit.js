export default {
  state: {
    moduleName: 'placeViewEdit',
    cid: null,
    bean: 'PlaceViewEdit',
    routeName: 'PlaceViewEdit',
    data: null,
    command: null
  },
  mutations: {
    placeViewEditSetCid(state, cid) {
      state.cid = cid;
    },
    placeViewEditSetData(state, data) {
      state.data = data;
    },
    placeViewEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    placeViewEditSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    placeViewEditSetData(vm, data) {
      vm.state.data = data;
    },
    placeViewEditSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    placeViewEditGetCommand: state => () => {
      return state.command
    },
    placeViewEditGetData: state => {
      return state.data
    }
  }
};
