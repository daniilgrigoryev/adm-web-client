export default {
  state: {
    moduleName: 'offense',
    cid: null,
    bean: null,
    routeName: 'Offense',
    data: null,
    command: null
  },
  mutations: {
    offenseSetCid(state, cid) {
      state.cid = cid;
    },
    offenseSetData(state, data) {
      state.data = data;
    },
    offenseSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    offenseSetCid: ({commit}, payload) => {
      commit('offenseSetCid', payload);
    },
    offenseSetData: ({commit}, payload) => {
      commit('offenseSetData', payload.data);
    },
    offenseSetCommand: ({commit}, payload) => {
      commit('offenseSetCommand', payload.data);
    }
  },
  getters: {
    offenseGetCommand: state => () => {
      return state.command
    },
    offenseGetData: state => {
      return state.data
    }
  }
};
