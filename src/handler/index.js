import {api} from '../_config/api';

async function Get(p) {
  try {
    if (!p?.method) {
      throw new Error('Mothod not find!');
    }
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const response = await fetch(
      [
        api.base_url,
        p.method,
        '?api_key=',
        api.apiKey,
        p.options ? ['&', p.options].join('') : '',
      ].join(''),
      requestOptions,
    );
    // console.log(response);
    return await response.json();
  } catch (err) {
    return {err};
  }
} //Get

async function Post(p) {
  try {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: p.body,
    };

    const response = await fetch(
      [api.base_url, p.method].join('/'),
      requestOptions,
    );

    let json = await response.json();

    console.log('result', json);

    return {resp: {...json}, msg: 'ok'};
  } catch (err) {
    return {err};
  }
} //Post

export {Get, Post};
