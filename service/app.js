const dao = require("../dao");
const $sql = require("../dao/sql");
const selectAppByAppName = (code) => {
  return dao.execute($sql.selectAppByAppName, code);
};
module.exports = {
  selectAppByAppName,
};
