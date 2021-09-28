let URL = process.env.API || 'http://localhost:8081';

const API = {
  poc: `${URL}/poc`,

  // user routes
  auth: `${URL}/auth`,
  login: `${URL}/login`,
  signup: `${URL}/signup`,
};

export { URL, API };
