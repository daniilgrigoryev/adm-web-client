export default {
  state: {
    moduleName: 'wizardItemAddUchast',
    cid: null,
    bean: 'WizardItemAddUchast',
    routeName: 'WizardItemAddUchast',
    data: null,
    command: null
  },
  mutations: {
    wizardItemAddUchastSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemAddUchastSetData(state, data) {
      state.data = data;
    },
    wizardItemAddUchastSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemAddUchastSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemAddUchastSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemAddUchastSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemAddUchastGetCommand: state => () => {
      return state.command
    },
    wizardItemAddUchastGetData: state => {
      return state.data
    }
  }
};
