import express from 'express';
const router = express.Router(); //라우터 레벨 미들웨어

import db from '../database';
// another routes also appear here

// this script to fetch data from MySQL databse table
router.get('/', function(req, res, next) {
    const sql='SELECT * FROM listitem';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});

router.post('/insert', function(req, res, next) {
  console.log(req.body)
  const title= req.body.title;
  const sql='INSERT INTO listitem (title) VALUES (?)';
   db.query(sql, [title], function (err, data) {
     if(err) {
      return res.send(err)
     }
     else {
        console.log("insert")
         return res.send(data)
     }
    });
});

router.delete('/delete', function(req, res, next) {
    const id= req.body.id;
    //console.log(req.body.id);
    const sql = 'DELETE FROM listitem WHERE id = ?';
    db.query(sql, [id], function (err, data) {
      if(err) {
        return res.send(err)
       }
       else {
        console.log("delete")
        return res.send({ id })
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

router.post('/edit', function(req, res, next) {
    const id = req.body.id;
    const title= req.body.title;
    const contents=req.body.contents;
    const sql = `UPDATE listitem SET title=?,contents=? WHERE id= ?`;
    db.query(sql, [title, contents, id], function (err, data) {
      if(err) {
        return res.send("fail")
       }
       else {
        console.log("edit")
        return res.send("success")
       }
      });
      
});

router.post('/Update', function(req, res, next) {
  const id = req.body.id;
  const checked= req.body.checked;
  console.log(checked);
  const sql = `UPDATE listitem SET checked = ? WHERE id= ?`;
  db.query(sql, [checked, id], function (err, data) {
    if(err) {
      return res.send(err)
     }
     else {
      console.log("Update")
      return res.send({ id, checked })
     }
    });
});

module.exports = router;