import React from 'react';
import PropTypes from 'prop-types';

export default function GoalCard({ goal }) {
  return (
    <div>
      <p>{goal.title}</p>
    </div>
  );
}

GoalCard.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
