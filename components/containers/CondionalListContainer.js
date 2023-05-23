import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TopicListContainer from './TopicListContainer';
import GoalListContainer from './GoalListContainer';

export default function CondionalListContainer({
  showingGoals,
  goals,
  topics,
  onUpdate,
  handleClose,
  edit,
  resources,
  lTech,
}) {
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);

  useEffect(() => {
    setFilteredGoals(goals);
    setFilteredTopics(topics);
  }, [goals, topics]);

  if (showingGoals) {
    return (
      <GoalListContainer
        topics={topics}
        goals={goals}
        resources={resources}
        setFilteredGoals={setFilteredGoals}
        setFilteredTopics={setFilteredTopics}
        filteredGoals={filteredGoals}
        onUpdate={onUpdate}
        handleClose={handleClose}
        edit={edit}
        lTech={lTech}
      />
    );
  }
  return (
    <TopicListContainer
      topics={topics}
      goals={goals}
      resources={resources}
      setFilteredTopics={setFilteredTopics}
      filteredTopics={filteredTopics}
      onUpdate={onUpdate}
      handleClose={handleClose}
      edit={edit}
      lTech={lTech}
    />
  );
}

CondionalListContainer.propTypes = {
  showingGoals: PropTypes.bool.isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  resources: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    bookmark: PropTypes.shape({
      id: PropTypes.number,
    }),
    objectId: PropTypes.shape({
      id: PropTypes.string,
    }),
    tech: PropTypes.shape({
      id: PropTypes.number,
    }),
  }))).isRequired,
  lTech: PropTypes.shape({
    tech: PropTypes.shape({
      docUrl: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};
