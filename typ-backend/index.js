const app = require("./app.js");
const http = require("http");
const config = require("./src/utils/config");
const {info} = require("./src/utils/logger")

const PORT = config.PORT;
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});