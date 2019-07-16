export default {
  namespaced: true,
  state: {
    status: false,
    title: "",
    content: {
      title: "",
      desc: "",
    },
  },
  mutations: {
    changeStatus(state, payload) {
      state.status = payload;
      if (!state.status) {
        state.title = '';
        state.content = {};
      }
    },
    changeContent(state, payload) {
      state.content = payload;
      state.title = payload.dialogTitle || 'Успешно';
    },
  },
  actions: {
    changeStatus({ commit }, payload) {
      commit("changeStatus", payload);
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
