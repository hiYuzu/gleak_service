const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const videoService = require("../service/video");
const monitorDataService = require("../service/monitorData");
const router = express.Router();
const upload = multer({ dest: "public/uploads/" });

router.post("/insert", upload.single("video"), (req, res) => {
  const date = formatDateTime();
  const dirPath = path.resolve("public/uploads") + "\\" + date;
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err, "mkdir ${dirPath} fail");
      res.status(500);
      res.end();
    } else {
      const file = req.file;
      const videoName = file.originalname;
      const filePath = dirPath + "\\" + videoName;
      fs.rename(file.path, filePath, (err) => {
        if (err) {
          console.error(err, "move ${filePath} fail");
          res.status(500);
          res.end();
        } else {
          monitorDataService
            .insert(req, filePath, videoName)
            .then(() => {
              res.status(200);
              res.end();
            })
            .catch((err) => {
              console.error(err, "insertMonitorData fail");
              fs.unlink(filePath, function (err) {
                if (err) {
                  return console.error(err);
                }
                console.log("%s文件删除成功！", filePath);
              });
              res.status(500);
              res.end();
            });
        }
      });
    }
  });
});
router.get("/selectVideoUrlByDataId", (req, res) => {
  const { id } = req.query;
  let result = { status: true };
  videoService
    .selectVideoUrlByDataId(id)
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectVideoUrlByDataId fail");
      res.status(500);
      res.end();
    });
});

const formatDateTime = function () {
  let date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + m + "-" + d;
};
module.exports = router;
