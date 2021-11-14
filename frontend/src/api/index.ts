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

  
  // ADMINISTRATION

  postProjectAdmin: (
    project_number: string,
    pname: string,
    company: string,
    company_address: string,
    company_phone: string,
    company_email: string,
    work_number: string,
    work_site_phone: string,
    plocation: string,
    notes: string,
    start_date: string,
    end_date: string
  ) => authPost(API.postProjectAdmin, 
    {project_number, pname,  company, company_address, company_phone, company_email, work_number, work_site_phone, plocation,  notes, start_date, end_date}
  ),

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
    return authGet(API.getItemInfo, item);
  },
};
