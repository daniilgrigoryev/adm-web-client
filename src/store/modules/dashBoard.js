export default {
    state: {
      moduleName: 'dashBoard',
      cid: null,
      bean: null,
      routeName: 'DashBoard',
      data: null,
      command: null
    },
    mutations: {
      dashBoardSetCid(state, cid) {
        state.cid = cid;
      },
      dashBoardSetData(state, data) {
        state.data = data;
      },
      dashBoardSetCommand(state, command) {
        state.command = command;
      }
    },
    actions: {
      dashBoardSetCid: ({commit}, payload) => {
        commit('dashBoardSetCid', payload);
      },
      dashBoardSetData: ({commit}, payload) => {
        commit('dashBoardSetData', payload.data);
      },
      dashBoardSetCommand: ({commit}, payload) => {
        commit('dashBoardSetCommand', payload.data);
      }
    },
    getters: {
      dashBoardGetCommand: state => () => {
        return state.command
      },
      dashBoardGetData: state => {
        return state.data
      }
    }
  };
