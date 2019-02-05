export default {
  state: {
    moduleName: 'wizardItemDocPostSecond',
    cid: null,
    bean: 'WizardItemDocPostSecond',
    routeName: 'WizardItemDocPostSecond',
    data: null,
    command: null
  },
  mutations: {
    wizardItemDocPostSecondSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemDocPostSecondSetData(state, data) {
      state.data = data;
    },
    wizardItemDocPostSecondSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemDocPostSecondSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemDocPostSecondSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemDocPostSecondSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemDocPostSecondGetCommand: state => () => {
      return state.command
    },
    wizardItemDocPostSecondGetData: state => {
      return state.data
    }
  }
};
