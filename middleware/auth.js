const jwt = require("jsonwebtoken");
const config = require("config");
const moment = require("moment");
const Librarian = require("../models/librarian");
const response = require("../helpers/response");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return response.sendUnauthorized(res, "Authorization token is required.");
  } else {
    try {
      const decoded = jwt.verify(authorization, config.key.privateKey);
      const { _id, last_login } = decoded;

      Librarian.findById({ _id }, (err, data) => {
        if (err) return response.sendBadRequest(err);

        if (moment(last_login).isSame(data.last_login)) {
          next();
        } else {
          return response.sendUnauthorized(res, "Already logedin somewhere.");
        }
      });
    } catch (err) {
      return response.sendUnauthorized(res, "Authorization token is invalid.");
    }
  }
};

module.exports = auth;
