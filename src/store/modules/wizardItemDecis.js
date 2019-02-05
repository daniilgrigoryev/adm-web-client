export default {
  state: {
    moduleName: 'wizardItemDecis',
    cid: null,
    bean: 'WizardItemDecis',
    routeName: 'WizardItemDecis',
    data: null,
    command: null
  },
  mutations: {
    wizardItemDecisSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemDecisSetData(state, data) {
      state.data = data;
    },
    wizardItemDecisSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemDecisSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemDecisSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemDecisSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemDecisGetCommand: state => () => {
      return state.command
    },
    wizardItemDecisGetData: state => {
      return state.data
    }
  }
};
