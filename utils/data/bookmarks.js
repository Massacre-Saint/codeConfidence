import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const importBookmarks = () => new Promise((resolve, reject) => {
  fetch('bookmarks/cc_bookmark_data.json')
    .then((response) => response.json())
    .then((data) => {
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
    })
    .catch(reject);
});

const createBookmarks = (data) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/bookmarks`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const updateBookmark = (id, data) => new Promise((resolve, reject) => {
  const requestBody = {
    index: data.index,
    parent_id: data.parentId,
    title: data.title,
    url: data.url,
  };

  if (data.url) {
    requestBody.url = data.url;
  }
  fetch(`${dbUrl}/bookmarks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(requestBody),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});

const deleteBookmark = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/bookmarks/${id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});
export {
  importBookmarks, getBookmarks, createBookmarks, updateBookmark, deleteBookmark,
};
