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
  lengthofSequence,
  getStriningEligiblePipes,
} = require('./PipeStringing');
const { cutPipe } = require('./PipeCutting');

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

  //cutting
  app.post('/pipes/cut', cutPipe);

  //stringing
  app.get('/string', getStringing);
  app.get('/string/eligible', getStriningEligiblePipes);
  app.post('/string', appendToString);
  app.put('/string', updateSequence);
  app.get('/pipes/info/:pipes', getStrungPipesInfo);
  app.post('/pipes/length', lengthofSequence);

  // fittings routes
  app.post('/fittings', addFittings);
  app.get('/fittings', getFittings);

  // otherdata
  app.get('/scheduleAndThickness', getScheduleAndThickness);
};

module.exports = { SetRoutes };
