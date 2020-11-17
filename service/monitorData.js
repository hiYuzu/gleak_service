const dao = require("../dao");
const $sql = require("../dao/sql");
const selectMonitorDataByName = async (name, curPage, pageSize) => {
  let m = (curPage - 1) * pageSize;
  let n = parseInt(pageSize);
  if (!name) {
    name = "%";
  }
  let count;
  let table;
  let counts = await dao.execute($sql.selectMonitorDataCountByName, name);
  count = counts[0].count;
  table = await dao.execute($sql.selectMonitorDataByName, Array.of(name, m, n));
  return { count, table };
};
module.exports = {
  selectMonitorDataByName,
};
