<template>
  <div id="app" class="bg-dark text-light">
    <topbar-nav />
    <router-view />
  </div>
</template>

<style lang="scss">
#container,
html,
body,
#app {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-flow: column;
}
</style>
<script>
import TopbarNav from "./components/TopbarNav.vue";

export default {
  name: "App",
  components: {
    TopbarNav
  }
};
</script>
