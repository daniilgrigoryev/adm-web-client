export default {
  state: {
    moduleName: 'frmEdIspolnPrecrashIsp',
    cid: null,
    bean: 'FrmEdIspolnPrecrashIsp',
    routeName: 'FrmEdIspolnPrecrashIsp',
    data: null,
    command: null
  },
  mutations: {
    frmEdIspolnPrecrashIspSetCid(state, cid) {
      state.cid = cid;
    },
    frmEdIspolnPrecrashIspSetData(state, data) {
      state.data = data;
    },
    frmEdIspolnPrecrashIspSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    frmEdIspolnPrecrashIspSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    frmEdIspolnPrecrashIspSetData(vm, data) {
      vm.state.data = data;
    },
    frmEdIspolnPrecrashIspSetCommand(vm, command) {
      vm.state.command = command;
    }
  },
  getters: {
    frmEdIspolnPrecrashIspGetCommand: state => () => {
      return state.command
    },
    frmEdIspolnPrecrashIspGetData: state => {
      return state.data
    }
  }
};
