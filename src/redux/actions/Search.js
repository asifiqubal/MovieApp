import {Get} from '../../handler';
import {CreateOptionsUrl} from '../../_config/api';

export const SearchMulti = (text, page = 1) => {
  return async (d, gs) => {
    try {
      const requestOptions = {
        language: 'en-US',
        query: text,
        page: page,
        include_adult: false,
      };
      const param = {
        method: 'search/multi',
        options: CreateOptionsUrl(requestOptions),
      };
      //   console.log(param);
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
