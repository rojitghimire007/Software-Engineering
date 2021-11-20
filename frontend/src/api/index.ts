import { authGet, post, authPost, authPut, get, authDelete } from './request';
import { API } from './routes';

export default {
  auth: () => {
    return authPost(API.auth, {});
  },

  login: (email: string, password: string) => {
    return post(API.login, { email, password });
  },

  getAssociatedProjects: () => {
    return authGet(API.getAssociatedProjects, '');
  },

  selectProject: (project_number: any) => {
    return authPost(API.selectProject, { project_number });
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

  appendToString: (pipe_id: string) => authPost(API.stringing, { pipe_id }),

  updateSequence: (
    item: string,
    prev_item: string | null,
    start_item: string | null
  ) => authPut(API.stringing, { item, prev_item, start_item }),

  insertIntoSequence: (
    item: string,
    prev_item: string | null,
    start_item: string | null
  ) => authPost(API.stringing, { item, prev_item, start_item }),

  getStrungPipesInfo: (pipes: Array<string | number>) => {
    return authGet(API.getStrungPipesInfo, pipes.join('_'));
  },

  /**
   *
   * @param item ID of item
   * @returns
   */
  deleteFromSequence: (item: string) => authDelete(API.stringing + `/${item}`),

  getSequenceLength: (sequence: Array<any>) =>
    authPost(API.getSequenceLength, { sequence }),

  createNewSequence: (station: number, item: string) =>
    authPost(API.createNewSequence, { station, item }),
  // Cutting

  getCuttingEligiblePipes: () => authGet(API.getCuttingEligiblePipes, ''),

  /**
   *
   * @param pipe id of pipe to be cut
   * @param cut_length length of the new cut
   * @returns
   */
  cutPipe: (pipe: string, cut_length: number) =>
    authPost(API.cutPipe, { pipe, cut_length }),

  // Fittings
  getFittings: () => {
    return authGet(API.getFittings, '');
  },

  addFitting: (data: any) => {
    return authPost(API.getFittings, data);
  },

  getItemInfo: (item: string) => {
    item = item.toUpperCase();
    if (!new RegExp('F_.*').test(item)) item = 'P_' + item;
    return authGet(API.getItemInfo, item);
  },

  getStrungItemsInfo: (items: Array<string>) => {
    return authGet(API.getStrungItemsInfo, items.join('-'));
  },
};
