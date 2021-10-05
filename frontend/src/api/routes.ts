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
  getOptions: `${URL}/getOptions`,
  getSchedules: `${URL}/getSchedules`,
  getFittings: `${URL}/fittings`,
};

export { URL, API };
