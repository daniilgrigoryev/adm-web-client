export default {
  state: {
    moduleName: 'wizardScenarioProtAPN',
    cid: null,
    bean: 'WizardExecuter',
    routeName: 'WizardScenarioProtAPN',
    data: null,
    command: null
  },
  mutations: {
    wizardScenarioProtAPNSetCid(state, cid) {
      state.cid = cid;
    },
    wizardScenarioProtAPNSetData(state, data) {
      state.data = data;
    },
    wizardScenarioProtAPNSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardScenarioProtAPNSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardScenarioProtAPNSetData(vm, data) {
      vm.state.data = data;
    },
    wizardScenarioProtAPNSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardScenarioProtAPNGetCommand: state => () => {
      return state.command
    },
    wizardScenarioProtAPNGetData: state => {
      return state.data
    }
  }
};
