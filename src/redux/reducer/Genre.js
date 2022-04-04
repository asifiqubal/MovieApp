/**
 */
export default (
  state = {
    movie: {},
    movieList: [],
    tv: {},
    tvList: [],
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
