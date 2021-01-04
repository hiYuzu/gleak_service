const express = require("express");
const userService = require("../service/user");
const monitorService = require("../service/monitor");
const monitorDataService = require("../service/monitorData");
const locationService = require("../service/location");
const jwtUtil = require("../jwtAuth/jwtUtil");
const moment = require("moment");
const router = express.Router();
moment.locale("zh-cn");

/*user*/
router.get("/login", (req, res) => {
  let result = { status: true };
  const { name, password } = req.query;
  userService
    .selectUserByName(name)
    .then((user) => {
      if (user.length > 0) {
        if (user[0].password === password) {
          let token = jwtUtil.sign({ name });
          let userId = user[0].id;
          let status = user[0].status;
          result.data = { token, userId, status };
        } else {
          result.status = false;
          result.msg = "密码错误";
        }
      } else {
        result.status = false;
        result.msg = "不存在该用户";
      }
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectUserByName");
      res.status(500);
      res.end();
    });
});
router.get("/out", (req, res) => {
  let param = req.query;
  console.log("out请求参数： " + JSON.stringify(param));
  console.log("退出系统");
  res.end();
});

router.post("/user/insert", (req, res) => {
  const { name, password, is_add, dept, telphone } = req.body;
  const user = Array.of(name, password, is_add, dept, telphone);
  let result = { status: true };
  userService
    .insertUser(name, user)
    .then((value) => {
      if (value) {
        let { insertId } = value;
        result.data = insertId;
      } else {
        result.status = false;
        result.msg = "用户名称不可重复！请修改名称后重新提交";
      }
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "用户添加失败");
      res.status(500);
      res.end();
    });
});
router.post("/user/update", (req, res) => {
  const { id, name, password, is_add, dept, telphone } = req.body;
  const user = Array.of(name, password, is_add, dept, telphone, id);
  let result = { status: true };
  userService
    .updateUser(user)
    .then(() => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "用户更新失败");
      res.status(500);
      res.end();
    });
});
router.post("/user/delete", (req, res) => {
  const { id } = req.body;
  let result = { status: true };
  userService
    .deleteUser(id)
    .then(() => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "用户删除失败");
      res.status(500);
      res.end();
    });
});
router.post("/user/selectUserById", (req, res) => {
  const { id } = req.body;
  let result = { status: true };
  userService
    .selectUserById(id)
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectUserById失败");
      res.status(500);
      res.end();
    });
});
router.post("/user/selectUserByName", (req, res) => {
  const { name } = req.body;
  let result = { status: true };
  userService
    .selectUserByName(name)
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectUserByName");
      res.status(500);
      res.end();
    });
});
router.post("/user/selectLimitUserByName", (req, res) => {
  const { name, curPage, pageSize } = req.body;
  let result = { status: true };
  userService
    .selectLimitUserByName(name, curPage, pageSize)
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectUserByName");
      res.status(500);
      res.end();
    });
});

/*monitor*/
router.post("/monitor/insert", (req, res) => {
  const { name, code, longitude, latitude, period } = req.body;
  const monitor = Array.of(name, code, longitude, latitude, period, null);
  let result = { status: true };
  monitorService
    .insertMonitor(name, monitor)
    .then((value) => {
      if (value) {
        let { insertId } = value;
        result.data = insertId;
      } else {
        result.status = false;
        result.msg = "设备名称不可重复！请修改名称后重新提交";
      }
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "监测点添加失败");
      res.status(500);
      res.end();
    });
});
router.post("/monitor/update", (req, res) => {
  const { id, name, code, longitude, latitude, period } = req.body;
  const monitor = Array.of(name, code, longitude, latitude, period, id);
  let result = { status: true };
  monitorService
    .updateMonitor(monitor)
    .then(() => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "监测点更新失败");
      res.status(500);
      res.end();
    });
});
router.post("/monitor/delete", (req, res) => {
  const { id } = req.body;
  let result = { status: true };
  monitorService
    .deleteMonitor(id)
    .then(() => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "监测点删除失败");
      res.status(500);
      res.end();
    });
});
router.post("/monitor/selectMonitorById", (req, res) => {
  const { id } = req.body;
  let result = { status: true };
  monitorService
    .selectMonitorById(id)
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectMonitorById false");
      res.status(500);
      res.end();
    });
});
router.post("/monitor/selectLimitMonitorByName", (req, res) => {
  const { name, curPage, pageSize } = req.body;
  let result = { status: true };
  monitorService
    .selectLimitMonitorByName(name, curPage, pageSize)
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectLimitMonitorByName false");
      res.status(500);
      res.end();
    });
});

