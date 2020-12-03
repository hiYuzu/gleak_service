const dao = require("../dao");
const $sql = require("../dao/sql");
const realConst = new Map();
const insertLocation = async (location) => {
  await dao.execute($sql.insertLocation, location);
  return updateRealLocation(location);
};
const insertRealLocation = async (location) => {
  let { insertId } = await dao.execute($sql.insertRealLocation, location);
  realConst.set(location.userId, insertId);
  return insertId;
};
const updateRealLocation = async (location) => {
  const userId = location[0];
  let id = realConst.get(userId);
  if (!id) {
    const ids = await dao.execute($sql.selectRealLocationIdByUserId, userId);
    if (ids) {
      id = ids[0].id;
      realConst.set(location[0], id);
      const param = Array.of(location[1], location[2], id);
      await dao.execute($sql.updateRealLocation, param);
    } else {
      await insertRealLocation(location);
    }
  } else {
    const param = Array.of(location[1], location[2], id);
    await dao.execute($sql.updateRealLocation, param);
  }
  return true;
};
const selectLocationByUserIdAndBetweenTime = (params) => {
  return dao.execute($sql.selectLocationByUserIdAndBetweenTime, params);
};
const selectRealLocationByUserId = (id) => {
  return dao.execute($sql.selectRealLocationByUserId, id);
};

module.exports = {
  insertLocation,
  selectLocationByUserIdAndBetweenTime,
  insertRealLocation,
  updateRealLocation,
  selectRealLocationByUserId,
};
