import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GoalList from './GoalList';
import TopicList from './TopicList';
import SearchBar from '../SearchBar';
import FilterModal from '../modals/FilterModal';

export default function CondionalListContainer({
  showingGoals, goals, topics, onUpdate, handleClose, edit, resources,
}) {
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);

  useEffect(() => {
    setFilteredGoals(goals);
    setFilteredTopics(topics);
  }, [goals, topics]);

  if (showingGoals) {
    return (
      <div className="center">
        <div className="space-between margin-sides">
          <SearchBar array={goals} setArray={setFilteredGoals} />
          <FilterModal
            goals={goals}
            setFilteredGoals={setFilteredGoals}
            setFilteredTopics={setFilteredTopics}
          />
        </div>
        <div className="bottom-border-inset" />
        <div className="show-all-list-container">
          <GoalList
            goals={filteredGoals}
            onUpdate={onUpdate}
            handleClose={handleClose}
            edit={edit}
            topics={topics}
            resources={resources}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="center">
      <div className="space-between margin-sides">
        <SearchBar array={topics} setArray={setFilteredTopics} />
        <FilterModal
          goals={goals}
          topics={topics}
          setFilteredGoals={setFilteredGoals}
          setFilteredTopics={setFilteredTopics}
        />
      </div>
      <div className="bottom-border-inset" />
      <div className="show-all-list-container">
        <TopicList
          topics={filteredTopics}
          goals={goals}
          onUpdate={onUpdate}
          handleClose={handleClose}
          edit={edit}
          resources={resources}
        />
      </div>
    </div>
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
