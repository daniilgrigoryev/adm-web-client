export default {
  state: {
    moduleName: 'wizardItemLvok2025',
    cid: null,
    bean: 'WizardItemLvok2025',
    routeName: 'WizardItemLvok2025',
    data: null,
    command: null
  },
  mutations: {
    wizardItemLvok2025SetCid(state, cid) {
      state.cid = cid;
    },
    wizardItemLvok2025SetData(state, data) {
      state.data = data;
    },
    wizardItemLvok2025SetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    wizardItemLvok2025SetCid(vm, cid) {
      vm.state.cid = cid;
    },
    wizardItemLvok2025SetData(vm, data) {
      vm.state.data = data;
    },
    wizardItemLvok2025SetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    wizardItemLvok2025GetCommand: state => () => {
      return state.command
    },
    wizardItemLvok2025GetData: state => {
      return state.data
    }
  }
};
