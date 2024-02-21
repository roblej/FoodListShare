const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '121.176.72.100',
  user     : 'ten',
  password : 'jang1012',
  database : 'FoodListShare'
});

connection.connect();

connection.query('SELECT * from Users', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows);
});

connection.end();