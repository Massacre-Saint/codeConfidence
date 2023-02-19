import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

// const getLearnedTech = (user, techList) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/l_tech`, {
//     headers: {
//       Authorization: user.uid,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const transformedData = data.map((obj) => {
//         const {
//           id,
//           last_updated: lastUpdated,
//           tech,
//           uid,
//         } = obj;

//         return {
//           id,
//           lastUpdated,
//           tech,
//           uid,
//         };
//       });
//       resolve(transformedData);
//     })
//     .catch(reject);
// });
const getLearnedTech = (user, techList) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/l_tech`, {
    headers: {
      Authorization: user.uid,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const transformedData = data.map((obj) => {
        const {
          id,
          last_updated: lastUpdated,
          tech: { id: techId },
          uid,
        } = obj;
        const convertedTech = techList.find((tech) => tech.id === techId);
        return {
          id,
          lastUpdated,
          tech: convertedTech,
          uid,
        };
      });
      resolve(transformedData);
    })
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

const getSingleLearnedTech = (pk, user, techObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/l_tech/${pk}`, {
    headers: {
      Authorization: user.uid,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        uid: data.uid,
        tech: techObj,
      });
    })
    .catch((error) => reject(error));
});
export { getLearnedTech, createLearnedTech, getSingleLearnedTech };
