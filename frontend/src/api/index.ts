import { authGet, post, authPost, authPut, get, authDelete } from './request';
import { API } from './routes';

export default {
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

  editPipe: (data: any, id: any) => {
    return authPut(`${API.getPipes}/${id}`, data);
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

  // Stringing calls

  getStriningEligiblePipes: () => authGet(API.getStriningEligiblePipes, ''),

  getStringing: () => authGet(API.stringing, ''),

  appendToString: (data: { pipe_id: string | number }) =>
    authPost(API.stringing, data),

  updateSequence: (data: {
    target_pipe: string | number;
    left_pipe: string | number;
  }) => authPut(API.stringing, data),

  getStrungPipesInfo: (pipes: Array<string | number>) => {
    return authGet(API.getStrungPipesInfo, pipes.join('_'));
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

  deleteFromSequence: (pipe: string) => authDelete(API.stringing + `/${pipe}`),

  getSequenceLength: (sequence: Array<any>) =>
    authPost(API.getSequenceLength, { sequence }),

  // Fittings
  getFittings: () => {
    return authGet(API.getFittings, '');
  },

  addFitting: (data: any) => {
    return authPost(API.getFittings, data);
  },
};
