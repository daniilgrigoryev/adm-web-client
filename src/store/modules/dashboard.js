export default {
    state: {
      moduleName: 'dashboard',
      cid: null,
      bean: null,
      routeName: 'Dashboard',
      data: null,
      command: null
    },
    mutations: {
      dashboardSetCid(state, cid) {
        state.cid = cid;
      },
      dashboardSetData(state, data) {
        state.data = data;
      },
      dashboardSetCommand(state, command) {
        state.command = command;
      }
    },
    actions: {
      dashboardSetCid: ({commit}, payload) => {
        commit('dashboardSetCid', payload);
      },
      dashboardSetData: ({commit}, payload) => {
        commit('dashboardSetData', payload.data);
      },
      dashboardSetCommand: ({commit}, payload) => {
        commit('dashboardSetCommand', payload.data);
      }
    },
    getters: {
      dashboardGetCommand: state => () => {
        return state.command
      },
      dashboardGetData: state => {
        return state.data
      }
    }
  };
  