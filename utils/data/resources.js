import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getResources = (assignedTo) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/resources`)
    .then((response) => response.json())
    .then((data) => {
      const transformedData = data.map((obj) => {
        const {
          id,
          bookmark,
          object_id: objectId,
          tech,
        } = obj;
        const assignedEntity = assignedTo.find((object) => object.id === objectId);
        return {
          id,
          bookmark,
          objectId: assignedEntity,
          tech,
        };
      });
      resolve(transformedData);
    })
    .catch(reject);
});

const updateResource = (data) => new Promise((resolve, reject) => {
  console.warn(data);
  const requestBody = {
    bookmark: data.bookmark.id,
    tech: data.tech.id,
  };

  if (data.objectId) {
    requestBody.object_id = data.objectId.id;
  }
  fetch(`${dbUrl}/resources/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});
export { getResources, updateResource };
