const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const videoService = require("../service/video");
const router = express.Router();
const upload = multer({ dest: "public/uploads/" });

router.post("/insert", upload.single("video"), (req, res) => {
  const file = req.file;
  const videoName = file.originalname;
  const filePath = path.resolve("public/uploads") + "\\" + videoName;
  console.log(req.body.key);
  console.log(filePath);
  fs.rename(file.path, filePath, (err) => {
    if (err) {
      console.error(err, "upload video fail");
      res.status(500);
      res.end();
    } else {
      // videoService.insert(filePath, res);
      console.info("upload video success");
      res.status(200);
      res.end();
    }
  });
  /*fs.rename(file.path, filePath, (err) => {
    if (err) {
      console.error(err, "upload fail");
      res.status(500);
      res.end();
    } else {
      // videoService.insert(filePath, res);
      console.info("upload success");
      res.status(200);
      res.end();
    }
  });*/
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

module.exports = router;
