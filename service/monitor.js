const dao = require("../dao");
const $sql = require("../dao/sql");
const insertMonitor = (monitor) => {
  dao.execute($sql.insertMonitor, monitor);
};
const updateMonitor = (monitor) => {
  dao.execute($sql.updateMonitor, monitor);
};
const deleteMonitor = (id) => {
  dao.execute($sql.deleteMonitor, id);
};
const selectMonitorById = (id) => {
  dao.execute($sql.selectMonitorById, id);
};
const selectMonitorByName = (name) => {
  dao.execute($sql.selectMonitorByName, name);
};
const selectAllMonitor = () => {
  dao.execute($sql.selectAllMonitor);
};
module.exports = {
  insertMonitor,
  updateMonitor,
  deleteMonitor,
  selectMonitorById,
  selectMonitorByName,
  selectAllMonitor,
};
