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

export default getLearnedTech;
