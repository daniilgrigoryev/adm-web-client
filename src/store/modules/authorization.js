export default {
  state: {
    moduleName: 'authorization',
    cid: null,
    bean: null,
    routeName: 'Authorization',
    data: null,
    command: null
  },
  mutations: {
    authorizationSetCid(state, cid) {
      state.cid = cid;
    },
    authorizationSetData(state, data) {
      state.data = data;
    },
    authorizationSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    authorizationSetCid: ({commit}, payload) => {
      commit('authorizationSetCid', payload);
    },
    authorizationSetData: ({commit}, payload) => {
      commit('authorizationSetData', payload.data);
    },
    authorizationSetCommand: ({commit}, payload) => {
      commit('authorizationSetCommand', payload.data);
    }
  },
  getters: {
    authorizationGetCommand: state => () => {
      return state.command
    },
    authorizationGetData: state => {
      return state.data
    }
  }
};
