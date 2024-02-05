const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const cors = require("cors");
require("./dbConnect");
const routes = require("./routes");

const app = express();

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cors())
  .use("/api", routes);

app.get("/", (req, res) => {
  res.send("library backend");
});

const port = process.env.PORT || config.server.port;
app.listen(port);

console.log('Node + Express REST API server started on port: ' + port);
