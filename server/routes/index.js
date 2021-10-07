const { login, signup, auth } = require('./UserController');
const { getScheduleAndThickness } = require('./OtherDataContoller');

const {
  addPipe,
  allPipes,
  updateStrung,
  deleteFromString,
  getStringingInfo,
  getOptions,
} = require('./PipeContoller');

const { getFittings } = require('./FittingContoller');

const SetRoutes = (app) => {
  //user routes
  app.post('/signup', signup);
  app.post('/login', login);
  app.post('/auth', auth);

  // pipe routes
  app.post('/pipes', addPipe);
  app.get('/pipes', allPipes);
  app.get('/stringing', getStringingInfo);
  app.put('/updateStrung', updateStrung);
  app.delete('/deleteFromString', deleteFromString);
  app.get('/getOptions', getOptions);

  // fittings routes
  app.get('/fittings', getFittings);

  // otherdata
  app.get('/scheduleAndThickness', getScheduleAndThickness);
};

module.exports = { SetRoutes };
