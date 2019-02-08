export default {
  state: {
    moduleName: 'delo',
    cid: null,
    bean: null,
    routeName: 'Delo',
    data: null,
    command: null
  },
  mutations: {
    deloSetCid(state, cid) {
      state.cid = cid;
    },
    deloSetData(state, data) {
      state.data = data;
    },
    deloSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    deloSetCid: ({commit}, payload) => {
      commit('deloSetCid', payload);
    },
    deloSetData: ({commit}, payload) => {
      commit('deloSetData', payload.data);
    },
    deloSetCommand: ({commit}, payload) => {
      commit('deloSetCommand', payload.data);
    }
  },
  getters: {
    deloGetCommand: state => () => {
      return state.command
    },
    deloGetData: state => {
      return state.data
    }
  }
};
