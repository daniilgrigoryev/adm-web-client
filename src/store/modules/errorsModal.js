export default {
  namespaced: true,
  state: {
    status: false,
    descShow: false,
    content: {
      title: "",
      desc: "",
    },
  },
  mutations: {
    changeStatus(state, payload) {
      state.status = payload;
      if (!state.status) {
        state.content = {};
        state.descShow = false;
      }
    },
    changeContent(state, payload) {
      state.content = payload;
    },
    toggleDescShow(state) {
      state.descShow = !state.descShow;
    },
  },
  actions: {
    changeStatus({ commit }, payload) {
      commit("changeStatus", payload);
    },
    toggleDescShow({ commit }) {
      commit("toggleDescShow");
    },
    changeContent({ state, commit, dispatch }, payload) {
      // Искллючения
      if (state.content.title && payload.title == "Cannot convert undefined or null to object") {
        return;
      }
      // 
      commit("changeContent", payload);
      dispatch("changeStatus", true);
    },
  },
};