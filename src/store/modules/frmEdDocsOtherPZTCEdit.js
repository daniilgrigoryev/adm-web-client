export default {
    state: {
      moduleName: 'frmEdDocsOtherPZTCEdit',
      cid: null,
      bean: 'FrmEdDocsOtherPZTCEdit',
      routeName: 'FrmEdDocsOtherPZTCEdit',
      data: null,
      command: null
    },
    mutations: {
      frmEdDocsOtherPZTCEditSetCid(state, cid) {
        state.cid = cid;
      },
      frmEdDocsOtherPZTCEditSetData(state, data) {
        state.data = data;
      },
      frmEdDocsOtherPZTCEditSetCommand(state, command) {
        state.command = command;
      }
    },
    actions: {
      frmEdDocsOtherPZTCEditSetCid(vm, cid) {
        vm.state.cid = cid;
      },
      frmEdDocsOtherPZTCEditSetData(vm, data) {
        vm.state.data = data;
      },
      frmEdDocsOtherPZTCEditSetCommand(vm, command) {
        vm.state.command = command;
      }
    },
    getters: {
      frmEdDocsOtherPZTCEditGetCommand: state => () => {
        return state.command
      },
      frmEdDocsOtherPZTCEditGetData: state => {
        return state.data
      }
    }
  };
