export default {
  namespaced: true,
  state: {
    status: false,
    content: {
      title: "",
      desc: "",
    }
  },
  mutations: {
    changeStatus(state, payload) {
      state.status = payload;
      if (!payload) {
        state.content = {};
      }
    },
    changeContent(state, payload) {
      state.content = payload;
    },
  },
  actions: {
    changeStatus ({ commit }, payload) {
      commit('changeStatus', payload)
    },
    changeContent ({ commit, dispatch }, payload) {
      commit('changeContent', payload);
      dispatch('changeStatus', true);
    },
  },
};
