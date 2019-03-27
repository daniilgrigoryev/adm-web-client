<template>
</template>

<script>
  import Fingerprint from "../assets/js/vendor/fingerprint";
  import RequestApi from "../assets/js/api/requestApi";
  import * as RequestEntity from "../assets/js/api/requestEntity";
  import * as funcUtils from "../assets/js/utils/funcUtils";

  export default {
    name: 'Authorization',
    components: {},
    async created() {
      try {
        let eventResponse;
        let loginParams = new RequestEntity.LoginParamsSID(new Fingerprint().get(), funcUtils.webGlId(), navigator.platform, navigator.userAgent, null, null, sessionStorage.getItem('admAuthSid'));
        let isValidSession = await this.$root.isValidSession();

        if (isValidSession) {
          loginParams.sid = localStorage.getItem('admSid');
        }

        eventResponse = await RequestApi.prepareData({
          beanName: null,
          method: 'login',
          params: loginParams,
          cid: null
        });
        if (eventResponse.status === 200) {
          let data = eventResponse.response;
          if (data.length > 0) {
            let dataJson = JSON.parse(data);
            let respData = dataJson.data;
            let respError = dataJson.error;
            if (!funcUtils.isNull(respData)) {
              if (dataJson.method === 'login') {
                localStorage.setItem('admSid', respData.sid);
                this.$root.activateTimer();
                sessionStorage.removeItem('admAuthSid');
              }
            }
          }
        }

        if (funcUtils.isNotEmpty(localStorage.getItem('admSid'))) {
          let wid = sessionStorage.getItem('admWid');
          let requestHead = new RequestEntity.RequestHead(localStorage.getItem('admSid'), wid, null, null, 'addWID');
          RequestApi.sendSocketRequest({
            body: new RequestEntity.RequestParam(requestHead, null),
            vm: this
          });

          eventResponse = await RequestApi.prepareData({
            method: 'getUserInfo',
            beanName: 'UserAccessBean',
            cid: null
          });
          let userInfo = JSON.parse(eventResponse.response).data;
          funcUtils.addToLocalStorage('admUserInfo', userInfo);

          await this.$root.getDeloReestr();
          this.$store.dispatch('authorizationSetData', {
            auth: false,
            authorization: true
          });
        }
      } catch (e) {
        alert(e.message);
      }
    },
    data: () => ({}),
    methods: {}
  }
</script>

<style lang='scss' scoped>
</style>
