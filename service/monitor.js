const dao = require("../dao");
const $sql = require("../dao/sql");

const insertMonitor = (monitor) => {
  return dao.execute($sql.insertMonitor, monitor);
};
const updateMonitor = (monitor) => {
  return dao.execute($sql.updateMonitor, monitor);
};
const deleteMonitor = (id) => {
  return dao.execute($sql.deleteMonitor, id);
};
const selectMonitorById = (id) => {
  return dao.execute($sql.selectMonitorById, id);
};
const selectMonitorInfo = () => {
  return dao.execute($sql.selectMonitorInfo);
};

const selectAllMonitor = () => {
  return dao.execute($sql.selectAllMonitor);
};

const selectLimitMonitorByName = async (name, curPage, pageSize) => {
  let m = (curPage - 1) * pageSize;
  let n = parseInt(pageSize);
  let count;
  let table;
  if (name) {
    let counts = await dao.execute(
      $sql.selectMonitorCountByName,
      Array.of(name, m, n)
    );
    count = counts[0].count;
    table = await dao.execute(
      $sql.selectMonitorByNameByLimit,
      Array.of(name, m, n)
    );
  } else {
    let counts = await dao.execute($sql.selectMonitorCount);
    count = counts[0].count;
    table = await dao.execute($sql.selectAllMonitorByLimit, Array.of(m, n));
  }
  return { count, table };
};
module.exports = {
  insertMonitor,
  updateMonitor,
  deleteMonitor,
  selectMonitorById,
  selectMonitorInfo,
  selectLimitMonitorByName,
  selectAllMonitor,
};
