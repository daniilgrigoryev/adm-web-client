export default {
  state: {
    moduleName: 'frmEdPetition',
    cid: null,
    bean: 'FrmEdPetition',
    routeName: 'FrmEdPetition',
    data: null,
    command: null
  },
  mutations: {
    frmEdPetitionSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdPetitionSetData(state, data) {
      state.data = data;
    },
    frmEdPetitionSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdPetitionSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdPetitionSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdPetitionSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdPetitionGetCommand: state => () => {
      return state.command
    },
    frmEdPetitionGetData: state => {
      return state.data
    }
  }
};
