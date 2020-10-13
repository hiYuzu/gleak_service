const crypto = require("crypto");
module.exports = {
  MD5_SUFFIX: "tjTcb712",
  md5: function (pwd) {
    const md5 = crypto.createHash("md5");
    return md5.update(pwd).digest("hex");
  },
  secretKey: "tjTcb712",
};
