const { login, signup, auth } = require('./UserController');
const { getScheduleAndThickness } = require('./OtherDataContoller');
const { addPipe, allPipes } = require('./PipeContoller');

const SetRoutes = (app) => {
  //user routes
  app.post('/signup', signup);
  app.post('/login', login);
  app.post('/auth', auth);

  // pipe routes
  app.post('/pipes', addPipe);
  app.get('/pipes', allPipes);

  // otherdata
  app.get('/scheduleAndThickness', getScheduleAndThickness);
};

module.exports = { SetRoutes };
