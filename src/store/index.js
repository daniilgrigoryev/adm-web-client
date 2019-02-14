import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource'

import authorization from './modules/authorization';
import accounting from './modules/accounting';
import offense from './modules/offense';
import delo from './modules/delo';
import deloReestr from './modules/deloReestr';
import deloTreeCardView from './modules/deloTreeCardView';
import wizardScenarioPost from './modules/wizardScenarioPost';
import wizardScenario2025 from './modules/wizardScenario2025';
import wizardItemAddress from './modules/wizardItemAddress';
import wizardItemDecis from './modules/wizardItemDecis';
import wizardItemDocPostFinal from './modules/wizardItemDocPostFinal';
import wizardItemDocPostFirst from './modules/wizardItemDocPostFirst';
import wizardItemDocPostSecond from './modules/wizardItemDocPostSecond';
import wizardItemDocProt2025 from './modules/wizardItemDocProt2025';
import wizardItemIndividual from './modules/wizardItemIndividual';
import wizardItemLvok from './modules/wizardItemLvok';
import wizardItemLvok2025 from './modules/wizardItemLvok2025';
import wizardItemOrganization from './modules/wizardItemOrganization';
import wizardItemOwner from './modules/wizardItemOwner';
import wizardItemPlace from './modules/wizardItemPlace';
import wizardItemPredDoc from './modules/wizardItemPredDoc';
import wizardItemVehs from './modules/wizardItemVehs';
import * as funcUtils from "./../assets/js/utils/funcUtils";

Vue.use(Vuex);
Vue.use(VueResource);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    fillModule({commit, dispatch}, payload) {
      let event = payload.event;
      let data = event.data || event.response;
      if (data.length > 0) {
        let dataJson = JSON.parse(data);
        if (dataJson.method === 'logout' && funcUtils.isNotEmpty(localStorage.getItem('sid'))) {
          let vm = payload.vm.$root;
          vm.logout();
          return;
        } else if (dataJson.method === 'ping' && funcUtils.isNotEmpty(localStorage.getItem('sid'))) {
          let vm = payload.vm.$root;
          let secondsInactive = (new Date().getTime() - funcUtils.getfromLocalStorage('lastActive')) / 1000 / 60;
          if (secondsInactive > 15) {
            vm.logout();
          }
          return;
        }
        let respData = dataJson.data;
        let respError = dataJson.error;
        if (!funcUtils.isNull(respData)) {
          let props = this.state;
          for (let prop in props) {
            if (props.hasOwnProperty(prop)) {
              let propObj = props[prop];
              if (propObj && !funcUtils.isNull(propObj) && (propObj.hasOwnProperty('cid') || propObj.hasOwnProperty('bean'))) {
                let moduleObj = props[prop];
                let moduleCid = moduleObj.cid || funcUtils.getfromLocalStorage(moduleObj.moduleName);
                if ((!funcUtils.isNull(dataJson.cid) && (moduleCid === dataJson.cid)) || (!funcUtils.isNull(dataJson.bean) && (moduleObj.bean === dataJson.bean))) {
                  let actionName = moduleObj['moduleName'];
                  let command = respData.command;
                  let res;
                  if (funcUtils.isNotEmpty(command)) {
                    res = dataJson;
                    actionName += 'SetCommand';
                  } else {
                    res = respData;
                    actionName += 'SetData';
                  }
                  dispatch(actionName, res);
                }
              }
            }
          }
        } else if (!funcUtils.isNull(respError)) {
          alert(respError.errorMsg);
        }
      }
    }
  },
  getters: {},
  modules: {
    deloReestr,
    deloTreeCardView,
    wizardScenarioPost,
    wizardScenario2025,
    wizardItemAddress,
    wizardItemDecis,
    wizardItemDocPostFinal,
    wizardItemDocPostFirst,
    wizardItemDocPostSecond,
    wizardItemDocProt2025,
    wizardItemIndividual,
    wizardItemLvok,
    wizardItemLvok2025,
    wizardItemOrganization,
    wizardItemOwner,
    wizardItemPlace,
    wizardItemPredDoc,
    wizardItemVehs,
    accounting,
    delo,
    offense,
    authorization
  }
});

export default store;
