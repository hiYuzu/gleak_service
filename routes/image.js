const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const imageService = require("../service/image");
const router = express.Router();
const upload = multer({ dest: "public/uploads/" });

router.post("/insert", upload.single("image"), (req, res) => {
  const file = req.file;
  const imageName = file.originalname;
  const filePath = path.resolve("public/uploads") + "\\" + imageName;
  fs.rename(file.path, filePath, (err) => {
    if (err) {
      console.error(err, "upload fail");
      res.status(500);
      res.end();
    } else {
      imageService.insert(filePath, res);
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
