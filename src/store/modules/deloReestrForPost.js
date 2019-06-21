export default {
  state: {
    moduleName: 'deloReestrForPost',
    cid: null,
    bean: 'DeloReestrForPost',
    routeName: 'DeloReestrForPost',
    data: null,
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
      storeItem.selected = !storeItem.selected;
    },
    deloReestrForPostChangeSelectionItems(state, payload) {
      state.data.deloList.forEach((el) => {
        if (payload.items.includes(el)) {
          el.selected = payload.action;
        }
      });
    },
  },
  actions: {
    deloReestrForPostSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    deloReestrForPostSetData(vm, data) {
      if (data !== null && data.deloList) {
        data.deloList.forEach(el => el.selected = false);
      }
      vm.state.data = data;
    },
    deloReestrForPostSetCommand(vm, command) {
      vm.state.command = command;
    }
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
    }
  }
};
