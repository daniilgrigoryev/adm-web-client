export default {
    state: {
      moduleName: 'frmEdDocsOtherPZTC',
      cid: null,
      bean: 'FrmEdDocsOtherPZTC',
      routeName: 'FrmEdDocsOtherPZTC',
      data: null,
      command: null
    },
    mutations: {
      frmEdDocsOtherPZTCSetCid(state, cid) {
        state.cid = cid;
      },
      frmEdDocsOtherPZTCSetData(state, data) {
        state.data = data;
      },
      frmEdDocsOtherPZTCSetCommand(state, command) {
        state.command = command;
      }
    },
    actions: {
      frmEdDocsOtherPZTCSetCid(vm, cid) {
        vm.state.cid = cid;
      },
      frmEdDocsOtherPZTCSetData(vm, data) {
        vm.state.data = data;
      },
      frmEdDocsOtherPZTCSetCommand(vm, command) {
        vm.state.command = command;
      }
    },
    getters: {
      frmEdDocsOtherPZTCGetCommand: state => () => {
        return state.command
      },
      frmEdDocsOtherPZTCGetData: state => {
        return state.data
      }
    }
  };
