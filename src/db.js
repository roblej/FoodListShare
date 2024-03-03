

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

// // 이제 connection 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다.


// connection.connect();

// connection.query('SELECT * from Users', (error, rows, fields) => {
//   if (error) throw error;
//   console.log('User info is: ', rows);
// });

// connection.end();