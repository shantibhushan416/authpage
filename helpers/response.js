exports.sendCreated = function (res, data) {
  return res.status(200).send({ statusCode: 200, message: "success",...data });
};

exports.sendBadRequest = function (res, message) {
  return res.status(400).send({
    statusCode: 400,
    message: message,
  });
};

exports.sendUnauthorized = function (res, message) {
  return res.status(401).send({
    statusCode: 401,
    message: message,
  });
};

exports.sendForbidden = function (res) {
  return res.status(403).send({
    statusCode: 403,
    message: "You do not have rights to access this resource.",
  });
};

exports.sendNotFound = function (res) {
  return res.status(404).send({
    success: false,
    message: "Resource not found.",
  });
};

exports.setHeadersForCORS = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept"
  );
  next();
};
 