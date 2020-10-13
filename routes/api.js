const express = require("express");
const service = require("../service");
const jwtUtil = require("../jwtAuth/jwtUtil");
const router = express.Router();

router.get("/login", (req, res) => {
  const { name, password } = req.query;
  console.log("get请求参数：%s , %s ", name, password);
  const token = jwtUtil.sign({name});
  res.send(token);
});
router.post("/userInfo", function (req, res) {
  let param = req.body;
  console.log("post请求参数： " + JSON.stringify(param));
  service.queryAll(req, res);
});
router.get("/userInfo", function (req, res) {
  let param = req.query;
  console.log("get请求参数： " + JSON.stringify(param));
  service.queryAll(req, res);
});
router.get("/out", (req, res) => {
  let param = req.query;
  console.log("out请求参数： " + JSON.stringify(param));
  console.log("退出系统");
  res.end();
});
module.exports = router;
