const app = require("./app.js");
const http = require("http");
const config = require("./src/utils/config");
const {info} = require("./src/utils/logger")

const PORT = config.PORT;
const server = http.createServer(app);

server.listen(PORT, () => {
  const address = server.address();
  const port = typeof address === 'string' ? address : address.port;
  info(`Server running on port ${port}`);
});