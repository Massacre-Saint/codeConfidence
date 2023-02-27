import React from 'react';
import PropTypes from 'prop-types';
import GoalCard from './cards/GoalCard';

export default function GoalList({
  goals, onUpdate, handleClose, edit,
}) {
  return (
    <div className="list_spacing">
      {goals.map((i) => (
        <GoalCard
          key={i.id}
          obj={i}
          handleClose={handleClose}
          onUpdate={onUpdate}
          edit={edit}
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
};
