export default {
  namespaced: true,
  state: {
    status: false,
    content: {
      title: "",
      desc: "",
    },
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
    toggleSize(state, item) {
      item.open = !item.open;
    },
  },
  actions: {
    changeStatus({ commit }, payload) {
      commit("changeStatus", payload);
    },
    toggleSize({ commit }, item) {
      commit("toggleSize", item);
    },
    changeContent({ commit, dispatch }, payload) {
      if (Array.isArray(payload.desc)) {
        payload.desc.map(el => {
          return {
            open: false,
            text: el,
          };
        });
      } else {
        payload.desc = [
          {
            open: false,
            text: payload.desc,
          },
        ];
      }
      commit("changeContent", payload);
      dispatch("changeStatus", true);
    },
  },
};1