import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getResources = (assignedTo) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/resources`)
    .then((response) => response.json())
    .then((data) => {
      const transformedData = data.map((obj) => {
        const {
          id,
          title,
          bookmark,
          object_id: objectId,
          learned_tech: learnedTech,
          last_updated: lastUpdated,
        } = obj;
        const assignedEntity = assignedTo.find((object) => object.id === objectId);
        return {
          id,
          title,
          bookmark,
          objectId: assignedEntity,
          learnedTech,
          lastUpdated,
        };
      });
      resolve(transformedData);
    })
    .catch(reject);
});
const createResource = (data) => new Promise((resolve, reject) => {
  const requestBody = {
    bookmark: data.bookmark,
    title: data.title,
    learned_tech: data.learnedTech,
  };
  if (data.assignedTo) {
    requestBody.assigned_to = data.assignedTo.id;
  }
  fetch(`${dbUrl}/resources`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});
const updateResource = (data) => new Promise((resolve, reject) => {
  const requestBody = {
    bookmark: data.bookmark.id,
    title: data.title,
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
const deleteResource = (data) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/resources/${data.id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});
export {
  getResources, createResource, updateResource, deleteResource,
};
