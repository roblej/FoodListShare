const express = require("express");
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/src'))

const connection = mysql.createConnection({
  host     : '121.176.72.100',
  user     : 'ten',
  password : 'jang1012',
  port : 3307,
  database : 'FoodListShare'
});

connection.connect();

app.get('/foodlist', (req, res) => {
  connection.query('SELECT * FROM recommended', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 3000");
});