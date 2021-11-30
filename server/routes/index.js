const path = require('path');
const { login, signup, auth, selectProject, getAssociatedProjects, usersInProject } = require('./UserController');
const { postProject, addUserToProject, getAllUsers, removeUserFromProject } = require('./AdminController');

const {
  addPipe,
  allPipes,
  updateStrung,
  deleteFromString,
  getStringingInfo,
  getOptions,
  deletePipe,
  editPipe,
  addCoating,
  getCoating,
} = require('./PipeContoller');

const { addFittings, getFittings, editFitting } = require('./FittingContoller');

const { cutPipe, getCuttingEligiblePipes, getPipeLength } = require('./PipeCutting');

const { bendPipe, removeBend, updateBend, getBend } = require('./pipeBending');

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

const { getAggregateData } = require('./dataLogController');
const { getWeld, postWeld, editWeld } = require('./weldingController');

const SetRoutes = (app) => {
  //admin
  app.post('/create/project', postProject);
  app.delete('/create/project/user/:uname', removeUserFromProject);
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
  app.post('/pipe/length', getPipeLength);

  //bend
  app.delete('/bend/:bend_id', removeBend);
  app.post('/bend', bendPipe);
  app.put('/bend', updateBend);
  app.get('/bend', getBend);

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

  //other
  app.get('/items/:item', getItemInfo);

  // fittings routes
  app.post('/fittings', addFittings);
  app.get('/fittings', getFittings);
  app.put('/fittings', editFitting);

  //aggreateData
  app.get('/aggregate', getAggregateData);

  //welding
  app.get('/welding', getWeld);
  app.post('/welding', postWeld);
  app.put('/welding', editWeld);

  //coating
  app.post('/coating', addCoating);
  app.get('/coating', getCoating)

  //docs
  app.get('/docs/:file', (req, res) => {
    const { file } = req.params;
    res.sendFile(path.join(__dirname + `/../docs/${file}`));
  })
};

module.exports = { SetRoutes };
