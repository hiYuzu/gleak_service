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
const selectUserCount = () => {
  return dao.execute($sql.selectUserCount);
};
const selectUserByName = (name) => {
  return dao.execute($sql.selectUserByName, name);
};
const selectLimitUserByName = async (name, curPage, pageSize) => {
  let m = (curPage - 1) * pageSize;
  let n = parseInt(pageSize);
  let count;
  let table;
  if (name) {
    let counts = await dao.execute(
      $sql.selectUserCountByName,
      Array.of(name, m, n)
    );
    count = counts[0].count;
    table = await dao.execute(
      $sql.selectUserByNameByLimit,
      Array.of(name, m, n)
    );
  } else {
    let counts = await dao.execute($sql.selectUserCount);
    count = counts[0].count;
    table = await dao.execute($sql.selectAllUserByLimit, Array.of(m, n));
  }
  return { count, table };
};
module.exports = {
  insertUser,
  updateUser,
  deleteUser,
  selectUserById,
  selectUserByName,
  selectLimitUserByName,
  selectUserCount,
};
