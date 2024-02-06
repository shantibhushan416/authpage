const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const response = require("../helpers/response");

exports.signup = function (req, res) {
  const { password, email, full_name, phone } = req.body;
  console.log(phone);

  User.find({ email }, function (err, data) {
    if (data.length || err) {
      return response.sendBadRequest(res, err || "User already exist.");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const librarian = new User({
        password: hashedPassword,
        email,
        full_name,
        phone,
      });
      librarian.save(function (err, data) {
        if (err) return response.sendBadRequest(res, err);
        response.sendCreated(res, { data, message: "Signup successfully" });
      });
    }
  });
};

exports.login = function (req, res) {
  User.find({ email: req.body.email }, function (err, data) {
    if (!data.length || err) {
      return response.sendBadRequest(res, err || "Invalid email or password");
    } else {
      const { password, email, full_name, _id } = data[0];

      const isSame = bcrypt.compareSync(req.body.password, password);

      if (!isSame) {
        return response.sendBadRequest(res, "Invalid email or password");
      } else {
        const last_login = new Date();
        const token = jwt.sign(
          { email, full_name, _id, last_login },
          config.key.privateKey,
          {
            expiresIn: "24h",
          }
        );

        User.findByIdAndUpdate({ _id }, { last_login }, function (err) {
          if (err) {
            return response.sendBadRequest(
              res,
              "something went wrong, please try again."
            );
          } else {
            response.sendCreated(res, {
              data: { token, email, full_name },
              message: "logedin successfully.",
            });
          }
        });
      }
    }
  });
};
