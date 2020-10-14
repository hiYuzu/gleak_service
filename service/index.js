const dao = require("../dao");
const $sql = require("../dao/sql");
module.exports = {
  queryAll: function (req, res) {
    dao
      .execute($sql.queryAll)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.end();
      });
  },
  insertPic: function (picPath, res) {
    dao
      .execute($sql.insertPic, picPath)
      .then(() => {
        res.send({ code: 200, msg: "图片上传成功", urls: picPath });
      })
      .catch((err) => {
        console.error(err, "图片路径储存数据库失败");
        res.status(500);
        res.end();
      });
  },
};
