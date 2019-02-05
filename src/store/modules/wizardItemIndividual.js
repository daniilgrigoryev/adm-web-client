export default {
  state: {
    moduleName: 'wizardItemIndividual',
    cid: null,
    bean: 'WizardItemIndividual',
    routeName: 'WizardItemIndividual',
    data: null,
    command: null
  },
  mutations: {
    wizardItemIndividualSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemIndividualSetData(state, data) {
      state.data = data;
    },
    wizardItemIndividualSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemIndividualSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemIndividualSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemIndividualSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemIndividualGetCommand: state => () => {
      return state.command
    },
    wizardItemIndividualGetData: state => {
      return state.data
    }
  }
};
