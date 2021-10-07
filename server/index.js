var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const { InitialMiddleWare, TokenMiddleWare } = require('./middlewares');
const { client } = require('./utils/databaseConnection');
const { SetRoutes } = require('./routes');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

InitialMiddleWare(app); //Add initial middlewares (cors, body-parser)
// TokenMiddleWare(app); // Extract email from the jwt token and put it in body
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
