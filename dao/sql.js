module.exports = {
  insert: "INSERT INTO user(name,password) VALUES(?,?)",
  update: "update user set name=?, age=? where id=?",
  delete: "delete from user where id=?",
  queryAll: "select * from user",
  insertPic: "insert into user(name,password) values(?,'null')",
};
