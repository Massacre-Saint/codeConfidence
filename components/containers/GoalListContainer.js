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
  lTech,
}) {
  return (
    <div className="center">
      <div className="space-between margin-sides">
        <SearchBar array={goals} setArray={setFilteredGoals} />
        <FilterModal
          goals={goals}
          setFilteredGoals={setFilteredGoals}
          setFilteredTopics={setFilteredTopics}
          lTech={lTech}
        />
      </div>
      <div className="bottom-border-inset" />
      <div className="margin-top-md">
        <GoalList
          goals={filteredGoals}
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
  lTech: PropTypes.shape({
    tech: PropTypes.shape({
      docUrl: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};

GoalListContainer.defaultProps = {
  lTech: {},
};
