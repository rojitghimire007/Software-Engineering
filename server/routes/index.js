const { login, signup, auth, selectProject, getAssociatedProjects, usersInProject} = require('./UserController');
const { postProject, addUserToProject, getAllUsers } = require('./AdminController');

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

const { addFittings, getFittings, editFitting } = require('./FittingContoller');

const { cutPipe, getCuttingEligiblePipes } = require('./PipeCutting');

const { bendPipe, removeBend, updateBend } = require('./pipeBending');

const {
  getStringing,
  getStrungPipesInfo,
  appendToString,
  updateSequence,
  lengthofSequence,
  getStriningEligiblePipes,
  deleteFromSequence,
} = require('./PipeStringing');
//const { cutPipe } = require('./PipeCutting');

const SetRoutes = (app) => {
  //admin
  app.post('/create/project', postProject);
  app.post('/create/project/user', addUserToProject);
  app.get('/allusers', getAllUsers);

  //user routes
  app.post('/signup', signup);
  app.post('/login', login);
  app.get('/list/project', getAssociatedProjects);
  app.post('/select/project', selectProject);
  app.get('/list/user', usersInProject);
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

  //cutting routes
  app.get('/pipes/cuttable', getCuttingEligiblePipes);
  app.post('/pipes/cut', cutPipe);

  //bend
  app.post('/bend', bendPipe);
  app.delete('/bend', removeBend);
  app.put('/bend', updateBend);

  //stringing
  app.get('/string', getStringing);
  app.get('/string/eligible', getStriningEligiblePipes);
  app.post('/string', appendToString);
  app.put('/string', updateSequence);
  app.delete('/string/:pipe', deleteFromSequence);
  app.get('/pipes/info/:pipes', getStrungPipesInfo);
  app.post('/pipes/length', lengthofSequence);

  // fittings routes
  app.post('/fittings', addFittings);
  app.get('/fittings', getFittings);
  app.put('/fittings', editFitting);

};

module.exports = { SetRoutes };
