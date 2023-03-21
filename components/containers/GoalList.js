import React from 'react';
import PropTypes from 'prop-types';
import GoalCard from './cards/GoalCard';

export default function GoalList({
  goals, onUpdate, handleClose, edit, resources, topics,
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
          handleClose={handleClose}
          onUpdate={onUpdate}
          edit={edit}
          topics={topics}
          resources={resources}
        />
      ))}
    </div>
  );
}

GoalList.propTypes = {
  goals: PropTypes.arrayOf((PropTypes.shape({
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
  }))),
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))),
};

GoalList.defaultProps = {
  topics: [],
  resources: [],
};
