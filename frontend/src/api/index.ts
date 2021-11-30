import { authGet, post, authPost, authPut, get, authDelete } from "./request";
import { API } from "./routes";

export default {
  auth: () => {
    return authPost(API.auth, {});
  },

  login: (email: string, password: string) => {
    return post(API.login, { email, password });
  },

  signup: (fname: string, email: string, password: string, phone: string) => {
    return authPost(API.signup, { fname, email, password, phone });
  },

  getAssociatedProjects: () => {
    return authGet(API.getAssociatedProjects, "");
  },

  selectProject: (project_number: any) => {
    return authPost(API.selectProject, { project_number });
  },

  getPipes: () => {
    return authGet(API.getPipes, "");
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
    return authGet(API.getOptions, "");
  },

  getSchedules: (diameter: string) => {
    return authGet(API.getSchedules, diameter.replaceAll(" ", "%20"));
  },

  getStringingInfo: () => {
    return authGet(API.getStringingInfo, "");
  },

  // Stringing calls

  getStriningEligiblePipes: () => authGet(API.getStriningEligiblePipes, ""),

  getStringing: () => authGet(API.stringing, ""),

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
    start_date: number,
    end_date: number
  ) =>
    authPost(API.postProjectAdmin, {
      project_number,
      pname,
      company,
      company_address,
      company_phone,
      company_email,
      work_number,
      work_site_phone,
      plocation,
      notes,
      start_date,
      end_date,
    }),
  insertIntoSequence: (
    item: string,
    prev_item: string | null,
    start_item: string | null
  ) => authPost(API.stringing, { item, prev_item, start_item }),

  getStrungPipesInfo: (pipes: Array<string | number>) => {
    return authGet(API.getStrungPipesInfo, pipes.join("_"));
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

  getCuttingEligiblePipes: () => authGet(API.getCuttingEligiblePipes, ""),

  getPipeLength: (id: string) => authPost(API.getPipeLength, { id }),

  /**
   *
   * @param pipe id of pipe to be cut
   * @param cut_length length of the new cut
   * @returns
   */
  cutPipe: (pipe: string, cut_length: number) =>
    authPost(API.cutPipe, { id: pipe, cutLength: cut_length }),

  // Fittings
  getFittings: () => {
    return authGet(API.getFittings, "");
  },

  addFitting: (data: any) => {
    return authPost(API.getFittings, data);
  },

  getItemInfo: (item: string) => {
    item = item.toUpperCase();
    if (!new RegExp("F_.*").test(item)) item = "P_" + item;
    return authGet(API.getItemInfo, item);
  },

  getStrungItemsInfo: (items: Array<string>) => {
    return authGet(API.getStrungItemsInfo, items.join("-"));
  },
  //bend
  getBend: () => {
    return authGet(API.bendPipe, "");
  },

  postBend: (data: any) => {
    return authPost(API.bendPipe, data);
  },

  updateBend: (data: any) => {
    return authPut(API.bendPipe, data);
  },

  removeBend: (bend_id: string) => {
    return authDelete(`${API.bendPipe}/${bend_id}`);
  },

  usersInProject: () => {
    return authGet(API.usersInProject, "");
  },

  allUsers: () => {
    return authGet(API.getAllUsers, "");
  },

  addUserToProject: (user: any) => {
    return authPost(API.projUser, user);
  },

  removeUserFromProject: (user: string) => {
    return authDelete(`${API.projUser}/${user}`);
  },

  getAggreate: () => {
    return authGet(API.aggreate, "");
  },

  getWelding: () => authGet(API.welding, ""),

  updateWelding: (data: any) => authPut(API.welding, data),
  createWeld: (data: any) => authPost(API.welding, data),
};
