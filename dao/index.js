const mysql = require("mysql");
const config = require("../conf/db");
const pool = mysql.createPool(config.mysql);
const mysqlHelper = (sql, param) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.error("getConnection exception :" + err);
        reject(err);
        return;
      }
      connection.query(sql, param, function (err, result) {
        if (err) {
          console.error("query exception :" + err);
          reject(err);
        } else {
          resolve(result);
        }
        connection.release();
      });
    });
  });
};
module.exports = {
  execute: mysqlHelper,
};
