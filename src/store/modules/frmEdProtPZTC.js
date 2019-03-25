export default {
    state: {
      moduleName: 'frmEdProtPZTC',
      cid: null,
      bean: 'FrmEdProtPZTC',
      routeName: 'FrmEdProtPZTC',
      data: null,
      command: null
    },
    mutations: {
      frmEdProtPZTCSetCid(state, cid) {
        state.cid = cid;
      },
      frmEdProtPZTCSetData(state, data) {
        state.data = data;
      },
      frmEdProtPZTCSetCommand(state, command) {
        state.command = command;
      }
    },
    actions: {
      frmEdProtPZTCSetCid(vm, cid) {
        vm.state.cid = cid;
      },
      frmEdProtPZTCSetData(vm, data) {
        vm.state.data = data;
      },
      frmEdProtPZTCSetCommand(vm, command) {
        vm.state.command = command;
      }
    },
    getters: {
      frmEdProtPZTCGetCommand: state => () => {
        return state.command
      },
      frmEdProtPZTCGetData: state => {
        return state.data
      }
    }
  };
  