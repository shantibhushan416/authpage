const express = require("express");
const userAuth = require("../controllers/userAuth");

const routes = express.Router({ mergeParams: true });

routes.route("/signup").post(userAuth.signup);
routes.route("/login").post(userAuth.login);

module.exports = routes;
