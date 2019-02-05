export default {
  state: {
    moduleName: 'wizardItemOrganization',
    cid: null,
    bean: 'WizardItemOrganization',
    routeName: 'WizardItemOrganization',
    data: null,
    command: null
  },
  mutations: {
    wizardItemOrganizationSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemOrganizationSetData(state, data) {
      state.data = data;
    },
    wizardItemOrganizationSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemOrganizationSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemOrganizationSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemOrganizationSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemOrganizationGetCommand: state => () => {
      return state.command
    },
    wizardItemOrganizationGetData: state => {
      return state.data
    }
  }
};
