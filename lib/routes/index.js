"use strict";

var express = require("express");

var router = express.Router(); //   MySQL 로드

var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  post: 3306,
  user: 'root',
  password: '4fkdgo!!',
  database: 'test'
});
router.get('/', function (req, res) {
  res.render('list');
});
router.get('/list', function (req, res) {
  res.redirect('/board/list/1');
}); // 리스트 전체 보기 GET

router.get('/list/:page', function (req, res, next) {
  db.getConnection(function (err, connection) {
    // Use the connection
    //var sqlForSelectList = "SELECT idx, creator_id, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate,hit FROM board";
    db.query('SELECT * FROM users', function (err, rows) {
      if (err) console.error("err : " + err);
      console.log("rows : " + JSON.stringify(rows));
      res.render('list', {
        rows: rows
      });
      db.release(); // Don't use the connection here, it has been returned to the pool.
    });
  });
});
module.exports = router;