import { authGet, post, authPost, authPut, get } from './request';
import { API } from './routes';

export default {
  getPOC: () => {
    return get(API.poc);
  },

  postPOC: (data: { name: string; phone: string }) => {
    return post(API.poc, data);
  },
};
