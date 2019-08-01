import * as funcUtils from '~/assets/js/utils/funcUtils';
import * as formStack from '~/assets/js/api/formStack';
import RequestApi from '~/assets/js/api/requestApi';

export default {
  state: {
    moduleName: 'docsReestr',
    cid: null,
    bean: 'DocsReestr',
    routeName: 'DocsReestr',
    data: null,
    command: null,
    deloErrors: [],
    selectId: {
      toSign: [],
      toReestr: [],
    },
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

    docsReestrToggleSelectedToSign(state, item) {
      let storeItem = state.data.deloList.find((el) => el.cardId === item.cardId);
      storeItem.selected.toSign = !storeItem.selected.toSign;
    },
    docsReestrToggleSelectedToReestr(state, item) {
      let storeItem = state.data.deloList.find((el) => el.cardId === item.cardId);
      storeItem.selected.toReestr = !storeItem.selected.toReestr;
    },
    docsReestrToggleSelectedToSignAll(state, payload) {
      state.data.deloList.forEach((el) => {
        el.selected.toSign = funcUtils.isEmpty(el.signTime) && payload;
      });
    },
    docsReestrToggleSelectedToReestrAll(state, payload) {
      state.data.deloList.forEach((el) => {
        el.selected.toReestr = payload;
      });
    },
    docsReestrSetDeloErrors(state, payload) {
      state.deloErrors = payload;
    },
    docsReestrGetSelectToSign(state, payload) {
      state.selectId.toSign = payload;
    },
    docsReestrGetSelectToReestr(state, payload) {
      state.selectId.toReestr = payload;
    },
    docsReestrSetItemSignTime(state, item) {
      item = new Date();
    },
  },
  actions: {
    docsReestrSetCid(vm, cid) {
      vm.state.cid = cid;
    },
    docsReestrSetData({ commit, state }, data) {
      if (data !== null && data.deloList) {
        data.deloList.forEach((el) => {
          el.selected = {
            toSign: state.selectId.toSign.length
              ? funcUtils.isEmpty(el.signTime) && state.selectId.toSign.includes(el.cardId)
              : false,
            toReestr: state.selectId.toReestr.length
              ? state.selectId.toReestr.includes(el.cardId)
              : false,
          };
        });
      }
      commit('docsReestrSetData', data);
    },
    docsReestrSetCommand(vm, command) {
      vm.state.command = command;
    },
    docsReestrToggleSelectedToSign({ commit, dispatch }, payload) {
      commit('docsReestrToggleSelectedToSign', payload);
      dispatch('docsReestrSetSelectId');
    },
    docsReestrToggleSelectedToReestr({ commit, dispatch }, payload) {
      commit('docsReestrToggleSelectedToReestr', payload);
      dispatch('docsReestrSetSelectPostId');
    },
    docsReestrToggleSelectedToSignAll({ commit, dispatch }, payload) {
      commit('docsReestrToggleSelectedToSignAll', payload);
      dispatch('docsReestrSetSelectId');
    },
    docsReestrToggleSelectedToReestrAll({ commit, dispatch }, payload) {
      commit('docsReestrToggleSelectedToReestrAll', payload);
      dispatch('docsReestrSetSelectPostId');
    },
    docsReestrSetSelectId({ state, commit }) {
      let listId = state.data.deloList.filter((el) => el.selected.toSign).map((el) => el.cardId);
      RequestApi.prepareData({
        method: 'setSelectId',
        params: {
          selectId: listId,
        },
      });
      commit('docsReestrGetSelectToSign', listId);
    },
    docsReestrSetSelectPostId({ state, commit }) {
      let listId = state.data.deloList.filter((el) => el.selected.toReestr).map((el) => el.cardId);
      RequestApi.prepareData({
        method: 'setSelectPostId',
        params: {
          selectPostId: listId,
        },
      });
      commit('docsReestrGetSelectToReestr', listId);
    },
    async docsReestrGetSelectToSign({ commit }) {
      let eventResponse = await RequestApi.prepareData({
        method: 'getSelectId',
      });
      let { data } = JSON.parse(eventResponse.response);
      if (data.length) {
        commit('docsReestrGetSelectToSign', data);
      }
    },
    async docsReestrGetSelectToReestr({ commit }) {
      let eventResponse = await RequestApi.prepareData({
        method: 'getSelectPostId',
      });
      let { data } = JSON.parse(eventResponse.response);
      if (data.length) {
        commit('docsReestrGetSelectToReestr', data);
      }
    },
    docsReestrSetDeloErrors({ commit }, payload) {
      commit('docsReestrSetDeloErrors', payload);
    },
    docsReestrSetItemSignTime({ commit }, payload) {
      commit('docsReestrSetItemSignTime', payload);
    },
  },
  getters: {
    docsReestrGetCommand: (state) => () => {
      return state.command;
    },
    docsReestrGetData: (state) => {
      return state.data;
    },
    docsReestrGetCid: (state) => {
      return state.cid;
    },
  },
};
