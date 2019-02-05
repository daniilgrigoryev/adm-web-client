export default {
  state: {
    moduleName: 'wizardItemDocPostFirst',
    cid: null,
    bean: 'WizardItemDocPostFirst',
    routeName: 'WizardItemDocPostFirst',
    data: null,
    command: null
  },
  mutations: {
    wizardItemDocPostFirstSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemDocPostFirstSetData(state, data) {
      state.data = data;
    },
    wizardItemDocPostFirstSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemDocPostFirstSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemDocPostFirstSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemDocPostFirstSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemDocPostFirstGetCommand: state => () => {
      return state.command
    },
    wizardItemDocPostFirstGetData: state => {
      return state.data
    }
  }
};
