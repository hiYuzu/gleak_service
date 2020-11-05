const dao = require("../dao");
const $sql = require("../dao/sql");
const insertUser = (user) => {
  return dao.execute($sql.insertUser, user);
};
const updateUser = (user) => {
  return dao.execute($sql.updateUser, user);
};
const deleteUser = (id) => {
  return dao.execute($sql.deleteUser, id);
};
const selectUserById = (id) => {
  return dao.execute($sql.selectUserById, id);
};
const selectUserByName = (name) => {
  return dao.execute($sql.selectUserByName, name);
};
const selectAllUser = () => {
  return dao.execute($sql.selectAllUser);
};
module.exports = {
  insertUser,
  updateUser,
  deleteUser,
  selectUserById,
  selectUserByName,
  selectAllUser,
};
