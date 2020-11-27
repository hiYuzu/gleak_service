const dao = require("../dao");
const $sql = require("../dao/sql");
const selectVideoUrlByDataId = (id) => {
  return dao.execute($sql.selectVideoUrlByDataId, id);
};
const insert = (videoPath, res) => {
  dao
    .execute($sql.insertVideo, videoPath)
    .then(() => {
      res.send({ code: 200, msg: "upload success" });
    })
    .catch((err) => {
      console.error(err, "视频路径储存数据库失败");
      res.status(500);
      res.end();
    });
};
module.exports = {
  selectVideoUrlByDataId,
  insert,
};
