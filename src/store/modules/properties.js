export default {
  state: {
    data: null,
  },
  mutations: {
    propertiesSetData(state, data) {
      state.data = data;
    },
  },
  actions: {
    propertiesSetData(vm, data) {
      vm.state.data = data;
    },
  },
  getters: {
    propertiesGetData: state => {
      return state.data;
    }
  }
};
