export default {
  state: {
    moduleName: 'frmEdIspolnPostUvedom',
    cid: null,
    bean: 'FrmEdIspolnPostUvedom',
    routeName: 'FrmEdIspolnPostUvedom',
    data: null,
    command: null
  },
  mutations: {
    frmEdIspolnPostUvedomSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdIspolnPostUvedomSetData(state, data) {
      state.data = data;
    },
    frmEdIspolnPostUvedomSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdIspolnPostUvedomSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdIspolnPostUvedomSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdIspolnPostUvedomSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdIspolnPostUvedomGetCommand: state => () => {
      return state.command
    },
    frmEdIspolnPostUvedomGetData: state => {
      return state.data
    }
  }
};
