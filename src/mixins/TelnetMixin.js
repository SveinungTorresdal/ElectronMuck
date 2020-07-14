export default {
  data() {
    return {
      connection: null,
      connecting: false
    };
  },
  methods: {
    connect() {
      if (!this.connection || !this.server.address || !this.server.port) {
        return false;
      }

      const timeoutVal = () => {
        if (parseInt(this.server.timeout)) {
          return parseInt(this.server.timeout);
        } else {
          return 60;
        }
      };

      this.connecting = true;
      console.log("Beginning connection.");

      this.connection = new window.Telnet();
      this.listeners();

      let params = {
        host: this.server.address,
        port: parseInt(this.server.port),
        timeout: timeoutVal() * 1000,
        debug: true,
        username: "",
        password: ""
      };

      this.connection
        .connect(params)
        .catch(error => {
          console.error(error, this.connection);
        })
        .finally(() => {
          this.connecting = false;
          console.log("Finished connection.");
        });
      this.connection
        .send()
        .catch(/* We don't really care about the response. */);
    },
    listeners() {
      if (!this.connection) {
        return false;
      }

      this.connection.on("close", this.onClose);
      this.connection.on("connect", this.onConnect);
      this.connection.on("data", this.onData);
      this.connection.on("end", this.onEnd);
      this.connection.on("error", this.onError);
      this.connection.on("failedlogin", this.onFailedLogin);
      this.connection.on("ready", this.onReady);
      this.connection.on("timeout", this.onTimeout);
      this.connection.on("writedone", this.onWriteDone);

      return true;
    },
    onClose() {
      console.log("Closed");
    },
    onConnect() {
      console.log("Connection opened.");
    },
    onData(data) {
      let buffer = Buffer.from(data);
      console.log(buffer.toString());
    },
    onEnd() {
      console.warn("Ended by host.");
      this.connection.end();
    },
    onError(data) {
      console.error("Error occurred.", data);
    },
    onFailedLogin(data) {
      console.error("Login failed.", data);
    },
    onReady() {
      console.log("Connection ready.");
      this.connection
        .send()
        .catch(/* We don't really care about the response. */);
    },
    onTimeout() {
      console.warn("Timed out.");
      this.connection.end();
    },
    onWriteDone() {
      console.log("Write done.");
    }
  }
};
