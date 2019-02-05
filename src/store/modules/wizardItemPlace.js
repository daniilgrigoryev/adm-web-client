export default {
  state: {
    moduleName: 'wizardItemPlace',
    cid: null,
    bean: 'WizardItemPlace',
    routeName: 'WizardItemPlace',
    data: null,
    command: null
  },
  mutations: {
    wizardItemPlaceSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemPlaceSetData(state, data) {
      state.data = data;
    },
    wizardItemPlaceSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemPlaceSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemPlaceSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemPlaceSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemPlaceGetCommand: state => () => {
      return state.command
    },
    wizardItemPlaceGetData: state => {
      return state.data
    }
  }
};
