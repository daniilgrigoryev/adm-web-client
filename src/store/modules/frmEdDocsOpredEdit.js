export default {
    state: {
      moduleName: 'frmEdDocsOpredEdit',
      cid: null,
      bean: 'FrmEdDocsOpredEdit',
      routeName: 'FrmEdDocsOpredEdit',
      data: null,
      command: null
    },
    mutations: {
      frmEdDocsOpredEditSetCid(state, cid) {
        state.cid = cid;
      },
      frmEdDocsOpredEditSetData(state, data) {
        state.data = data;
      },
      frmEdDocsOpredEditSetCommand(state, command) {
        state.command = command;
      }
    },
    actions: {
      frmEdDocsOpredEditSetCid(vm, cid) {
        vm.state.cid = cid;
      },
      frmEdDocsOpredEditSetData(vm, data) {
        vm.state.data = data;
      },
      frmEdDocsOpredEditSetCommand(vm, command) {
        vm.state.command = command;
      }
    },
    getters: {
      frmEdDocsOpredEditGetCommand: state => () => {
        return state.command
      },
      frmEdDocsOpredEditGetData: state => {
        return state.data
      }
    }
  };
  