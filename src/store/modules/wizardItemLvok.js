export default {
  state: {
    moduleName: 'wizardItemLvok',
    cid: null,
    bean: 'WizardItemLvok',
    routeName: 'WizardItemLvok',
    data: null,
    command: null
  },
  mutations: {
    wizardItemLvokSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemLvokSetData(state, data) {
      state.data = data;
    },
    wizardItemLvokSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemLvokSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemLvokSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemLvokSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemLvokGetCommand: state => () => {
      return state.command
    },
    wizardItemLvokGetData: state => {
      return state.data
    }
  }
};
