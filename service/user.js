const dao = require("../dao");
const $sql = require("../dao/sql");
const insertUser = (user) => {
  dao.execute($sql.insertUser, user);
};
const updateUser = (user) => {
  dao.execute($sql.updateUser, user);
};
const deleteUser = (id) => {
  dao.execute($sql.deleteUser, id);
};
const selectUserById = (id) => {
  dao.execute($sql.selectUserById, id);
};
const selectUserByName = (name) => {
  dao.execute($sql.selectUserByName, name);
};
const selectAllUser = () => {
  dao.execute($sql.selectAllUser);
};
module.exports = {
  insertUser,
  updateUser,
  deleteUser,
  selectUserById,
  selectUserByName,
  selectAllUser,
};
