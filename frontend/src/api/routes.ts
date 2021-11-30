//let URL = process.env.API || 'http://localhost:8081';
let URL = process.env.API || 'http://54.166.243.173:8081';

const API = {
  poc: `${URL}/poc`,

  // user routes
  auth: `${URL}/auth`,
  login: `${URL}/login`,
  signup: `${URL}/signup`,
  getAssociatedProjects: `${URL}/list/project`,
  selectProject: `${URL}/select/project`,

  // admin
  postProjectAdmin: `${URL}/create/project`, // BACKEND url

  // pipes
  getPipes: `${URL}/pipes`,
  addPipe: `${URL}/pipes`,
  deletePipe: `${URL}/pipes`,
  getOptions: `${URL}/getOptions`,
  getSchedules: `${URL}/getSchedules`,
  getStringingInfo: `${URL}/stringing`,
  updateStringing: `${URL}/updateStrung`,
  getFittings: `${URL}/fittings`,

  // stringing
  stringing: `${URL}/string`,
  getStrungPipesInfo: `${URL}/pipes/info/`,
  getSequenceLength: `${URL}/pipes/length/`,
  getStriningEligiblePipes: `${URL}/string/eligible`,
  getCuttingEligiblePipes: `${URL}/pipes/cuttable`,
  cutPipe: `${URL}/pipes/cut`,
  getPipeLength: `${URL}/pipe/length`,
  createNewSequence: `${URL}/string/sequence`,

  //welding
  welding: `${URL}/welding`,

  //other
  getItemInfo: `${URL}/items/`,
  getStrungItemsInfo: `${URL}/string/details/`,

  bendPipe: `${URL}/bend`,
  usersInProject: `${URL}/list/user`,
  projUser: `${URL}/create/project/user`,
  getAllUsers: `${URL}/allusers`,
  aggreate: `${URL}/aggregate`,
};

export { URL, API };
