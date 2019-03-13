export default {
  state: {
    moduleName: 'wizardItemDocProtEvac',
    cid: null,
    bean: 'WizardExecuter',
    routeName: 'WizardItemDocProtEvac',
    data: null,
    command: null
  },
  mutations: {
    wizardItemDocProtEvacSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemDocProtEvacSetData(state, data) {
      state.data = data;
    },
    wizardItemDocProtEvacSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemDocProtEvacSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemDocProtEvacSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemDocProtEvacSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemDocProtEvacGetCommand: state => () => {
      return state.command
    },
    wizardItemDocProtEvacGetData: state => {
      return state.data
    }
  }
};
