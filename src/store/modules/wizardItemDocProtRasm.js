export default {
  state: {
    moduleName: 'wizardItemDocProtRasm',
    cid: null,
    bean: 'WizardExecuter',
    routeName: 'WizardItemDocProtRasm',
    data: null,
    command: null
  },
  mutations: {
    wizardItemDocProtRasmSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemDocProtRasmSetData(state, data) {
      state.data = data;
    },
    wizardItemDocProtRasmSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemDocProtRasmSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemDocProtRasmSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemDocProtRasmSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemDocProtRasmGetCommand: state => () => {
      return state.command
    },
    wizardItemDocProtRasmGetData: state => {
      return state.data
    }
  }
};
