import { getLocalStorage, setLocalStorage } from 'utils/utils';

function header() {
  return { 'Content-Type': 'application/json' };
}

function authHeader() {
  let authtoken = getLocalStorage('pipeline_token');
  return { 'Content-Type': 'application/json', token: authtoken };
}

export { header, authHeader };
