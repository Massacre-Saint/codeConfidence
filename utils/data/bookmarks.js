import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const importBookmarks = () => new Promise((resolve, reject) => {
  fetch('bookmarks/cc_bookmark_data.json')
    .then((response) => response.json())
    .then((data) => {
      console.warn(data);

      fetch(`${dbUrl}/bookmarks`, {
        method: 'POST',
        body: JSON.stringify(data[0]),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => resolve(response.json()))
        .catch(reject);
    })
    .catch(reject);
});

const getBookmarks = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/bookmarks`)
    .then((response) => response.json())
    .then((data) => {
      const transformedData = data.map((obj) => {
        const {
          id,
          index,
          parent_id: parentId,
          title,
          url,
        } = obj;
        return {
          id,
          index,
          parentId,
          title,
          url,
        };
      });
      resolve(transformedData);
      console.warn(transformedData);
    })
    .catch(reject);
});

export const deleteBookmark = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/bookmarks/${id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});
export { importBookmarks, getBookmarks };
