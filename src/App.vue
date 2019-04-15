<template>
  <div id="app">
    <Indicator/>

    <div class="layout" v-if="isLogged && !isAuth">
      <Layout class="layout--inner h-full mx-auto"><!-- wmax1280 -->
        <SiderMenu ref="siderMenu" :isCollapsed="isCollapsed"></SiderMenu>
        <Layout class="layout--inner flex-parent" style="min-height: 100vh"> <!-- viewport-full -->
          <MainMenu @collapsedSider="collapsedSider"></MainMenu>
          <div> <!-- class="bg-gray-faint flex-child--grow" -->
            <router-view></router-view>
          </div>
        </Layout>
      </Layout>
    </div>
    <authorization v-if="!isLogged && !isAuth"></authorization>
    <auth v-if="isAuth"></auth>
  </div>
</template>

<script>
  import * as funcUtils from "./assets/js/utils/funcUtils";
  import * as formStack from './assets/js/api/formStack';
  import {mapGetters} from 'vuex';

  export default {
    name: 'app',
    components: {
      Indicator: () => import('~/components/shared/Indicator'),
      MainMenu: () => import('~/components/shared/MainMenu'),
      SiderMenu: () => import('~/components/shared/SiderMenu'),
      Authorization: () => import('~/components/Authorization'),
      Auth: () => import('~/components/Auth')
    },
    data() {
      return {
        isCollapsed: true
      }
    },
    computed: {
      ...mapGetters({
        authorizationData: 'authorizationGetData'
      }),
      isLogged() {
        let authorization = funcUtils.isNotEmpty(this.authorizationData) ?  this.authorizationData.authorization : null;
        let res = (funcUtils.isNotEmpty(localStorage.getItem('admSid')) && formStack.stackSize() > 0) || authorization === true;
        return res;
      },
      isAuth() {
        let auth = funcUtils.isNotEmpty(this.authorizationData) ?  this.authorizationData.auth : null;
        return funcUtils.isNotEmpty(sessionStorage.getItem('admAuthSid')) && auth === true;
      },
    },
    methods: {
      collapsedSider() {
        this.$refs.siderMenu.$refs.sider.toggleCollapse();
      }
    }
  }
</script>

