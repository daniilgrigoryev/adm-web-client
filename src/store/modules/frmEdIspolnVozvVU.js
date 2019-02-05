export default {
  state: {
    moduleName: 'frmEdIspolnVozvVU',
    cid: null,
    bean: 'FrmEdIspolnVozvVU',
    routeName: 'FrmEdIspolnVozvVU',
    data: null,
    command: null
  },
  mutations: {
    frmEdIspolnVozvVUSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdIspolnVozvVUSetData(state, data) {
      state.data = data;
    },
    frmEdIspolnVozvVUSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdIspolnVozvVUSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdIspolnVozvVUSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdIspolnVozvVUSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdIspolnVozvVUGetCommand: state => () => {
      return state.command
    },
    frmEdIspolnVozvVUGetData: state => {
      return state.data
    }
  }
};
