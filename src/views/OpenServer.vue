<template>
  <div
    id="open-server"
    class="flex-grow-1 flex-shrink-1 d-flex flex-column justify-content-end px-2 pb-2 pt-0"
  >
    <ul class="p-2 m-0 text-left border rounded mb-2 flex-grow-1 flex-shrink-1">
      <li
        v-for="(message, index) in messages"
        :key="`msg_${index}`"
        v-html="message"
      />
    </ul>
    <b-textarea
      class="flex-shrink-0"
      v-model="input"
      rows="3"
      @keypress.enter.prevent="sendInput"
    />
  </div>
</template>
<style scoped>
@font-face {
  font-family: "DejaVu Sans Mono";
  src: url("../assets/DejaVuSansMono.ttf");
}

#open-server {
  min-height: 0;
}
textarea,
ul {
  min-height: 0;
  font-family: "DejaVu Sans Mono", "Menlo", monospace;
  list-style: none;
  white-space: pre-wrap;
  overflow-y: scroll;
}
</style>
<script>
export default {
  name: "OpenServer",
  data() {
    return {
      connected: false,
      connection: undefined,
      input: null,
      messages: [],
      timeout: 60,
      timer: undefined
    };
  },
  mounted() {
    this.connect();
  },
  methods: {
    connect() {
      if (this.timer) {
        this.timer.clearInterval();
      }
      this.connection = new window.Telnet();
      const { host, port } = this.$route.params;

      this.messages.push(`<strong>Connecting to ${host}:${port}.</strong>`);

      let params = {
        host,
        port,
        negotiationMandatory: false,
        timeout: this.timeout * 1000,
        debug: true,
        username: "",
        password: ""
      };

      // Register listeners
      this.connection.on("close", this.onClose);
      this.connection.on("connect", this.onConnect);
      this.connection.on("data", this.onData);
      this.connection.on("end", this.onEnd);
      this.connection.on("error", this.onError);
      this.connection.on("failedlogin", this.onFailedLogin);
      this.connection.on("ready", this.onReady);
      this.connection.on("timeout", this.onTimeout);
      this.connection.on("writedone", this.onWriteDone);

      // Open connection
      this.connection.connect(params).catch(this.onError);
      this.ping();
    },
    onClose() {
      this.messages.push("<strong>Connection closed.</strong>");
      this.connected = false;
    },
    onConnect() {
      this.messages.push("<strong>Connection opened.</strong>");
      this.ping();
    },
    onData(data) {
      if (!this.connected) {
        return;
      }
      let buffer = Buffer.from(data);
      this.messages.push(buffer.toString());
    },
    onEnd() {
      this.messages.push("<strong>Connection ended by host.</strong>");
      this.connection.end();
    },
    onError(error) {
      this.messages.push(
        "<strong class='text-danger'>An error has occurred.</strong>"
      );
      console.error(error);
      if (this.connection.socket.writable === false) {
        this.connection.destroy();
        this.connect();
      }
    },
    onFailedLogin() {
      this.messages.push("<strong>Login failed.</strong>");
    },
    onReady() {
      this.messages.push("<strong>Connection ready.</strong>");
      this.ping();
      this.connected = true;

      this.timer(this.ping, this.timeout * 800);
    },
    onTimeout() {
      this.messages.push("<strong>Connection timed out.</strong>");
    },
    onWriteDone() {
      this.messages.push("<strong>Write done.</strong>");
    },
    ping() {
      this.connection
        .send(/* We don't really want to send any data... */)
        .then(/* We don't really care about the response. */)
        .catch(/* We don't really care about any errors. */);
    },
    sendInput() {
      console.log(this.connection);

      const outgoing = this.input;
      this.input = null;

      this.connection
        .send(outgoing)
        .then(response => {
          console.log("Response received. Length:", response.length);
          this.messages.push(response);
        })
        .catch(this.onError);
    }
  }
};
</script>
