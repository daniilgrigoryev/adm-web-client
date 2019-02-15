export default {
  state: {
    moduleName: 'wizardItemDocProtFirst',
    cid: null,
    bean: 'WizardExecuter',
    routeName: 'WizardItemDocProtFirst',
    data: null,
    command: null
  },
  mutations: {
    wizardItemDocProtFirstSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemDocProtFirstSetData(state, data) {
      state.data = data;
    },
    wizardItemDocProtFirstSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemDocProtFirstSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemDocProtFirstSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemDocProtFirstSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemDocProtFirstGetCommand: state => () => {
      return state.command
    },
    wizardItemDocProtFirstGetData: state => {
      return state.data
    }
  }
};
