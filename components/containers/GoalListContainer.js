import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import GoalList from './GoalList';
import FilterModal from '../modals/FilterModal';

function GoalListContainer({
  topics,
  goals,
  resources,
  setFilteredGoals,
  setFilteredTopics,
  filteredGoals,
  onUpdate,
  handleClose,
  edit,
}) {
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

export default GoalListContainer;

GoalListContainer.propTypes = {
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
  setFilteredGoals: PropTypes.func.isRequired,
  setFilteredTopics: PropTypes.func.isRequired,
  filteredGoals: PropTypes.arrayOf((
    PropTypes.shape({
    })
  )).isRequired,
};
