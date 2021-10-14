const { login, signup, auth } = require('./UserController');
const { getScheduleAndThickness } = require('./OtherDataContoller');

const {
  addPipe,
  allPipes,
  updateStrung,
  //addToString,
  deleteFromString,
  getStringingInfo,
  getOptions,
  deletePipe,
  editPipe,
} = require('./PipeContoller');

const { addFittings, getFittings } = require('./FittingContoller');
const {
  getStringing,
  getStrungPipesInfo,
  appendToString,
  updateSequence,
} = require('./PipeStringing');

const SetRoutes = (app) => {
  //user routes
  app.post('/signup', signup);
  app.post('/login', login);
  app.post('/auth', auth);

  // pipe routes
  app.post('/pipes', addPipe);
  app.get('/pipes', allPipes);
  app.delete('/pipes/:pipeID', deletePipe);
  app.get('/stringing', getStringingInfo);
  app.put('/updateStrung', updateStrung);
  app.delete('/deleteFromString', deleteFromString);
  app.get('/getOptions', getOptions);
  app.put('/pipes/:pipeID', editPipe);

  //stringing
  app.get('/string', getStringing);
  app.post('/string', appendToString);
  app.put('/string/update', updateSequence);
  app.get('/pipes/info/:pipes', getStrungPipesInfo);

  // fittings routes
  app.post('/fittings', addFittings);
  app.get('/fittings', getFittings);

  // otherdata
  app.get('/scheduleAndThickness', getScheduleAndThickness);
};

module.exports = { SetRoutes };
