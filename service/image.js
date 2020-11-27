const dao = require("../dao");
const $sql = require("../dao/sql");
const selectImageUrlByDataId = (id) => {
    return dao.execute($sql.selectImageUrlByDataId, id);
};
const insert = (picPath, res) => {
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
    selectImageUrlByDataId,
    insert,
};
