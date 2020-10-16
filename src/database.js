import mysql from 'mysql';

const conn = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password : '4fkdgo!!',
    database : 'todos_db'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

module.exports = conn;