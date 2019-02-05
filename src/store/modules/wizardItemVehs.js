export default {
  state: {
    moduleName: 'wizardItemVehs',
    cid: null,
    bean: 'WizardItemVehs',
    routeName: 'WizardItemVehs',
    data: null,
    command: null
  },
  mutations: {
    wizardItemVehsSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemVehsSetData(state, data) {
      state.data = data;
    },
    wizardItemVehsSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemVehsSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemVehsSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemVehsSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemVehsGetCommand: state => () => {
      return state.command
    },
    wizardItemVehsGetData: state => {
      return state.data
    }
  }
};
