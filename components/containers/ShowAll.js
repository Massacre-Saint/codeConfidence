import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GoalList from './GoalList';
import TopicList from './TopicList';
import SearchBar from '../SearchBar';
import ToggleButtons from '../navs/ToggleButtons';
import SortDropdown from '../buttons/SortDropdown';
import SortSearchDropdown from '../buttons/SortSearchDropdown';

export default function ShowAll({
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
      <div className="view-all_container">
        <div className="sub-nav-space-between">
          <div className="search-bar_container">
            <SearchBar array={goals} setArray={setFilteredGoals} />
          </div>
        </div>
        <div className="show-all_container">
          <div className="show-all_header">
            <div className="show-all_header-content">
              <ToggleButtons lTechGoals={goals} setFilteredGoals={setFilteredGoals} />
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
              onUpdate={onUpdate}
              handleClose={handleClose}
              edit={edit}
              topics={topics}
              resources={resources}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="view-all_container">
        <div className="sub-nav-space-between">
          <div className="search-bar_container">
            <SearchBar array={topics} setArray={setFilteredTopics} />
          </div>
        </div>
        <div className="show-all_container">
          <div className="show-all_header">
            <div className="show-all_header-content">
              <ToggleButtons lTechTopics={topics} setFilteredTopics={setFilteredTopics} />
            </div>
            <div className="show-all_header-content">
              <div>
                <SortDropdown array={topics} setArray={setFilteredTopics} />
              </div>
              <div>
                <SortSearchDropdown lTechGoals={goals} setFilteredTopics={setFilteredTopics} lTechTopics={topics} />
              </div>
            </div>
          </div>
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
      </div>
    </>
  );
}

ShowAll.propTypes = {
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
};
