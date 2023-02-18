import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getTech = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/tech`)
    .then((response) => response.json())
    .then((data) => {
      const transformedData = data.map((obj) => {
        const {
          id,
          name,
          description,
          doc_url: docUrl,
          image_url: imageUrl,
        } = obj;
        return {
          id,
          name,
          description,
          docUrl,
          imageUrl,
        };
      });
      resolve(transformedData);
    })
    .catch(reject);
});

export default getTech;
