import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getMessage = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/messages`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export default getMessage;
