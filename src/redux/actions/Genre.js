import React from 'react';
import {Get} from '../../handler';

export const GetMovieGenres = () => {
  return async (d, gs) => {
    try {
      const param = {
        method: 'genre/movie/list',
      };
      const resp = await Get(param);
      //   console.log(resp);
      if (!resp.genres) {
        throw new Error(resp?.status_message || 'Genres Not Found!!!');
      }
      d(RDXUpdateMovieGenres(PreepGenres(resp.genres)));
      const refList = resp.genres.map(val => ({
        ...val,
        ref: React.createRef(),
      }));
      d(RDXUpdateMovieGenresList(refList));

      return {success: true};
    } catch (error) {
      console.warn('action/genres: GetMovieGenres: error:', error);
    }
  };
};

/**
 *
 * @returns
 */
export const GetTvGenres = () => {
  return async (d, gs) => {
    try {
      const param = {
        method: 'genre/tv/list',
      };
      const resp = await Get(param);
      console.log(resp);
    } catch (error) {
      console.warn('action/genres: GetMovieGenres: error:', error);
    }
  };
};

/**
 *
 * @param {[]} genreList
 * @returns
 */
function PreepGenres(genreList) {
  if (genreList?.length <= 0) {
    return {};
  }

  return genreList.reduce((acc, cur) => {
    acc[cur.id] = cur;
    return acc;
  }, {});
}

/**
 *
 * @param {genres list} payload
 * @returns
 */
const RDXUpdateMovieGenresList = payload => {
  return {
    type: 'genre:update-movie-list',
    payload,
  };
};

/**
 *
 * @param {genres object} payload
 * @returns
 */
const RDXUpdateMovieGenres = payload => {
  return {
    type: 'genre:update-movie',
    payload,
  };
};
