const dao = require("../dao");
const $sql = require("../dao/sql");
const queryAll = (req, res) => {
  dao
    .execute($sql.selectAllUser)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.end();
    });
};
const insertPic = (picPath, res) => {
  dao
    .execute($sql.insertPic, picPath)
    .then(() => {
      res.send({ code: 200, msg: "upload success" });
    })
    .catch((err) => {
      console.error(err, "图片路径储存数据库失败");
      res.status(500);
      res.end();
    });
};
module.exports = {
  queryAll,
  insertPic,
};
