<template>
  <div id="app">
     <button type="button" @click="logout">Выйти</button>
    <Indicator/>

	<div class="layout">
		<Layout class="layout--inner h-full mx-auto"><!-- wmax1280 -->
			<SiderMenu ref="siderMenu" :isCollapsed="isCollapsed"></SiderMenu>
			<Layout class="layout--inner">
				<MainMenu @collapsedSider="collapsedSider"></MainMenu>
				<div class="px12 py12">
					<router-view></router-view>
				</div>
			</Layout>
		</Layout>
	</div>
  </div>
</template>

<script>
  import Indicator from './components/Indicator.vue';
  import MainMenu from './components/MainMenu';
  import SiderMenu from './components/SiderMenu.vue';

  export default {
    name: 'app',
    components: {
      Indicator,
      MainMenu,
      SiderMenu
    },
    data() {
      return {
        isCollapsed: true,
      }
    },
    methods: {
      logout() {
        this.$root.logout();
      },
      collapsedSider() {
        this.$refs.siderMenu.$refs.sider.toggleCollapse();
      }
    }
  }
</script>

