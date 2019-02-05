<template>
  <div id="app">
    <button type="button" @click="logout">Выйти</button>
    <Indicator/>
    <router-view></router-view>
  </div>
</template>

<script>
  import Indicator from './components/Indicator.vue';

  export default {
    name: 'app',
    components: {
      Indicator
    },
    data() {
      return {}
    },
    methods: {
      logout() {
        this.$root.logout();
      }}
  }
</script>

<style lang="scss">
</style>
