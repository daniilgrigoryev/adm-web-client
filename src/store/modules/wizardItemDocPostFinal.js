export default {
  state: {
    moduleName: 'wizardItemDocPostFinal',
    cid: null,
    bean: 'WizardItemDocPostFinal',
    routeName: 'WizardItemDocPostFinal',
    data: null,
    command: null
  },
  mutations: {
    wizardItemDocPostFinalSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemDocPostFinalSetData(state, data) {
      state.data = data;
    },
    wizardItemDocPostFinalSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemDocPostFinalSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemDocPostFinalSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemDocPostFinalSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemDocPostFinalGetCommand: state => () => {
      return state.command
    },
    wizardItemDocPostFinalGetData: state => {
      return state.data
    }
  }
};
