var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const { client } = require('./utils/databaseConnection');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/poc', async (req, res) => {
  try {
    let ans = await client.query('SELECT * FROM person');
    res.json(ans.rows);
  } catch (error) {
    res.send(error);
  }
});

app.post('/poc', async (req, res) => {
  try {
    let newRow = await client.query({
      text: 'INSERT INTO person VALUES($1, $2)',
      values: [req.body.name, req.body.phone],
    });

    res.send(newRow);
  } catch (error) {
    res.send(error);
  }
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
