export default {
  state: {
    moduleName: 'docsReestr',
    cid: null,
    bean: 'DocsReestr',
    routeName: 'DocsReestr',
    data: null,
    deloErrors: [],
    selectId: [],
    command: null
  },
  mutations: {
    docsReestrSetCid(state, cid) {
      state.cid = cid;
    },
    docsReestrSetData(state, data) {
      state.data = data;
    },
    docsReestrSetCommand(state, command) {
      state.command = command;
    },
    
    docsReestrToggleSelected(state, item) {
      let storeItem = state.data.deloList.find((el) => el.cardId === item.cardId);
        storeItem.selected = !storeItem.errors && !storeItem.selected;
    },
    docsReestrChangeSelectionItems(state, payload) {
      state.data.deloList.forEach((el) => {
        if (payload.items.includes(el) && !el.errors) {
          el.selected = payload.action;
        }
      });
    },
    docsReestrSetDeloErrors(state, payload) {
      state.deloErrors = payload;
    },
    docsReestrSetSelectId(state, payload) {
      state.selectId = payload;
    },
  },
  actions: {
    docsReestrSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    docsReestrSetData({state}, data) {
      if (data !== null && data.deloList) {
        data.deloList.forEach(el => {
          el.selected = state.selectId.length ? state.selectId.includes(el.cardId): false;
          el.errors = state.deloErrors.length ? state.deloErrors.includes(el.cardId): false;
        });
      }
      state.data = data;
    },
    docsReestrSetCommand(vm, command) {
      vm.state.command = command;
    },
    docsReestrToggleSelected({commit}, payload) {
      commit("docsReestrToggleSelected", payload)
    },
    docsReestrChangeSelectionItems({commit}, payload) {
      commit("docsReestrChangeSelectionItems", payload)
    },
    docsReestrSetDeloErrors({commit}, payload) {
      commit("docsReestrSetDeloErrors", payload)
    },
    docsReestrSetSelectId({commit}, payload) {
      commit("docsReestrSetSelectId", payload)
    },
    
  },
  getters: {
    docsReestrGetCommand: state => () => {
      return state.command
    },
    docsReestrGetData: state => {
      return state.data
    },
    docsReestrGetCid: state => {
      return state.cid
    },
  }
};
