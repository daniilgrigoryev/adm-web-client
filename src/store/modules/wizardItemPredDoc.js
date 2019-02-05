export default {
  state: {
    moduleName: 'wizardItemPredDoc',
    cid: null,
    bean: 'WizardItemPredDoc',
    routeName: 'WizardItemPredDoc',
    data: null,
    command: null
  },
  mutations: {
    wizardItemPredDocSetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemPredDocSetData(state, data) {
      state.data = data;
    },
    wizardItemPredDocSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemPredDocSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemPredDocSetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemPredDocSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemPredDocGetCommand: state => () => {
      return state.command
    },
    wizardItemPredDocGetData: state => {
      return state.data
    }
  }
};
