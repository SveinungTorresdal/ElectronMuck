<template>
  <b-form class="text-left" @submit.prevent="onSubmit">
    <div class="mb-3">
      <label class="mb-1" for="inline-form-input-name">Address</label>
      <b-input
        id="server-address"
        v-model="server.address"
        :state="validAddress"
        placeholder="Address (i.e. example.com)"
      />
      <b-form-text>
        Please enter a server address.
      </b-form-text>
    </div>

    <div class="mb-3">
      <label class="mb-1" for="inline-form-input-username">Port</label>
      <b-input
        id="server-port"
        v-model="server.port"
        :state="validPort"
        placeholder="Port (i.e. 80)"
      />
      <b-form-text>
        Please enter a port number.
      </b-form-text>
    </div>

    <div class="text-center">
      <b-button variant="primary" type="submit">Connect</b-button>
    </div>
  </b-form>
</template>
<style scoped>
.form-control[type="text"] {
  padding-right: calc(1.5em + 0.75rem);
}
</style>
<script>
export default {
  name: "NewConnection",
  data() {
    return {
      server: {
        address: null,
        port: null
      }
    };
  },
  computed: {
    validAddress() {
      if (this.server.address) {
        return true;
      } else {
        return null;
      }
    },
    validPort() {
      const regex = new RegExp(/[0-9]+/g);
      if (this.server.port) {
        return regex.test(this.server.port);
      } else {
        return null;
      }
    }
  },
  methods: {
    async onSubmit() {
      if (!this.validAddress || !this.validPort) {
        return;
      }
      let connection = new window.Telnet();

      // these parameters are just examples and most probably won't work for your use-case.
      let params = {
        host: this.server.address,
        port: parseInt(this.server.port),
        negotiationMandatory: false,
        timeout: 3000,
        debug: true,
        username: "",
        password: ""
      };

      try {
        await connection.connect(params);
        console.log("Success", connection);

        connection.end().then(connection.destroy());
      } catch (error) {
        // handle the throw (timeout)
        console.error(error, connection);
      }

      /*
      this.$router.push({
        name: "OpenServer",
        params: {
          server: this.server.address,
          port: this.server.port
        }
      });
      */
    }
  }
};
</script>
