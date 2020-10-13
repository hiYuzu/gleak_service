const jwt = require("jsonwebtoken");
const salt = require("../salt");
module.exports = {
  sign: (data) => {
    return (
      "Bearer " +
      jwt.sign(data, salt.secretKey, {
        algorithm: "HS256",
        expiresIn: "1h",
      })
    );
  },
};
