<template>
  <div
    id="home"
    class="d-flex flex-column align-items-center justify-content-center w-100 h-100"
  >
    <b-card no-body>
      <b-tabs card pills fill>
        <b-tab title="Saved" class="p-4">
          <saved-connection />
        </b-tab>
        <b-tab title="New" class="p-4">
          <new-connection />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
// @ is an alias to /src
import NewConnection from "../components/NewConnection.vue";
import SavedConnection from "../components/SavedConnection.vue";

export default {
  name: "Home",
  components: {
    NewConnection,
    SavedConnection
  }
};
</script>
