import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getTopics = (user, object) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/topics?l_tech=${object.id}`, {
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
          description,
          last_updated: lastUpdated,
          learned_tech: learnedTech,
          uid,
          goal,
          completed,
        } = obj;
        return {
          id,
          title,
          description,
          lastUpdated,
          learnedTech,
          uid,
          goal,
          completed,
        };
      });
      resolve(transformedData);
    })
    .catch(reject);
});
const getFilteredTopicsByTech = (user, querySet, lTech) => new Promise((resolve, reject) => {
  let queryString = '';
  const uuid = querySet.filter((i) => i.length > 20);
  if (uuid.length > 0) {
    if (querySet.length > 1) {
      queryString += `goalId=${uuid}&`;
    } else {
      queryString += `goalId=${uuid}`;
    }
  }
  const genericFilters = querySet.filter((i) => i.length < 20);
  queryString += `${genericFilters.join('&')}`;

  fetch(`${dbUrl}/topics/filter?l_tech=${lTech}&${queryString}`, {
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
          description,
          last_updated: lastUpdated,
          learned_tech: learnedTech,
          uid,
          goal,
          completed,
        } = obj;
        return {
          id,
          title,
          description,
          lastUpdated,
          learnedTech,
          uid,
          goal,
          completed,
        };
      });
      resolve(transformedData);
    })
    .catch(reject);
});

const getAllFilteredTopics = (user, querySet) => new Promise((resolve, reject) => {
  let queryString = '';
  const uuid = querySet.filter((i) => i.length > 20);
  if (uuid.length > 0) {
    if (querySet.length > 1) {
      queryString += `goalId=${uuid}&`;
    } else {
      queryString += `goalId=${uuid}`;
    }
  }
  const genericFilters = querySet.filter((i) => i.length < 20);
  queryString += `${genericFilters.join('&')}`;

  fetch(`${dbUrl}/topics/all_filter?${queryString}`, {
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
          description,
          last_updated: lastUpdated,
          learned_tech: learnedTech,
          uid,
          goal,
          completed,
        } = obj;
        return {
          id,
          title,
          description,
          lastUpdated,
          learnedTech,
          uid,
          goal,
          completed,
        };
      });
      resolve(transformedData);
    })
    .catch(reject);
});

const getAllTopics = (user) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/topics`, {
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
          description,
          last_updated: lastUpdated,
          learned_tech: learnedTech,
          uid,
          goal,
          completed,
        } = obj;
        return {
          id,
          title,
          description,
          lastUpdated,
          learnedTech,
          uid,
          goal,
          completed,
        };
      });
      resolve(transformedData);
    })
    .catch(reject);
});

const createTopic = (data, user) => new Promise((resolve, reject) => {
  const requestBody = {
    title: data.title,
    description: data.description,
    learned_tech: data.learnedTech,
    completed: false,
  };

  if (data.goal) {
    requestBody.goal = data.goal;
  }

  fetch(`${dbUrl}/topics`, {
    method: 'POST',
    headers: {
      Authorization: user.uid,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateTopic = (data, user) => new Promise((resolve, reject) => {
  const requestBody = {
    title: data.title,
    description: data.description,
    learned_tech: data.learnedTech,
    completed: data.completed,
  };

  if (data.goal) {
    requestBody.goal = data.goal;
  }

  fetch(`${dbUrl}/topics/${data.id}`, {
    method: 'PUT',
    headers: {
      Authorization: user.uid,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});
const deleteTopic = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/topics/${id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});
export {
  getTopics, createTopic, updateTopic, deleteTopic, getAllTopics, getFilteredTopicsByTech, getAllFilteredTopics,
};
