export default {
  state: {
    moduleName: 'wizardItemDocProt2025',
    cid: null,
    bean: 'WizardItemDocProt2025',
    routeName: 'WizardItemDocProt2025',
    data: null,
    command: null
  },
  mutations: {
    wizardItemDocProt2025SetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemDocProt2025SetData(state, data) {
      state.data = data;
    },
    wizardItemDocProt2025SetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemDocProt2025SetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemDocProt2025SetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemDocProt2025SetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemDocProt2025GetCommand: state => () => {
      return state.command
    },
    wizardItemDocProt2025GetData: state => {
      return state.data
    }
  }
};
