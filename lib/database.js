"use strict";

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var conn = _mysql["default"].createConnection({
  host: 'localhost',
  post: 3306,
  user: 'root',
  password: '4fkdgo!!',
  database: 'todos_db'
});

conn.connect(function (err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;