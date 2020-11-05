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
const selectMonitorByName = (name) => {
  return dao.execute($sql.selectMonitorByName, name);
};
const selectAllMonitor = () => {
  return dao.execute($sql.selectAllMonitor);
};
module.exports = {
  insertMonitor,
  updateMonitor,
  deleteMonitor,
  selectMonitorById,
  selectMonitorByName,
  selectAllMonitor,
};
