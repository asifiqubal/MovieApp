import {Get} from '../../handler';
import {CreateOptionsUrl} from '../../_config/api';

export const DiscoverFromTMDB = (type, page = 1) => {
  return async (d, gs) => {
    try {
      const requestOptions = {
        language: 'en-US',
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        page: page,
      };
      const param = {
        method: type,
        options: CreateOptionsUrl(requestOptions),
      };
      // console.log(param);
      const resp = await Get(param);
      if (!resp.results) {
        throw new Error('');
      }
      return resp;
    } catch (error) {
      console.warn('action/genres: GetMovieGenres: error:', error);
    }
  };
};
