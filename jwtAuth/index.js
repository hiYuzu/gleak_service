const expressJwt = require("express-jwt");
const secretKey = require("../salt");
const jwtAuth = expressJwt({
  secret: secretKey.secretKey,
  algorithms: ["HS256"],
  requestProperty: "data",
}).unless({
  path: [
    "/api/login",
    "/api/out",
    "/api/app/selectAppByAppName",
    new RegExp("^/static"),
    new RegExp("^/uploads"),
    new RegExp("^/$"),
  ],
});
module.exports = jwtAuth;
