/* eslint-disable eqeqeq */
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

const getFilteredGoalsByTech = (user, querySet, lTech) => new Promise((resolve, reject) => {
  let queryString = '';
  const progressPercentage = querySet.filter((i) => i === '25' || i === '50' || i === '75');
  if (progressPercentage.length > 0) {
    if (querySet.length > 1) {
      queryString += `progress=${parseInt(progressPercentage, 10)}&`;
    } else {
      queryString += `progress=${parseInt(progressPercentage, 10)}`;
    }
  }
  const genericFilters = querySet.filter((i) => i != progressPercentage);
  queryString += `${genericFilters.join('&')}`;
  fetch(`${dbUrl}/goals/filter?l_tech=${lTech}&${queryString}`, {
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

const getAllFilteredGoals = (user, querySet) => new Promise((resolve, reject) => {
  let queryString = '';
  const progressPercentage = querySet.filter((i) => i === '25' || i === '50' || i === '75');
  if (progressPercentage.length > 0) {
    if (querySet.length > 1) {
      queryString += `progress=${parseInt(progressPercentage, 10)}&`;
    } else {
      queryString += `progress=${parseInt(progressPercentage, 10)}`;
    }
  }
  const genericFilters = querySet.filter((i) => i != progressPercentage);
  queryString += `${genericFilters.join('&')}`;
  fetch(`${dbUrl}/goals/all_filter?${queryString}`, {
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

const getAllGoals = (user) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/goals`, {
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

const getSingleGoal = (pk) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/goals/${pk}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        title: data.title,
        progress: data.progress,
        lastUpdated: data.last_updated,
        learnedTech: data.learned_tech,
        uid: data.uid,
      });
    })
    .catch((error) => reject(error));
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
  const lTechId = data.learnedTech.id;
  fetch(`${dbUrl}/goals/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: data.title,
      learned_tech: lTechId,
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
  getGoals, getSingleGoal, createGoal, updateGoal, deleteGoal, getAllGoals, getFilteredGoalsByTech, getAllFilteredGoals,
};
