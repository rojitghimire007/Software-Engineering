const { login } = require('./UserController');

const SetRoutes = (app) => {
  //user routes
  app.post('/login', login);
};

module.exports = { SetRoutes };
