import React from 'react';
import PropTypes from 'prop-types';
import GoalCard from './cards/GoalCard';
import EmptyState from './EmptyState';

export default function GoalList({
  goals,
  resources,
  topics,
  setAssignedTopicOrGoal,
  assignedTopicOrGoal,
  assigningBookmark,
}) {
  if (goals.length === 0) {
    return (
      <div>
        <EmptyState searchEmpty />
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
          resources={resources}
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
  }))),
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
  resources: [],
  setAssignedTopicOrGoal: () => {},
  assignedTopicOrGoal: {},
  assigningBookmark: false,
};
