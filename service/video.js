const dao = require("../dao");
const $sql = require("../dao/sql");
const selectVideoUrlByDataId = (id) => {
  return dao.execute($sql.selectVideoUrlByDataId, id);
};
const insert = (video) => {
  return dao.execute($sql.insertVideo, video);
};
module.exports = {
  selectVideoUrlByDataId,
  insert,
};
