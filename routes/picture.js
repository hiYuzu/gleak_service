const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const service = require("../service");
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
      service.insertPic(picPath, res);
    }
  });
});
module.exports = router;