router.post("/monitor/selectMonitorByName", (req, res) => {
  const { name } = req.body;
  let result = { status: true };
  monitorService
    .selectMonitorByName(name)
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectMonitorByName");
      res.status(500);
      res.end();
    });
});

router.get("/monitor/selectAllMonitor", (req, res) => {
  let result = { status: true };
  monitorService
    .selectAllMonitor()
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectAllMonitor false");
      res.status(500);
      res.end();
    });
});

router.post("/monitor/selectMonitorInfoByName", (req, res) => {
  const { name } = req.body;
  let result = { status: true };
  let dataArray = Array.of();
  monitorService
    .selectMonitorInfoByName(name)
    .then((value) => {
      if (value.length > 0) {
        for (const data of value) {
          let {
            id,
            name,
            longitude,
            latitude,
            period,
            time,
            value,
            state,
            create_time,
            isMonitor = 1,
          } = data;
          if (time) {
            const start_date = moment(time, "YYYY-MM-DD HH:mm:SS");
            const end_date = moment();
            const day = end_date.diff(start_date, "days");
            if (day > period) {
              isMonitor = 0;
            }
          } else {
            const start_date = moment(create_time, "YYYY-MM-DD HH:mm:SS");
            const end_date = moment();
            const day = end_date.diff(start_date, "days");
            if (day > period) {
              isMonitor = 0;
            }
          }

          dataArray.push({
            id,
            name,
            longitude,
            latitude,
            value,
            state,
            isMonitor,
            time,
            period,
          });
        }
      }
      result.data = dataArray;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectMonitorInfoByName false");
      res.status(500);
      res.end();
    });
});

/*monitor_data*/
router.post("/monitorData/selectMonitorDataByName", (req, res) => {
  const { name, curPage, pageSize } = req.body;
  let result = { status: true };
  monitorDataService
    .selectMonitorDataByName(name, curPage, pageSize)
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectMonitorDataByName false");
      res.status(500);
      res.end();
    });
});
/*monitor_data*/
router.post("/monitorData/selectMonitorDataAndVideoUrlByName", (req, res) => {
  const { name } = req.body;
  let result = { status: true };
  monitorDataService
    .selectMonitorDataAndVideoUrlByName(name)
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectMonitorDataAndVideoUrlByName false");
      res.status(500);
      res.end();
    });
});
router.get(
  "/monitorData/getStatisticsDataByStateAndBetweenTime false",
  (req, res) => {
    const { start, end } = req.query;
    let result = { status: true };
    monitorDataService
      .getStatisticsDataByStateAndBetweenTime(start, end)
      .then((value) => {
        result.data = value;
        res.send(result);
      })
      .catch((err) => {
        console.error(err, "getStatisticsDataByStateAndBetweenTime false");
        res.status(500);
        res.end();
      });
  }
);
/*location*/
router.post("/location/insert", (req, res) => {
  const { userId, longitude, latitude } = req.body;
  if (userId && longitude && latitude) {
    const location = Array.of(userId, longitude, latitude);
    let result = { status: true };
    locationService
      .insertLocation(location)
      .then(() => {
        res.send(result);
      })
      .catch((err) => {
        console.error(err, "用户:%s , 添加位置点失败", userId);
        res.status(500);
        res.end();
      });
  } else {
    res.end();
  }
});
router.get("/location/selectLocationByUserIdAndBetweenTime", (req, res) => {
  const { userId, start, end } = req.query;
  let result = { status: true };
  locationService
    .selectLocationByUserIdAndBetweenTime(Array.of(userId, start, end))
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectLocationByUserIdAndBetweenTime false");
      res.status(500);
      res.end();
    });
});
router.get("/location/selectRealLocationForAllUser", (req, res) => {
  let result = { status: true };
  locationService
    .selectRealLocationForAllUser()
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectRealLocationForAllUser false");
      res.status(500);
      res.end();
    });
});
router.get("/location/selectRealLocationByUserName", (req, res) => {
  const { name } = req.query;
  let result = { status: true };
  locationService
    .selectRealLocationByUserName(name)
    .then((value) => {
      result.data = value;
      res.send(result);
    })
    .catch((err) => {
      console.error(err, "selectRealLocationByUserName false");
      res.status(500);
      res.end();
    });
});
module.exports = router;
