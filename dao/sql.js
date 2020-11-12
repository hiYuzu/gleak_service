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
  selectAllUser:
    "select id,name,password,is_add,dept,telphone,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from user",
  /**********************monitor***********************/
  insertMonitor:
    "insert into monitor(name,code,longitude,latitude,period) VALUES(?,?,?,?,?)",
  updateMonitor:
    "update monitor set name=?, code=?,longitude=?,latitude=?period=? where id=?",
  deleteMonitor: "delete from user monitor id=?",
  selectMonitorById:
    "select id,name,code,longitude,latitude,period,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%S') AS time,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from monitor where id=?",
  selectMonitorByName:
    "select id,name,code,longitude,latitude,period,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%S') AS time,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from monitor where name=?",
  selectAllMonitor:
    "select id,name,code,longitude,latitude,period,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%S') AS time,DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS createTime,DATE_FORMAT(gmt_modified, '%Y-%m-%d %H:%i:%S') AS updateTime from monitor",
  selectMonitorInfo:
    "select m.id,m.name,m.longitude,m.latitude,m.period,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%S') AS time,md.value,md.state,md.user_id from monitor as m join monitor_data as md on m.id=md.monitor_id",
  /**********************image***********************/
  insertPic: "insert into user(name,password) values(?,'null')",
  selectTime:
    "select DATE_FORMAT(gmt_create, '%Y-%m-%d %H:%i:%S') AS time from user",
};
