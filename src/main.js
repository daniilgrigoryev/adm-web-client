import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import $ from "jquery";
import './components/shared/Filters'
import '@mapbox/assembly/dist/assembly.min.css';
import '@mapbox/assembly/dist/assembly.js';
import iView from '~/assets/js/vendor/iview';
import locale from '~/assets/js/vendor/iview/dist/locale/ru-RU';
import '~/assets/js/vendor/iview/dist/styles/iview.css';
import './assets/scss/common.scss';
import * as funcUtils from "~/assets/js/utils/funcUtils";
import * as constantUtils from "~/assets/js/utils/constantUtils";
import RequestApi from "~/assets/js/api/requestApi";
import * as formStack from '~/assets/js/api/formStack';
import * as RequestEntity from "~/assets/js/api/requestEntity";
import Fingerprint from "~/assets/js/vendor/fingerprint";
import Stack from '~/assets/js/api/stack';
import CustomSelect from '~/components/shared/CustomSelect';
import DatePickerMask from '~/components/shared/dateTimePicker/DatePickerMask';
import MaskedInput from '~/components/shared/MaskedInput';
import ListItemsDocs from '~/components/shared/ListItemsDocs';
import ViewDataItem from '~/components/shared/ui/view-data-item';
import filterSelectHelper from '~/components/mixins/filterSelectHelper';

import moment from 'moment';
moment.locale('ru');
Vue.mixin(filterSelectHelper);
Vue.component('CustomSelect', CustomSelect);
Vue.component('DatePickerMask', DatePickerMask);
Vue.component('MaskedInput', MaskedInput);
Vue.component('ListItemsDocs', ListItemsDocs);
Vue.component('ViewDataItem', ViewDataItem);
Vue.use(iView, {
  locale
});
Vue.config.productionTip = false;

let vue = new Vue({
  el: '#app',
  store,
  router,
  data: {},
  render: h => h(App),
  async created() {
    let externalSessionStorage = funcUtils.getfromLocalStorage('admWidNew');
    if (funcUtils.isNotEmpty(externalSessionStorage)) {
      let admWid = externalSessionStorage.admWid;
      sessionStorage.setItem('admWid', admWid);
      funcUtils.addToSessionStorage(admWid, externalSessionStorage[admWid]);
      localStorage.removeItem('admWidNew');
    }

    Array.prototype.getFirst = function() {
      return this[0];
    };

    Date.prototype.toJSON = function() {
      return moment(this).format();
    };

    if (funcUtils.isNull(sessionStorage.getItem('admWid'))) {
      sessionStorage.setItem('admWid', funcUtils.guid());
      funcUtils.addToSessionStorage(sessionStorage.getItem('admWid'), new Stack());
    }
    funcUtils.addToLocalStorage('admLastActive', new Date().getTime());
    let isValidSession = await this.isValidSession();
    if (isValidSession) {
      let requestHead = new RequestEntity.RequestHead(localStorage.getItem('admSid'), sessionStorage.getItem('admWid'), null, null, 'addWID');
      RequestApi.sendSocketRequest({
        body: new RequestEntity.RequestParam(requestHead, null),
        vm: this
      });
    }
  },
  mounted() {
    this.activateTimer();
    history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      history.go(1);
    };
  },
  methods: {
    async logout() {
      try {
        await RequestApi.prepareData({
          beanName: null,
          method: 'logout',
          cid: null,
          withSpinner: false
        });
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      } finally {
        funcUtils.clearAll();
        await this.$store.dispatch('authorizationSetData', {
          auth: false,
          authorization: false
        });
        RequestApi.closeSocket();
        formStack.clearStack(true);
        // window.close();
        window.location.href = location.origin + constantUtils.contextPath;
      }
    },
    async getDeloReestr() {
      try {
        let cid = funcUtils.getfromLocalStorage('admDeloReestr');
        formStack.clearStack(false);
        await formStack.toNext({
          module: this.$store.state.deloReestr,
          vm: this,
          notRemoved: true,
          cid: cid,
          withCreate: funcUtils.isEmpty(cid)
        });
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    async getDocsReestr() {
      try {
        let cid = funcUtils.getfromLocalStorage('admDocsReestr');
        formStack.clearStack(false);
        await formStack.toNext({
          module: this.$store.state.docsReestr,
          vm: this,
          notRemoved: true,
          cid: cid,
          withCreate: funcUtils.isEmpty(cid)
        });
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    async getRegistryReestr() {
      try {
        let cid = funcUtils.getfromLocalStorage('admRegistryReestr');
        formStack.clearStack(false);
        await formStack.toNext({
          module: this.$store.state.registryReestr,
          vm: this,
          notRemoved: true,
          cid: cid,
          withCreate: funcUtils.isEmpty(cid)
        });
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    getDashBoardReestr() {
      try {
        formStack.clearStack(false);
        formStack.toNext({
          module: this.$store.state.dashBoard,
          vm: this,
          notRemoved: true,
          withCreate: false
        });
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    async isValidSession() {
      let res = false;
      let sid = localStorage.getItem('admSid');
      if (funcUtils.isNotEmpty(sid)) {
        let loginParams = new RequestEntity.LoginParamsSID(new Fingerprint().get(), funcUtils.webGlId(), navigator.platform, navigator.userAgent, null, null, sid);
        let eventResponse = await RequestApi.prepareData({
          beanName: null,
          method: 'checkSession',
          params: loginParams,
          cid: null
        });
        res = JSON.parse(eventResponse.response);
      }
      return res;
    },
    activateTimer() {
      $("body").bind("mousemove keypress mousedown", (function (e) {
        localStorage.setItem('admLastActive', JSON.stringify(new Date().getTime()));
      }))
    },
  }
});
