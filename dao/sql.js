module.exports = {
  /******************user**************************/
  insertUser:
    "insert into user(name,password,is_add,dept,telphone) VALUES(?,?,?,?,?)",
  updateUser:
    "update user set name=?, password=?,is_add=?,dept=?,telphone=? where id=?",
  deleteUser: "delete from user where id=?",
  selectUserById:
    "select id,name,password,is_add,dept,telphone,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from user where id=?",
  selectUserByName:
    "select id,name,password,is_add,dept,telphone,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from user where name=?",
  selectUserByNameByLimit:
    "select id,name,password,is_add,dept,telphone,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from user where name like ? limit ?,?",
  selectAllUserByLimit:
    "select id,name,password,is_add,dept,telphone,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from user limit ?,?",
  selectUserCount: "select count(id) as count from user",
  selectUserCountByName: "select count(*) as count from user where name like ?",
  /**********************monitor***********************/
  insertMonitor:
    "insert into monitor(name,code,longitude,latitude,period) VALUES(?,?,?,?,?)",
  updateMonitor:
    "update monitor set name=?, code=?,longitude=?,latitude=?,period=? where id=?",
  updateMonitorTime: "update monitor set time=? where id=?",
  deleteMonitor: "delete from  monitor where id=?",
  selectMonitorById:
    "select id,name,code,longitude,latitude,period,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%S') AS time,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from monitor where id=?",
  selectAllMonitor:
    "select id,name,code,longitude,latitude,period,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%S') AS time,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from monitor",
  selectMonitorByName: "select id from monitor where name = ?",
  selectMonitorByNameByLimit:
    "select id,name,code,longitude,latitude,period,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%S') AS time,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from monitor where name like ? limit ?,?",
  selectAllMonitorByLimit:
    "select id,name,code,longitude,latitude,period,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%S') AS time,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from monitor limit ?,?",
  selectMonitorCount: "select count(id) as count from monitor",
  selectMonitorCountByName:
    "select count(id) as count from monitor where name like ?",
  selectMonitorInfoByName:
    "select m.id,m.name,m.longitude,m.latitude,m.period,DATE_FORMAT(m.gmt_create, '%Y-%m-%d %H:%i:%S') AS create_time,DATE_FORMAT(m.time, '%Y-%m-%d %H:%i:%S') AS time,md.value,md.state,md.user_id from monitor as m left join monitor_data as md on m.id=md.monitor_id and m.time=md.gmt_modified where m.name like ?",

  /********************************video****************************/
  insertVideo: "insert into video(name,url,data_id) values(?,?,?)",
  selectVideoUrlByDataId: "select url from video where data_id=?",

  /********************************image****************************/
  insertPic: "insert into user(name,password) values(?,'null')",
  selectImageUrlByDataId: "select url from image where data_id=?",

  /************************monitorData*****************************/
  insertMonitorData:
    "insert into monitor_data(monitor_id,value,state,user_id,gmt_modified) values(?,?,?,?,?)",
  selectMonitorDataByName:
    "select mtd.id,mtd.state,mtd.value,mt.name as monitorName ,us.name as userName,DATE_FORMAT(mtd.gmt_modified, '%Y-%m-%d %H:%i:%S') AS time from monitor_data as mtd inner join monitor as mt inner join user as us on mt.id=mtd.monitor_id and mtd.user_id=us.id where mt.name like ? order by mtd.gmt_modified desc limit ?,?",
  selectMonitorDataCountByName:
    "select count(mtd.id) as count from monitor_data as mtd inner join monitor as mt inner join user as us on mt.id=mtd.monitor_id and mtd.user_id=us.id where mt.name like ?",
  /************************statistics*****************************/
  getStatisticsDataByBetweenTime:
    "select count(m.id) as count ,m.name as name from monitor as m join monitor_data as md on m.id=md.monitor_id where md.gmt_modified between ? and ? group by m.id",
  getStatisticsDataByStateAndBetweenTime:
    "select count(m.id) as count ,m.name as name from monitor as m join monitor_data as md on m.id=md.monitor_id where md.state=? and md.gmt_modified between ? and ? group by m.id",

  /************************location*****************************/
  insertLocation:
    "insert into location(user_id,longitude,latitude) values(?,?,?)",
  selectLocationByUserIdAndBetweenTime:
    "select longitude as lng,latitude as lat,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%S') as time from location  where user_id=? and time between ? and ?",

  /************************real_location*****************************/
  insertRealLocation:
    "insert into real_location(user_id,longitude,latitude) values(?,?,?)",
  updateRealLocation:
    "update real_location set longitude=?, latitude=? where id=?",
  selectRealLocationForAllUser:
    "select rl.longitude as longitude ,rl.latitude as latitude,us.id as id, us.name as name,DATE_FORMAT(rl.time, '%Y-%m-%d %H:%i:%S') as time from real_location  as rl join user as us on rl.user_id=us.id",
  selectRealLocationByUserName:
    "select rl.longitude as longitude ,rl.latitude as latitude,us.id as id, us.name as name,DATE_FORMAT(rl.time, '%Y-%m-%d %H:%i:%S') as time from real_location  as rl join user as us on rl.user_id=us.id where us.name like ?",
  selectRealLocationIdByUserId: "select id from real_location  where user_id=?",
};
