import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getLearnedTech = (user) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/l_tech`, {
    headers: {
      Authorization: user.uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createLearnedTech = (data, user) => {
  const requests = data.map((item) => {
    const lTech = {
      tech: item.id,
    };
    return fetch(`${dbUrl}/l_tech`, {
      method: 'POST',
      body: JSON.stringify(lTech),
      headers: {
        'content-type': 'application/json',
        Authorization: user.uid,
      },
    });
  });

  return Promise.all(requests)
    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .catch((error) => console.error(error));
};

export { getLearnedTech, createLearnedTech };
