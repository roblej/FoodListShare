const express = require("express");
const mysql = require('mysql2');
const app = express();
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