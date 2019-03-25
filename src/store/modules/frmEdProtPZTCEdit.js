export default {
    state: {
      moduleName: 'frmEdProtPZTCEdit',
      cid: null,
      bean: 'FrmEdDocsOtherEdit',
      routeName: 'FrmEdProtPZTCEdit',
      data: null,
      command: null
    },
    mutations: {
      frmEdProtPZTCEditSetCid(state, cid) {
        state.cid = cid;
      },
      frmEdProtPZTCEditSetData(state, data) {
        state.data = data;
      },
      frmEdProtPZTCEditSetCommand(state, command) {
        state.command = command;
      }
    },
    actions: {
      frmEdProtPZTCEditSetCid(vm, cid) {
        vm.state.cid = cid;
      },
      frmEdProtPZTCEditSetData(vm, data) {
        vm.state.data = data;
      },
      frmEdProtPZTCEditSetCommand(vm, command) {
        vm.state.command = command;
      }
    },
    getters: {
      frmEdProtPZTCEditGetCommand: state => () => {
        return state.command
      },
      frmEdProtPZTCEditGetData: state => {
        return state.data
      }
    }
  };
  