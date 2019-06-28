import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource'


const req = require.context('./modules', false, /\.js$/);
const storeModules = {};
req.keys().forEach(filename => {
  const name = `${filename.split('.')[1].split('/')[1]}`;
  const module = req(filename).default;
  storeModules[name] = module;
});

import * as funcUtils from "~/assets/js/utils/funcUtils";

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
        if (dataJson.method === 'logout' && funcUtils.isNotEmpty(localStorage.getItem('admSid'))) {
          let vm = payload.vm.$root;
          vm.logout();
          return;
        } else if (dataJson.method === 'ping' && funcUtils.isNotEmpty(localStorage.getItem('admSid'))) {
          let vm = payload.vm.$root;
          let secondsInactive = (new Date().getTime() - funcUtils.getfromLocalStorage('admLastActive')) / 1000 / 60;
          if (secondsInactive > 15) {
            // vm.logout();
            // console.log('secondsInactive -- logout');
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
          this.dispatch('errorsModal/changeContent', {title: respError.errorMsg, desc: respError.errorDesc,});
        }
      }
    }
  },
  getters: {},
  modules: {
    ...storeModules
  }
});

export default store;
