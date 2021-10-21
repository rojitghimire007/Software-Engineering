let URL = process.env.API || 'http://localhost:8081';

const API = {
  poc: `${URL}/poc`,

  // user routes
  auth: `${URL}/auth`,
  login: `${URL}/login`,
  signup: `${URL}/signup`,

  // pipes
  getPipes: `${URL}/pipes`,
  addPipe: `${URL}/pipes`,
  deletePipe: `${URL}/pipes`,
  getOptions: `${URL}/getOptions`,
  getSchedules: `${URL}/getSchedules`,
  getStringingInfo: `${URL}/stringing`,
  updateStringing: `${URL}/updateStrung`,
  getFittings: `${URL}/fittings`,
  stringing: `${URL}/string`,
  getStrungPipesInfo: `${URL}/pipes/info/`,
  getSequenceLength: `${URL}/pipes/length/`,
  getStriningEligiblePipes: `${URL}/string/eligible`,
  getCuttingEligiblePipes: `${URL}/pipes/cuttable`,
};

export { URL, API };
