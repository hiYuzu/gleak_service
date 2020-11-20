const dao = require("../dao");
const $sql = require("../dao/sql");
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
    let falseState = 0;
    if (falseObject) {
      falseState = falseObject.count;
    }
    let trueState = object.count - falseState;
    array.push({ name, trueState, falseState });
  }
  array.sort((a, b) => {
    if (a.falseState < b.falseState) {
      return 1;
    }
    return -1;
  });
  return array;
};
module.exports = {
  selectMonitorDataByName,
  getStatisticsDataByStateAndBetweenTime,
};
