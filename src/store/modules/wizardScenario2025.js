export default {
  state: {
    moduleName: 'wizardScenario2025',
    cid: null,
    bean: 'WizardExecuter',
    routeName: 'WizardScenario2025',
    data: null,
    command: null
  },
  mutations: {
    wizardScenario2025SetCid(state, cid) {
      state.cid = cid;
    },
    wizardScenario2025SetData(state, data) {
      state.data = data;
    },
    wizardScenario2025SetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardScenario2025SetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardScenario2025SetData(vm, data) {
      vm.state.data = data;
    },
    wizardScenario2025SetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardScenario2025GetCommand: state => () => {
      return state.command
    },
    wizardScenario2025GetData: state => {
      return state.data
    }
  }
};
