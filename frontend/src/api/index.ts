import { authGet, post, authPost, authPut, get, authDelete } from './request';
import { API } from './routes';

export default {
  getPOC: () => {
    return get(API.poc);
  },

  postPOC: (data: { name: string; phone: string }) => {
    return post(API.poc, data);
  },

  auth: () => {
    return authPost(API.auth, {});
  },

  login: (email: string, password: string) => {
    return post(API.login, { email, password });
  },

  getPipes: () => {
    return authGet(API.getPipes, '');
  },

  addPipe: (data: any) => {
    return authPost(API.addPipe, data);
  },

  deletePipe: (id: string) => {
    return authDelete(`${API.deletePipe}/${id}`);
  },

  getOptions: () => {
    return authGet(API.getOptions, '');
  },

  getSchedules: (diameter: string) => {
    return authGet(API.getSchedules, diameter.replaceAll(' ', '%20'));
  },

  getStringingInfo: () => {
    return authGet(API.getStringingInfo, '');
  },

  updateStringing: (
    pipe_id: string,
    curr_id: string,
    curr_station: string,
    left_of_target: string | null
  ) => {
    return authPut(API.updateStringing, {
      pipe_id,
      curr_id,
      curr_station,
      left_of_target,
    });
  },

  getFittings: () => {
    return authGet(API.getFittings, '');
  },

  addFitting: (data: any) => {
    return authPost(API.getFittings, data);
  },
};
