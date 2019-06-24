export default {
  state: {
    moduleName: 'deloReestrForPost',
    cid: null,
    bean: 'DeloReestrForPost',
    routeName: 'DeloReestrForPost',
    data: null,
    deloErrors: [],
    command: null
  },
  mutations: {
    deloReestrForPostSetCid(state, cid) {
      state.cid = cid;
    },
    deloReestrForPostSetData(state, data) {
      state.data = data;
    },
    deloReestrForPostSetCommand(state, command) {
      state.command = command;
    },
    
    deloReestrForPostToggleSelected(state, item) {
      let storeItem = state.data.deloList.find((el) => el.deloId === item.deloId);
        storeItem.selected = !storeItem.errors && !storeItem.selected;
    },
    deloReestrForPostChangeSelectionItems(state, payload) {
      state.data.deloList.forEach((el) => {
        if (payload.items.includes(el) && !el.errors) {
          el.selected = payload.action;
        }
      });
    },
    deloReestrForPostSetDeloErrors(state, payload) {
      state.deloErrors = payload;
    },
  },
  actions: {
    deloReestrForPostSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    deloReestrForPostSetData({state}, data) {
      if (data !== null && data.deloList) {
        data.deloList.forEach(el => {
          el.selected = false;
          el.errors = state.deloErrors.length ? state.deloErrors.includes(el.deloId): false;
        });
      }
      state.data = data;
    },
    deloReestrForPostSetCommand(vm, command) {
      vm.state.command = command;
    },
    deloReestrForPostChangeSelectionItems({commit}, payload) {
      commit("deloReestrForPostChangeSelectionItems", payload)
    },
    deloReestrForPostSetDeloErrors({commit}, payload) {
      commit("deloReestrForPostSetDeloErrors", payload)
    },
  },
  getters: {
    deloReestrForPostGetCommand: state => () => {
      return state.command
    },
    deloReestrForPostGetData: state => {
      return state.data
    },
    deloReestrForPostGetCid: state => {
      return state.cid
    },
    deloReestrForPostGetDeloErrors: state => {
      return state.deloErrors
    }
  }
};
