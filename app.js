const express = require("express");
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = 3000;

app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/src'))

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect();

app.get('/foodlist', (req, res) => {
  const item = req.query.item;
  connection.query(`SELECT * FROM recommended WHERE uid = '${item}'`, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/showmylist', (req, res) => {
  connection.query(`SELECT * FROM recommended WHERE uid = '123'`, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/addStore', (req, res) => {
  const storeName = req.query.store;
  // 먼저 해당 storeName이 이미 존재하는지 확인합니다.
  connection.query(`SELECT * FROM recommended WHERE uid = '123' AND name = '${storeName}' LIMIT 1`, (error, results) => {
    if (error) throw error;
    
    // 결과가 존재한다면, 이미 맛집이 추가된 것입니다.
    if (results.length > 0) {
      res.json({ message: "이미 추가된 맛집입니다." });
    } else {
      // 결과가 존재하지 않는다면, 새로운 맛집을 추가합니다.
      connection.query(`INSERT INTO recommended (uid, name) VALUES ('123', '${storeName}')`, (error, insertResults) => {
        if (error) throw error;
        res.json(insertResults);
      });
    }
  });
});


app.get('/addfriend', (req, res) => {
  const id = req.query.id;
  console.log(id)
  // Users 테이블에서 해당 id 값이 있는지 확인
  connection.query(`SELECT * FROM Users WHERE id = '${id}'`, (error, results) => {
    if (error) {
      // 에러 발생 시 에러 메시지 전송
      res.status(500).send("Internal Server Error");
      throw error;
    }

    // Users 테이블에 해당 id 값이 없으면 에러 메시지 전송
    if (results.length === 0) {
      res.status(400).send("Invalid user ID");
      return;
    }

    // Users 테이블에 해당 id 값이 있으면 FriendList 테이블에 추가
    connection.query(`INSERT INTO FriendList (uuid, fuuid) VALUES ('123', '${id}')`, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
});


app.get('/friendlist',(req, res)=> {
  connection.query('SELECT * FROM Users u JOIN FriendList f ON u.id = f.fuuid WHERE f.uuid = 123', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // 클라이언트로부터의 POST 요청 처리
// app.post('/saveRecommendation', (req, res) => {
//     const restaurantName = req.body.restaurantName;

//     // MySQL 쿼리 실행
//     const query = `INSERT INTO recommended (restaurant_name) VALUES (?)`;
//     connection.query(query, [restaurantName], (err, result) => {
//         if (err) {
//             console.error('Error saving recommendation to MySQL:', err);
//             res.status(500).send('Failed to save recommendation');
//         } else {
//             console.log('Recommendation saved to MySQL:', restaurantName);
//             res.status(200).send('Recommendation saved successfully!');
//         }
//     });
// });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 3000");
});