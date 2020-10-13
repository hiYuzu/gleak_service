const dao = require("../dao");
const $sql = require("../dao/sql");
module.exports = {
  queryAll: function (req, res) {
    dao
      .execute($sql.queryAll)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.end();
      });
  },
};
