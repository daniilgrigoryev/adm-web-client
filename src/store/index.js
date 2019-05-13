import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource'

import authorization from './modules/authorization';
import deloReestr from './modules/deloReestr';
import dashBoard from './modules/dashBoard';

import deloTreeCardView from './modules/deloTreeCardView';
import frmEdDelo from './modules/frmEdDelo';
import frmEdDocsOpred from './modules/frmEdDocsOpred';
import frmEdDocsOpredEdit from './modules/frmEdDocsOpredEdit';
import frmEdDocsPost from './modules/frmEdDocsPost';
import frmEdDocsProt from './modules/frmEdDocsProt';

import frmEdDecisShtraf from './modules/frmEdDecisShtraf';
import FrmEdDecisRasm from './modules/frmEdDecisRasm';

import frmEdDecisLish from './modules/frmEdDecisLish';
import frmEdDecisVozbDelo from './modules/frmEdDecisVozbDelo';
import frmEdDecisPredup from './modules/frmEdDecisPredup';
import frmEdDecisArest from './modules/frmEdDecisArest';
import frmEdDecisPost from './modules/frmEdDecisPost';
import frmEdDecisMandWork from './modules/frmEdDecisMandWork';
import frmEdDecisSuspendActivity from './modules/frmEdDecisSuspendActivity';

import frmEdIspolnShtraf from './modules/frmEdIspolnShtraf';
import frmEdVehsAMTC from './modules/frmEdVehsAMTC';
import frmEdProtPZTC from './modules/frmEdProtPZTC';
import frmEdUchastFL from './modules/frmEdUchastFL';
import frmEdVuVyd from './modules/frmEdVuVyd';
import frmEdVuPred from './modules/frmEdVuPred';
import frmEdIspolnPostUvedom from './modules/frmEdIspolnPostUvedom';
import dlgEdFotoMaterial from './modules/dlgEdFotoMaterial';
import dlgAdvice from './modules/dlgAdvice';
import frmEdMediaMaterial from './modules/frmEdMediaMaterial';
import frmLog from './modules/frmLog';

import frmEdDeloEdit from './modules/frmEdDeloEdit';
import frmEdDecisEdit from './modules/frmEdDecisEdit';
import frmEdIspolnEdit from './modules/frmEdIspolnEdit';
import frmEdVuPredEdit from './modules/frmEdVuPredEdit';
import frmEdVuVydEdit from './modules/frmEdVuVydEdit';
import frmEdDocsPostEdit from './modules/frmEdDocsPostEdit';
import frmEdVehsAMTCEdit from './modules/frmEdVehsAMTCEdit';
import frmEdProtPZTCEdit from './modules/frmEdProtPZTCEdit';
import frmEdDocsProtEdit from './modules/frmEdDocsProtEdit';
import frmEdUchastFLIndividEdit from './modules/frmEdUchastFLIndividEdit';
import frmEdUchastFLOrganizationEdit from './modules/frmEdUchastFLOrganizationEdit';
import placeViewEdit from './modules/placeViewEdit';
import addressViewEdit from './modules/addressViewEdit';
import dlgAdviceEdit  from './modules/dlgAdviceEdit';

import errors  from './modules/errors';

import wizardExecuter from './modules/wizardExecuter';
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
            console.log('secondsInactive -- logout');
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
          this.$store.dispatch('errors/changeContent', {title: respError.errorMsg,});
        }
      }
    }
  },
  getters: {},
  modules: {
    deloReestr,
    dashBoard,
    deloTreeCardView,
    frmEdDelo,
    frmEdDocsOpred,
    frmEdDocsOpredEdit,
    frmEdDocsPost,
    frmEdDocsProt,

    frmEdDecisShtraf,
    FrmEdDecisRasm,
    frmEdDecisLish,
    frmEdDecisVozbDelo,
    frmEdDecisPredup,
    frmEdDecisArest,
    frmEdDecisPost,
    frmEdDecisMandWork,
    frmEdDecisSuspendActivity,
    
    frmEdIspolnShtraf,
    frmEdVehsAMTC,
    frmEdUchastFL,
    frmEdVuVyd,
    frmEdVuPred,
    frmEdProtPZTC,
    frmEdIspolnPostUvedom,
    dlgEdFotoMaterial,
    frmEdMediaMaterial,
    frmLog,
    dlgAdvice,

    addressViewEdit,
    placeViewEdit,
    frmEdDeloEdit,
    frmEdVuPredEdit,
    frmEdVuVydEdit,
    frmEdDocsPostEdit,
    frmEdVehsAMTCEdit,
    frmEdProtPZTCEdit,
    frmEdDocsProtEdit,
    frmEdDecisEdit,
    frmEdIspolnEdit,
    frmEdUchastFLIndividEdit,
    frmEdUchastFLOrganizationEdit,
    dlgAdviceEdit,
    
    wizardExecuter,
    authorization,

    errors,
  }
});

export default store;
