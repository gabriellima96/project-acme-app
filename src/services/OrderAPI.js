const api = 'http://localhost:8080/api/v1';

export const create = body => fetch(`${api}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then(res => res.json());
