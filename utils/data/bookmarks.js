import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getBookmarks = (user) => new Promise((resolve, reject) => {
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
          Authorization: user.uid,
        },
      })
        .then((response) => resolve(response.json()))
        .catch(reject);
    })
    .catch(reject);
});

export default getBookmarks;
