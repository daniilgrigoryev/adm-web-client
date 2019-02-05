export default {
  state: {
    moduleName: 'wizardItemOwner',
    cid: null,
    bean: 'WizardItemOwner',
    routeName: 'WizardItemOwner',
    data: null,
    command: null
  },
  mutations: {
    wizardItemOwnerSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemOwnerSetData(state, data) {
      state.data = data;
    },
    wizardItemOwnerSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemOwnerSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemOwnerSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemOwnerSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemOwnerGetCommand: state => () => {
      return state.command
    },
    wizardItemOwnerGetData: state => {
      return state.data
    }
  }
};
