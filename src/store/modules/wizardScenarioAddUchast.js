export default {
  state: {
    moduleName: 'wizardScenarioAddUchast',
    cid: null,
    bean: 'WizardScenarioAddUchast',
    routeName: 'WizardScenarioAddUchast',
    data: null,
    command: null
  },
  mutations: {
    wizardScenarioAddUchastSetCid(state, cid) {
      state.cid = cid;
    },
    wizardScenarioAddUchastSetData(state, data) {
      state.data = data;
    },
    wizardScenarioAddUchastSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardScenarioAddUchastSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardScenarioAddUchastSetData(vm, data) {
      vm.state.data = data;
    },
    wizardScenarioAddUchastSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardScenarioAddUchastGetCommand: state => () => {
      return state.command
    },
    wizardScenarioAddUchastGetData: state => {
      return state.data
    }
  }
};
