<template>
</template>

<script>
  import Fingerprint from "~/assets/js/vendor/fingerprint";
  import RequestApi from "~/assets/js/api/requestApi";
  import * as RequestEntity from "~/assets/js/api/requestEntity";
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';

  export default {
    name: 'Authorization',
    async created() {
      try {
        let eventResponse;
        let loginParams = new RequestEntity.LoginParamsSID(new Fingerprint().get(), funcUtils.webGlId(), navigator.platform, navigator.userAgent, null, null, sessionStorage.getItem('admAuthSid'));
        let isValidSession = await this.$root.isValidSession();

        if (!isValidSession) {
          funcUtils.clearAll();
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
                localStorage.setItem('admSid', respData.sid);
              } else {
                console.log(respError.errorMsg);
              }
            }
          }
        }

        if (funcUtils.isNotEmpty(localStorage.getItem('admSid'))) {
          this.$root.activateTimer();
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

          let authData = this.$store.state.authorization.data;

          if (authData.params) {
            switch (authData.params.component) {
              case this.$store.state.deloTreeCardView.moduleName: {
                let params = {
                  deloId: authData.params.deloId,
                  title: 'Поиск дел',
                };
                if (authData.params.docId) {
                  params.scenarioResult = {
                    docId: authData.params.docId,
                    category: authData.params.category,
                  }
                }

                await formStack.toNext({
                  module: this.$store.state.deloTreeCardView,
                  vm: this,
                  notRemoved: false,
                  params: params,
                  withCreate: true
                });
                break;
              }
            }
          } else {
            await this.$root.getDeloReestr();
          }

          await this.$store.dispatch('authorizationSetData', {
            auth: false,
            authorization: true
          });
        }
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    data: () => ({}),
    methods: {}
  }
</script>

<style lang='scss' scoped>
</style>
