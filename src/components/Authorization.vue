<template>
  <Layout class="viewport-full">
    <div class="flex-parent flex-parent--center-main flex-parent--center-cross viewport-full">
      <Card class="login-card px30 py30">
        <div class='flex-parent flex-parent--center-cross mx-auto mt30 ml30 wmax360'>
          <div class='login-card-img'>
            <img src="../assets/images/system-logo.png">
            <img :src="require('~/assets/images/logo_Madi_red.svg')" alt="" class="logo">
          </div>
          <div class="login-card-subtitle adm-text-big txt-bold" style="color: #797979;">
            Информационные ресурсы<br>
            Московской Административной<br>
            Дорожной Инспекции
          </div>
        </div>

        <div class="align-center my60">
          <h2 class="adm-h2">Вход</h2>
        </div>

        <Form label-position="top">
          <FormItem>
            <small class="adm-text-small color-gray-medium" slot="label">Имя пользователя</small>
            <Input class="adm-input adm-input--regular" size="large" type="text" v-model="userName" placeholder="Логин"/>
          </FormItem>
          <FormItem>
            <small class="adm-text-small color-gray-medium" slot="label">Пароль</small>
            <Input class="adm-input adm-input--regular" size="large" type="password" v-model="password" placeholder="Пароль"/>
          </FormItem>
          <div class="py12 align-center">
            <Button class="adm-btn-primary round-full txt-uppercase" style="width: 160px; " size="large" @click="authorize" type="primary">Войти</Button>
          </div>
        </Form>
      </Card>

    </div>
  </Layout>

</template>

<script>
  import Fingerprint from "~/assets/js/vendor/fingerprint";
  import RequestApi from "~/assets/js/api/requestApi";
  import * as RequestEntity from "~/assets/js/api/requestEntity";
  import * as funcUtils from "~/assets/js/utils/funcUtils";

  export default {
    name: 'Authorization',
    created() {
      document.querySelector('body').addEventListener('keydown', this.bodyKeyDown);
    },
    data: () => ({
      userName: '',
      password: ''
    }),
    methods: {
      bodyKeyDown(e) {
        let key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
          this.authorize();
        }
      },
      async authorize() {
        if (this.userName !== '' && this.password !== '') {
          try {
            let eventResponse;
            let loginParams = new RequestEntity.LoginParams(new Fingerprint().get(), funcUtils.webGlId(), navigator.platform, navigator.userAgent, null, this.userName, null, this.password);
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
                    this.$store.dispatch('errors/changeContent', {
                      title: "Неправильное имя пользователя или пароль",
                      desc: respError.errorMsg,
                    });

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
              document.querySelector('body').removeEventListener('keydown', this.bodyKeyDown);

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
            this.$store.dispatch('errors/changeContent', {title: e.message.error,});
          }
        } else {
          this.$store.dispatch('errors/changeContent', {title: "Неправильное имя пользователя или пароль",});
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .login-card{
    width: 482px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
  }
  .login-card-img{
    position: relative;
    margin-right: 20px;
    img{
      height: 78px;
    }
    .logo {
      position: absolute;
      top: 0;
      bottom: 8px;
      left: 0;
      right: 0;
      margin: auto;
      width: 55px;
    }
  }
</style>
