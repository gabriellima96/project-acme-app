const api = 'http://localhost:8080/api/v1';

export const create = body => fetch(`${api}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then(res => res.json());

function getQueryString(params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
}

export const getAll = (dataParams) => {
  let params = '?';
  if (dataParams) {
    params += getQueryString(dataParams);
  } else {
    params += 'size=4&page=0&sort=status,asc';
  }

  return fetch(`${api}/orders${params}`).then(res => res.json());
};
