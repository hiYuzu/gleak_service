const dao = require("../dao");
const $sql = require("../dao/sql");
const videoService = require("../service/video");
const insert = async (req, filePath, videoName) => {
  let data = JSON.parse(req.body.data);
  const { leakId, userId, monitorData } = data;
  const { monitorTime, monitorValue, monitorStatus } = monitorData;
  const result = await dao.execute(
    $sql.insertMonitorData,
    Array.of(leakId, userId, monitorValue, monitorStatus, monitorTime)
  );
  const {insertId}=result;
  return  videoService.insert(Array.of(videoName, filePath, insertId));
};
const selectMonitorDataByName = async (name, curPage, pageSize) => {
  let m = (curPage - 1) * pageSize;
  let n = parseInt(pageSize);
  if (!name) {
    name = "%";
  }
  let count;
  let table;
  let counts = await dao.execute($sql.selectMonitorDataCountByName, name);
  count = counts[0].count;
  table = await dao.execute($sql.selectMonitorDataByName, Array.of(name, m, n));
  return { count, table };
};
const getStatisticsDataByStateAndBetweenTime = async (start, end) => {
  const var1 = await dao.execute(
    $sql.getStatisticsDataByBetweenTime,
    Array.of(start, end)
  );
  const var0 = await dao.execute(
    $sql.getStatisticsDataByStateAndBetweenTime,
    Array.of(0, start, end)
  );
  let array = new Array();
  for (let object of var1) {
    let name = object.name;
    let falseObject = var0.find((value) => value.name == name);
    let falseStateCount = 0;
    if (falseObject) {
      falseStateCount = falseObject.count;
    }
    let trueStateCount = object.count - falseStateCount;
    array.push({ name, trueStateCount, falseStateCount });
  }
  array.sort((a, b) => {
    if (a.falseStateCount < b.falseStateCount) {
      return 1;
    }
    return -1;
  });
  return array;
};
module.exports = {
  insert,
  selectMonitorDataByName,
  getStatisticsDataByStateAndBetweenTime,
};
