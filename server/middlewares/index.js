const bodyParser = require('body-parser');
const cors = require('cors');
const TokenMiddleWare = require('./token');

/**
 * Adds cors to the express app
 * Adds body-parser to the express app
 * @param {*} app - Express App
 */
const InitialMiddleWare = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //Access control. Called on every http request
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, email, authtoken, Accept'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS'
    );
    next();
  });
};

module.exports = { InitialMiddleWare, TokenMiddleWare };
