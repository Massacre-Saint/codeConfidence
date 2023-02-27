import React from 'react';
import PropTypes from 'prop-types';
import GoalList from './GoalList';
import TopicList from './TopicList';

export default function ShowAll({
  showingGoals, goals, topics, onUpdate, handleClose, edit,
}) {
  if (showingGoals) {
    return (
      <div className="show-all_container">
        <div>
          <div>
            <p>
              Goals
            </p>
          </div>
          <div>
            <GoalList
              goals={goals}
              onUpdate={onUpdate}
              handleClose={handleClose}
              edit={edit}

            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="show-all_container">
        <div>
          <p>
            Topics
          </p>
          <div>
            <TopicList
              topics={topics}
              goals={goals}
              onUpdate={onUpdate}
              handleClose={handleClose}
              edit={edit}
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
};
