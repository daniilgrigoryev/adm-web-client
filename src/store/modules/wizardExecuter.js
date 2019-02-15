export default {
  state: {
    moduleName: 'wizardExecuter',
    cid: null,
    bean: 'WizardExecuter',
    routeName: 'WizardExecuter',
    data: null,
    command: null
  },
  mutations: {
    wizardExecuterSetCid(state, cid) {
      state.cid = cid;
    },
    wizardExecuterSetData(state, data) {
      state.data = data;
    },
    wizardExecuterSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardExecuterSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardExecuterSetData(vm, data) {
      vm.state.data = data;
    },
    wizardExecuterSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardExecuterGetCommand: state => () => {
      return state.command
    },
    wizardExecuterGetData: state => {
      return state.data
    }
  }
};
