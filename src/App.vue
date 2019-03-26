<template>
  <div id="app">
    <Indicator/>

    <div class="layout">
      <Layout class="layout--inner h-full mx-auto"><!-- wmax1280 -->
        <SiderMenu ref="siderMenu" :isCollapsed="isCollapsed"></SiderMenu>
        <Layout class="layout--inner flex-parent" style="min-height: 100vh"> <!-- viewport-full -->
          <MainMenu v-if="isHeaderRender()" @collapsedSider="collapsedSider"></MainMenu>
          <div> <!-- class="bg-gray-faint flex-child--grow" -->
            <router-view></router-view>
          </div>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
  import Indicator from './components/shared/Indicator.vue';
  import MainMenu from './components/shared/MainMenu.vue';
  import SiderMenu from './components/shared/SiderMenu.vue';
  import * as funcUtils from "./assets/js/utils/funcUtils";
  import * as formStack from './assets/js/api/formStack';

  export default {
    name: 'app',
    components: {
      Indicator,
      MainMenu,
      SiderMenu
    },
    data() {
      return {
        isCollapsed: true
      }
    },
    methods: {
      async isHeaderRender() {
        return funcUtils.isNotEmpty(localStorage.getItem('admSid')) && funcUtils.isNotEmpty(formStack.getCurrent());
      },
      collapsedSider() {
        this.$refs.siderMenu.$refs.sider.toggleCollapse();
      }
    }
  }
</script>

