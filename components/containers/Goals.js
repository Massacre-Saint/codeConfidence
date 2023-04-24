import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SortDropdown from '../buttons/SortDropdown';
import StatusDropdown from '../buttons/StatusDropdown';
import SearchBar from '../SearchBar';
import GoalList from './GoalList';

function Goals({
  goals, setAssignedTopicOrGoal, assignedTopicOrGoal, assigningBookmark,
}) {
  const [filteredGoals, setFilteredGoals] = useState([]);
  useEffect(() => {
    setFilteredGoals(goals);
  }, [goals]);
  return (
    <div className="view-all_container">
      <div className="top-container block center">
        <div className="hero-font">Goals</div>
      </div>
      <div className="sub-nav-space-between" />
      <div className="show-all_container">
        <div className="show-all_header">
          <div className="show-all_header-content">
            <StatusDropdown lTechGoals={goals} setFilteredGoals={setFilteredGoals} />
          </div>
          <div className="search-bar_container">
            <SearchBar array={goals} setArray={setFilteredGoals} />
          </div>
          <div className="show-all_header-content">
            <div>
              <SortDropdown array={goals} setArray={setFilteredGoals} />
            </div>
          </div>
        </div>
        <div className="show-all-list-container">
          <GoalList
            goals={filteredGoals}
            setAssignedTopicOrGoal={setAssignedTopicOrGoal}
            assignedTopicOrGoal={assignedTopicOrGoal}
            assigningBookmark={assigningBookmark}
          />
        </div>
      </div>
    </div>
  );
}

export default Goals;

Goals.propTypes = {
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  setAssignedTopicOrGoal: PropTypes.func.isRequired,
  assignedTopicOrGoal: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  assigningBookmark: PropTypes.bool.isRequired,
};
