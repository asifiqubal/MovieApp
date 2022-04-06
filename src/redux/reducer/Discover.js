import React from 'react';

/**
 */
export default (
  state = {
    tabList: [
      {
        id: 'discover_movie_tab',
        name: 'Movies',
        url: 'discover/movie',
        ref: React.createRef(),
        type: 'movie',
      },
      {
        id: 'discover_tv_tab',
        name: 'Tv Series',
        url: 'discover/tv',
        ref: React.createRef(),
        type: 'tv',
      },
    ],
  },
  action,
) => {
  switch (action.type) {
    case 'genre:update-movie':
      return {...state, movie: action.payload};

    case 'genre:update-movie-list':
      return {...state, movieList: action.payload};

    case 'genre:update-tv':
      return {...state, tv: action.payload};

    case 'genre:update-tv-list':
      return {...state, tvList: action.payload};

    default:
      return state;
  }
}; // export default
