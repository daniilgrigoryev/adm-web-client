<template>
  <Layout class="viewport-full">
    <div class="flex-parent flex-parent--center-main flex-parent--center-cross viewport-full">
        <Card class="login-card px30 py30">
          <div class='flex-parent flex-parent--center-cross mx-auto mt30 ml30 wmax360'>
            <div class='login-card-img'>
              <img src="../assets/images/system-logo.png">
            </div>
            <div class="login-card-subtitle adm-text-big txt-bold" style="color: #797979;">
              Информационные ресурсы<br>
              Московской Административной<br>
              Дорожной Инспекции
            </div>
          </div>

          <div class="align-center my60">
            <h2 class="adm-h2">Вход в подсистемы</h2>
          </div>

          <Form label-position="top">
            <FormItem>
              <small class="adm-text-small color-gray-medium" slot="label">Имя пользователя</small>
              <Input class="adm-input adm-input--regular" size="large" type="text" v-model="userName" @keyup.enter.native="authorize" placeholder="Логин"/>
            </FormItem>
            <FormItem>
              <small class="adm-text-small color-gray-medium" slot="label">Пароль</small>
              <Input class="adm-input adm-input--regular" size="large" type="password" v-model="password" @keyup.enter.native="authorize" placeholder="Пароль"/>
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

<style lang='scss' scoped>
  .login-card{
    width: 482px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
  }
  .login-card-img{
    width: 78px;
    height: 78px;
    img{
      height: 100%;
    }
  }
</style>
