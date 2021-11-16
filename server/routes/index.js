const {
  login,
  signup,
  auth,
  selectProject,
  getAssociatedProjects,
  usersInProject,
} = require('./UserController');
const {
  postProject,
  addUserToProject,
  getAllUsers,
} = require('./AdminController');

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

const { cutPipe, getCuttingEligiblePipes } = require('./PipeCutting');

const {
  getStringing,
  updateSequence,
  getStriningEligiblePipes,
  deleteFromSequence,
  createNewSequence,
  getItemInfo,
  insertIntoSequence,
  getStrungItemsInfo,
} = require('./Stringing');
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
  //cutting
  app.post('/pipes/cut', cutPipe);

  //stringing
  app.get('/string', getStringing);
  app.get('/string/eligible', getStriningEligiblePipes);
  app.post('/string/sequence', createNewSequence);
  app.put('/string', updateSequence);
  app.post('/string', insertIntoSequence);
  app.delete('/string/:item', deleteFromSequence);
  app.get('/string/details/:items', getStrungItemsInfo);

  //other
  app.get('/items/:item', getItemInfo);

  // fittings routes
  app.post('/fittings', addFittings);
  app.get('/fittings', getFittings);
};

module.exports = { SetRoutes };
