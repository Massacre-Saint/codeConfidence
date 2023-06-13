import React from 'react';
import PropTypes from 'prop-types';
import GoalCard from './cards/GoalCard';

export default function GoalList({
  goals,
  topics,
  setAssignedTopicOrGoal,
  assignedTopicOrGoal,
  assigningBookmark,
}) {
  if (goals.length === 0) {
    return (
      <div className="list_spacing empty-list">
        <div>Nothing here</div>
      </div>
    );
  }
  return (
    <div className="list_spacing">
      {goals.map((i) => (
        <GoalCard
          key={i.id}
          obj={i}
          topics={topics}
          setAssignedTopicOrGoal={setAssignedTopicOrGoal}
          assignedTopicOrGoal={assignedTopicOrGoal}
          assigningBookmark={assigningBookmark}

        />
      ))}
    </div>
  );
}

GoalList.propTypes = {
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))),
  setAssignedTopicOrGoal: PropTypes.func,
  assignedTopicOrGoal: PropTypes.shape({
    id: PropTypes.string,
  }),
  assigningBookmark: PropTypes.bool,
};

GoalList.defaultProps = {
  topics: [],
  setAssignedTopicOrGoal: () => {},
  assignedTopicOrGoal: {},
  assigningBookmark: false,
};
