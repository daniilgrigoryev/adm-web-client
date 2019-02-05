export default {
  state: {
    moduleName: 'wizardItemAddress',
    cid: null,
    bean: 'WizardItemAddress',
    routeName: 'WizardItemAddress',
    data: null,
    command: null
  },
  mutations: {
    wizardItemAddressSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemAddressSetData(state, data) {
      state.data = data;
    },
    wizardItemAddressSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemAddressSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemAddressSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemAddressSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemAddressGetCommand: state => () => {
      return state.command
    },
    wizardItemAddressGetData: state => {
      return state.data
    }
  }
};
