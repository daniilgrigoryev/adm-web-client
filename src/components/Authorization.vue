<template>
  <div>
    <input type="text" v-model="userName" @keyup.enter.native="authorize" />
    <input type="text" v-model="password" @keyup.enter.native="authorize" />
    <button type="button" @click="authorize">Войти</button>
  </div>

</template>

<script>
  import Fingerprint from "../assets/js/vendor/fingerprint";
  import RequestApi from "../assets/js/api/requestApi";
  import * as RequestEntity from "../assets/js/api/requestEntity";
  import * as funcUtils from "../assets/js/utils/funcUtils";

  export default {
    name: 'Authorization',
    components: {
    },
    data: () => ({
      userName: '',
      password: ''
    }),
    methods: {
      async authorize() {
        if (this.userName !== '' && this.password !== '') {
          try {
            funcUtils.clearAll();
            let wid = sessionStorage.getItem('wid');
            let loginParams = new RequestEntity.LoginParams(new Fingerprint().get(), funcUtils.webGlId(), navigator.platform, navigator.userAgent, null, this.userName, null, this.password);
            let eventResponse = await RequestApi.prepareData({
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
                    funcUtils.clearAll();
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('sid', respData.sid);
                    this.$root.activateTimer();
                  }
                } else {
                  alert('Неправильное имя пользователя или пароль');
                }
              }
            }
            if (funcUtils.isNotEmpty(localStorage.getItem('sid'))) {
              let requestHead = new RequestEntity.RequestHead(localStorage.getItem('sid'), wid, null, null, 'addWID');
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
              funcUtils.addToLocalStorage('userInfo', userInfo);

              this.$root.getDeloReestr();
            }
          } catch (e) {
            alert(e.message);
          }
        } else {
          alert('Неправильное имя пользователя или пароль');
        }
      }
    }
  }
</script>

<style lang='scss'>
  .section-auth {
    display: inline-block;
    width: 100%;
    text-align: center;

    &__line {
      display: flex;
      margin: 15px 0;
      align-items: center;
      justify-content: space-between;

      &_center {
        justify-content: center;
      }
    }

    &__label {
      display: inline-block;
      width: 5vw;
      min-width: 80px;
      padding: 0 15px 0 0;
      text-align: right;
      font-size: 17px;
      color: #7f7f7f;
    }

    &__recover {
      font-family: "DINPro", "Helvetica Neue", Helvetica, sans-serif;
      font-size: 12px;
      font-weight: normal;
      font-style: italic;
      font-stretch: normal;
      line-height: 1.33;
      letter-spacing: 0.2px;
      color: #87cc45;
      cursor: pointer;
    }
  }

  .auth {
    position: relative;
    // height: 100%;
    height: 100vh;

    &__bg {
      z-index: 1;
      position: absolute;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(45deg, #353535, #353535 2px, #2f2f2f 2px, #2f2f2f 10px);
    }

    &__logo {
      display: inline-block;
      width: 92px;
      margin: 8vh 0 0;
    }

    &__heading {
      margin: 100px 0 30px;
      font-size: 22px;
      opacity: 0.65;
      color: #fff;
      font-weight: 500;
    }

    &__form-wrap {
      z-index: 2;
      position: relative;
      width: 25vw;
      min-width: 420px;
      height: 100%;
      margin: 0 auto;
      padding: 40px 0 30px;
      background: #373737;
      text-align: center;
      align-items: center;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    }

    &-form {
      width: 90%;
      margin: 0 auto;
      text-align: center;

      &__label {
        display: inline-block;
        width: 5vw;
        min-width: 80px;
        padding: 0 15px 0 0;
        text-align: right;
        font-size: 17px;
        color: #7f7f7f;
      }
    }
  }
</style>
