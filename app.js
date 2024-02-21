const express = require("express");
const app = express();

app.use(express.static('public'));
app.use(express.static('src'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 3000");
});