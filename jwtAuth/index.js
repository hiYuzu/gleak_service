const expressJwt = require("express-jwt");
const secretKey = require("../salt");
const jwtAuth = expressJwt({
  secret: secretKey.secretKey,
  algorithms: ["HS256"],
  requestProperty: "data",
}).unless({
  path: ["/api/login", "/api/out", new RegExp("^/static"),new RegExp("^/$")],
});
module.exports = jwtAuth;
