export default {
  state: {
    moduleName: 'wizardScenarioProtPZTC',
    cid: null,
    bean: 'WizardExecuter',
    routeName: 'WizardScenarioProtPZTC',
    data: null,
    command: null
  },
  mutations: {
    wizardScenarioProtPZTCSetCid(state, cid) {
      state.cid = cid;
    },
    wizardScenarioProtPZTCSetData(state, data) {
      state.data = data;
    },
    wizardScenarioProtPZTCSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardScenarioProtPZTCSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardScenarioProtPZTCSetData(vm, data) {
      vm.state.data = data;
    },
    wizardScenarioProtPZTCSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardScenarioProtPZTCGetCommand: state => () => {
      return state.command
    },
    wizardScenarioProtPZTCGetData: state => {
      return state.data
    }
  }
};
