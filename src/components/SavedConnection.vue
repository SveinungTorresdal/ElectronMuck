<template>
  <b-form class="text-left" @submit.prevent="onSubmit">
    <div class="mb-3">
      <label class="mb-1" for="inline-form-input-name">Server</label>
      <b-form-select
        id="saved-server"
        v-model="connectionSelected"
        :options="connectionOptions"
      />
      <b-form-text>
        Select a saved connection.
      </b-form-text>
    </div>

    <div class="mb-3">
      <label class="mb-1" for="inline-form-input-name">Credentials</label>
      <b-form-select
        id="saved-server"
        v-model="credentialSelected"
        :options="credentialsOptions"
      />
      <b-form-text>
        Select saved credentials.
      </b-form-text>
    </div>

    <div class="text-center">
      <b-button variant="primary" type="submit">Connect</b-button>
    </div>
  </b-form>
</template>
<script>
export default {
  name: "SavedConnection",
  data() {
    return {
      connectionSelected: null,
      credentialSelected: null
    };
  },
  computed: {
    connectionOptions() {
      const init = { value: null, text: "Please select connection" };
      const options = [];
      return [init, ...options];
    },
    credentialsOptions() {
      const init = { value: null, text: "None" };
      const options = [];
      return [init, ...options];
    }
  }
};
</script>
