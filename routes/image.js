const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const imageService = require("../service/image");
const router = express.Router();
const upload = multer({ dest: "public/uploads/" });

router.post("/insert", upload.single("images"), (req, res) => {
  const file = req.file;
  const imageName = file.originalname;
  const picPath = path.resolve("public/uploads") + "\\" + imageName;
  fs.rename(file.path, picPath, (err) => {
    if (err) {
      console.error(err, "upload fail");
      res.status(500);
      res.end();
    } else {
      imageService.insert(picPath, res);
    }
  });
});
router.get("/selectImageUrlByDataId", (req, res) => {
  const { id } = req.query;
  let result = { status: true };
  imageService
    .selectImageUrlByDataId(id)
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectImageNameByDataId fail");
      res.status(500);
      res.end();
    });
});
module.exports = router;
