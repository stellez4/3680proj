const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var mysql = require('mysql')
const ejs = require('ejs');
const app = express();
const port = 8080;
app.use(express.static(dirname))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');



app.get('/', function (req, res) {
  res.sendFile('home.html', { root: dirname })
});

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "",
  password: "",
  database: ""
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('connected...');
})

//SHOWS GAME
app.post('/game', function (req, res) {
  console.log(req.body);
  res.sendFile('game.html', { root: __dirname })

  var sql = "insert into Leaderboard (name, score) values('" + req.body.user + "', NULL)";
  connection.query(sql, function (err) {
    if (err) throw err
    console.log("Data saved");
  })

})


app.listen(port, () => {
  console.log(Example app listening on port ${port})
})
