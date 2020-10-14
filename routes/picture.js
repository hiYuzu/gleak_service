const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const service = require("../service");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/insert", upload.single("images"), (req, res) => {
  let images = req.file;
  fs.readFile(images.path, (err, imageData) => {// 写入文件
    if (err) {
      console.log(err, "图片读取失败");
      return;
    }
    let imageName = images.originalname; // 图片名称
    let radName = Date.now() + parseInt(new String(Math.random() * 1000)); // 赋给图片的名称用时间戳+随机数获取
    let oriName = imageName.lastIndexOf(".");
    let hzm = imageName.substring(oriName, imageName.length); // 图片后缀名
    let pic = radName + hzm; // 拼接处一个完整的图片名称
    fs.writeFile(path.join("/image", pic), imageData, (err) => {
      if (err) {
        console.log(err, "图片写入失败");
        res.send({ code: -1, msg: "图片上传失败" });
      } else {
        const picPath = "http://127.0.0.1:3000/public/image/" + pic;
        service.insertPic(picPath, res);
      }
    });
  });
});
module.exports = router;
