import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/checkuser`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .then((data) => {
      resolve({
        displayName: data.display_name,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
        createdOn: data.created_on,
        isAdmin: data.is_admin,
        bio: data.bio,
        email: data.email,
        uid: data.uid,
        id: data.id,
      });
    })
    .catch(reject);
});

const registerUser = (userInfo) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/register`, {
    method: 'POST',
    body: JSON.stringify({
      display_name: userInfo.displayName,
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
      bio: userInfo.bio,
      image_url: userInfo.imageUrl,
      email: userInfo.email,
      uid: userInfo.uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

export {
  checkUser,
  registerUser,
};
