import {Get} from '../../handler';
import {CreateOptionsUrl} from '../../_config/api';

export const GetMovieListByGenre = (genre, page = 1) => {
  return async (d, gs) => {
    try {
      const requestOptions = {
        language: 'en-US',
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        page: page,
        with_genres: genre,
      };
      const param = {
        method: 'discover/movie',
        options: CreateOptionsUrl(requestOptions),
      };
      console.log(param);
      const resp = await Get(param);
      console.log(resp);
    } catch (error) {
      console.warn('action/genres: GetMovieGenres: error:', error);
    }
  };
};
export const GetMovieDetails = id => {
  return async (d, gs) => {
    try {
      const requestOptions = {
        language: 'en-US',
      };
      const param = {
        method: 'movie/' + id,
        options: CreateOptionsUrl(requestOptions),
      };
      // console.log(param);
      const resp = await Get(param);
      if (resp.success === false) {
        throw new Error(resp.status_message);
      }
      return resp;
    } catch (error) {
      console.warn('action/genres: GetMovieGenres: error:', error);
      return Promise.reject(error);
    }
  };
};
export const GetReletedMovie = id => {
  return async (d, gs) => {
    try {
      const requestOptions = {
        language: 'en-US',
      };
      const param = {
        method: ['movie', id, 'similar'].join('/'),
        options: CreateOptionsUrl(requestOptions),
      };
      // console.log(param);
      const resp = await Get(param);
      if (resp.success === false) {
        throw new Error(resp.status_message);
      }
      return resp;
    } catch (error) {
      console.warn('action/genres: GetMovieGenres: error:', error);
      return Promise.reject(error);
    }
  };
};
