const dao = require("../dao");
const $sql = require("../dao/sql");
const realConst = new Map();
const insertLocation = async (location) => {
  await dao.execute($sql.insertLocation, location);
  return updateRealLocation(location)
};
const insertRealLocation = async (location) => {
  let id = await dao.execute($sql.insertRealLocation, location);
  realConst.set(location.userId, id);
  return id;
};
const updateRealLocation = (location) => {
  const { userId } = location;
  const id = realConst.get(userId);
  if (id) {
    return dao.execute($sql.updateRealLocation, location);
  }
  return insertRealLocation(location);
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
