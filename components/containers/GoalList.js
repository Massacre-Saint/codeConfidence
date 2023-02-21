import React from 'react';
import PropTypes from 'prop-types';
import { GoalCard } from './cards';

export default function GoalList({
  goals, onUpdate, handleClose,
}) {
  return (
    <div className="list_spacing">
      {goals.map((i) => (
        <GoalCard
          key={i.id}
          obj={i}
          onUpdate={onUpdate}
          handleClose={handleClose}
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
};
