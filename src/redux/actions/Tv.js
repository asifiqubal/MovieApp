import {Get} from '../../handler';
import {CreateOptionsUrl} from '../../_config/api';
export const GetTvShowDetails = id => {
  return async (d, gs) => {
    try {
      const requestOptions = {
        language: 'en-US',
      };
      const param = {
        method: 'tv/' + id,
        options: CreateOptionsUrl(requestOptions),
      };
      // console.log(param);
      const resp = await Get(param);
      if (resp.success === false) {
        throw new Error(resp.status_message);
      }
      return resp;
    } catch (error) {
      console.warn('action/tv: GetTvShowDetails: error:', error);
      return Promise.reject(error);
    }
  };
};
export const GetReletedTvShows = id => {
  return async (d, gs) => {
    try {
      const requestOptions = {
        language: 'en-US',
      };
      const param = {
        method: ['tv', id, 'similar'].join('/'),
        options: CreateOptionsUrl(requestOptions),
      };
      // console.log(param);
      const resp = await Get(param);
      if (resp.success === false) {
        throw new Error(resp.status_message);
      }
      return resp;
    } catch (error) {
      console.warn('action/tv: GetReletedTvShows: error:', error);
      return Promise.reject(error);
    }
  };
};
