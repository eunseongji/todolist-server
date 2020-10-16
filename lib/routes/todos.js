"use strict";

var _express = _interopRequireDefault(require("express"));

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //라우터 레벨 미들웨어


// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/', function (req, res, next) {
  var sql = 'SELECT * FROM listitem';

  _database["default"].query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});
router.post('/insert', function (req, res, next) {
  console.log(req.body);
  var title = req.body.title;
  var sql = 'INSERT INTO listitem (title) VALUES (?)';

  _database["default"].query(sql, [title], function (err, data) {
    if (err) {
      return res.send(err);
    } else {
      console.log("insert");
      return res.send(data);
    }
  });
});
router["delete"]('/delete', function (req, res, next) {
  var id = req.body.id; //console.log(req.body.id);

  var sql = 'DELETE FROM listitem WHERE id = ?';

  _database["default"].query(sql, [id], function (err, data) {
    if (err) {
      return res.send(err);
    } else {
      console.log("delete");
      return res.send({
        id: id
      });
    }
  });
});
/*router.get('/edit/:id', function(req, res, next) {
    const UserId= req.params.id;
    const sql=`SELECT * FROM listitem WHERE id=${UserId}`;
    db.query(sql, function (err, data) {
      if (err) throw err;
      res.render('todos', { title: 'Title List', editData: data[0]});
    });
});*/

router.post('/edit', function (req, res, next) {
  var id = req.body.id;
  var title = req.body.title;
  var contents = req.body.contents;
  var sql = "UPDATE listitem SET title=?,contents=? WHERE id= ?";

  _database["default"].query(sql, [title, contents, id], function (err, data) {
    if (err) {
      return res.send("fail");
    } else {
      console.log("edit");
      return res.send("success");
    }
  });
});
router.post('/Update', function (req, res, next) {
  var id = req.body.id;
  var checked = req.body.checked;
  console.log(checked);
  var sql = "UPDATE listitem SET checked = ? WHERE id= ?";

  _database["default"].query(sql, [checked, id], function (err, data) {
    if (err) {
      return res.send(err);
    } else {
      console.log("Update");
      return res.send({
        id: id,
        checked: checked
      });
    }
  });
});
module.exports = router;