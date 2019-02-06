import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import $ from "jquery";
import '@mapbox/assembly/dist/assembly.min.css';
import '@mapbox/assembly/dist/assembly.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import './assets/scss/common.scss';

import * as funcUtils from "./assets/js/utils/funcUtils";
import RequestApi from "./assets/js/api/requestApi";
import * as formStack from './assets/js/api/formStack';
import * as RequestEntity from "./assets/js/api/requestEntity";
import Stack from './assets/js/api/stack';

import moment from 'moment';
moment.locale('ru');
Vue.use(iView);
Vue.config.productionTip = false;

let vue = new Vue({
  el: '#app',
  store,
  router,
  data: {},
  render: h => h(App),
  created() {
    if (funcUtils.isNull(sessionStorage.getItem('wid'))) {
      sessionStorage.setItem('wid', funcUtils.guid());
      funcUtils.addToSessionStorage(sessionStorage.getItem('wid'), new Stack());
      formStack.toNext({
        module: this.$store.state.authorization,
        vm: this,
        withCreate: false
      });
    }
    funcUtils.addToLocalStorage('lastActive', new Date().getTime());
    if (funcUtils.isNotEmpty(localStorage.getItem('sid'))) {
      let requestHead = new RequestEntity.RequestHead(localStorage.getItem('sid'), sessionStorage.getItem('wid'), null, null, 'addWID');
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
    logout() {
      try {
        RequestApi.prepareData({
          beanName: null,
          method: 'logout',
          cid: null,
          withSpinner: false
        });
      } catch (e) {
        alert(e.message);
      } finally {
        funcUtils.clearAll();
        RequestApi.closeSocket();
        formStack.clearStack(true);
        this.$router.push({name: 'Authorization'});
      }
    },
    async getDeloReestr() {
      let cid = funcUtils.getfromLocalStorage(this.$store.state.deloReestr.moduleName);
      formStack.clearStack(false);
      await formStack.toNext({
        module: this.$store.state.deloReestr,
        vm: this,
        notRemoved: true,
        cid: cid,
        withCreate: funcUtils.isEmpty(cid)
      });
    },
    activateTimer() {
      $("body").bind("mousemove keypress mousedown", (function (e) {
        localStorage.setItem('lastActive', JSON.stringify(new Date().getTime()));
      }))
    },
  }
});
