const express = require("express");
const routes = express.Router();
const userAuth = require("./userAuth");

routes.use("/user", userAuth);

module.exports = routes;
