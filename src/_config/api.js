export const api = {
  base_url: 'https://api.themoviedb.org/3/',
  apiKey: 'cd890f94a756b1518a2a17617a5b430e',
  img_url: 'https://image.tmdb.org/t/p/w500/',
  imdb_url: 'https://www.imdb.com/title/',
};

export const LANG_US = 'language=en-US';
export const SORT_DESC = 'sort_by=popularity.desc';
export const SORT_ASC = 'sort_by=popularity.asc';
export const INC_ADULT = 'include_adult=false';
export const INC_VIDEO = 'include_video=true';

export function CreateFormData(body) {
  const data = new FormData();

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
}
export function CreateOptionsUrl(options) {
  const optionsArray = Object.keys(options).map(key => {
    return [key, options[key]].join('=');
  });

  return optionsArray.join('&');
}
