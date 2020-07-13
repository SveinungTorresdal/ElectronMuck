<template>
  <header class="d-flex flex-row justify-content-between">
    <nav class="px-2 pb-2 text-left">
      <b-button-group>
        <b-button
          variant="light"
          class="topbar-btn"
          :to="{ name: 'LoginServer' }"
          exact-active-class="bg-primary text-white"
        >
          <font-awesome-icon icon="link" />
        </b-button>
        <b-button
          variant="light"
          class="topbar-btn"
          :to="{ name: 'Options' }"
          exact-active-class="bg-primary text-white"
        >
          <font-awesome-icon icon="cog" />
        </b-button>
        <b-button
          variant="light"
          class="topbar-btn"
          :to="{ name: 'About' }"
          exact-active-class="bg-primary text-white"
        >
          <font-awesome-icon icon="info" />
        </b-button>
      </b-button-group>
    </nav>
    <nav class="px-2 pb-2 text-right">
      <b-button-group>
        <b-button
          variant="light"
          class="topbar-btn"
          @click.prevent="minimizeProgram"
        >
          <font-awesome-icon icon="window-minimize" />
        </b-button>
        <b-button
          variant="light"
          class="topbar-btn"
          @click.prevent="fullscreenProgram"
        >
          <font-awesome-icon icon="window-restore" />
        </b-button>
        <b-button
          variant="danger"
          class="topbar-btn"
          @click.prevent="closeProgram"
        >
          <font-awesome-icon icon="times" />
        </b-button>
      </b-button-group>
    </nav>
  </header>
</template>
<style scoped>
.topbar-btn {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  border-top: 0 !important;
  font-size: 0.8rem;
}
</style>
<script>
export default {
  name: "TopbarNav",
  methods: {
    closeProgram() {
      window.ipcRenderer.send("exit");
    },
    fullscreenProgram() {
      window.ipcRenderer.send("fullscreen");
    },
    minimizeProgram() {
      window.ipcRenderer.send("minimize");
    }
  }
};
</script>
