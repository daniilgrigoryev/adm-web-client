export default {
  state: {
    moduleName: 'wizardScenarioPost',
    cid: null,
    bean: 'WizardExecuter',
    routeName: 'WizardScenarioPost',
    data: null,
    command: null
  },
  mutations: {
    wizardScenarioPostSetCid(state, cid) {
      state.cid = cid;
    },
    wizardScenarioPostSetData(state, data) {
      state.data = data;
    },
    wizardScenarioPostSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardScenarioPostSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardScenarioPostSetData(vm, data) {
      vm.state.data = data;
    },
    wizardScenarioPostSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardScenarioPostGetCommand: state => () => {
      return state.command
    },
    wizardScenarioPostGetData: state => {
      return state.data
    }
  }
};
