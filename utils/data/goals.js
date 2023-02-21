import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getGoals = (user, object) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/goals?l_tech=${object.id}`, {
    headers: {
      Authorization: user.uid,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const transformedData = data.map((obj) => {
        const {
          id,
          title,
          progress,
          last_updated: lastUpdated,
          learned_tech: learnedTech,
          uid,
        } = obj;
        return {
          id,
          title,
          progress,
          lastUpdated,
          learnedTech,
          uid,
        };
      });
      resolve(transformedData);
    })
    .catch(reject);
});
const createGoal = (data, user) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/goals`, {
    method: 'POST',
    body: JSON.stringify({
      title: data.title,
      learned_tech: data.learnedTech,
    }),
    headers: {
      Authorization: user.uid,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});
const updateGoal = (data, user) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/goals/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: data.title,
      learned_tech: data.learnedTech,
    }),
    headers: {
      Authorization: user.uid,
      'content-type': 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});
const deleteGoal = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/goals/${id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});
export {
  getGoals, createGoal, updateGoal, deleteGoal,
};
