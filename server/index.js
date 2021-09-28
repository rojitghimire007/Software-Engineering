var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const { client } = require('./utils/databaseConnection');
const { SetRoutes } = require('./routes');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

SetRoutes(app);

// Default error handler
app.use((err, req, res, next) => {
  // logError(err.error || err);
  res
    .status(err.status || 400)
    .send({ success: false, message: err.message || err });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
