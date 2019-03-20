export default {
    state: {
      moduleName: 'frmEdDocsProtEdit',
      cid: null,
      bean: 'FrmEdDocsProtEdit',
      routeName: 'FrmEdDocsProtEdit',
      data: null,
      command: null
    },
    mutations: {
      frmEdDocsProtEditSetCid(state, cid) {
        state.cid = cid;
      },
      frmEdDocsProtEditSetData(state, data) {
        state.data = data;
      },
      frmEdDocsProtEditSetCommand(state, command) {
        state.command = command;
      }
    },
    actions: {
      frmEdDocsProtEditSetCid(vm, cid) {
        vm.state.cid = cid;
      },
      frmEdDocsProtEditSetData(vm, data) {
        vm.state.data = data;
      },
      frmEdDocsProtEditSetCommand(vm, command) {
        vm.state.command = command;
      }
    },
    getters: {
      frmEdDocsProtEditGetCommand: state => () => {
        return state.command
      },
      frmEdDocsProtEditGetData: state => {
        return state.data
      }
    }
  };
  