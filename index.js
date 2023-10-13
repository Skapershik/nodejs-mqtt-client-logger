const fs = require("fs");
const mqttServer = require("mqtt-server");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // trust self signed certificate

const servers = mqttServer(
  {
    mqtt: "tcp://0.0.0.0:1883",
    mqtts: "ssl://0.0.0.0:8883",
    mqttws: "ws://0.0.0.0:1884",
    mqtwss: "wss://0.0.0.0:8884",
  },
  {
    ssl: {
      key: fs.readFileSync("./server.key"),
      cert: fs.readFileSync("./server.crt"),
    },
  },
  (client) => {
    client.on("connect", ({ password, clientId, username}) => {
      const decodedPassword = password.toString('utf8');
      console.log(`clientId: ${ clientId }`);
      console.log(`username: ${ username }`);
      console.log(`password: ${ decodedPassword } \n`);
    });
  }
);

servers.listen(() => {
  console.log('Waiting for connections... \n');
});

