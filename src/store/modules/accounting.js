export default {
  state: {
    moduleName: 'accounting',
    cid: null,
    bean: null,
    routeName: 'Accounting',
    data: null,
    command: null
  },
  mutations: {
    accountingSetCid(state, cid) {
      state.cid = cid;
    },
    accountingSetData(state, data) {
      state.data = data;
    },
    accountingSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    accountingSetCid: ({commit}, payload) => {
      commit('accountingSetCid', payload);
    },
    accountingSetData: ({commit}, payload) => {
      commit('accountingSetData', payload.data);
    },
    accountingSetCommand: ({commit}, payload) => {
      commit('accountingSetCommand', payload.data);
    }
  },
  getters: {
    accountingGetCommand: state => () => {
      return state.command
    },
    accountingGetData: state => {
      return state.data
    }
  }
};
