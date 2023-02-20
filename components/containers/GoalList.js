import React from 'react';
import PropTypes from 'prop-types';
import { GoalCard } from './cards';

export default function GoalList({ goals }) {
  return (
    <div className="list_spacing">
      {goals.map((i) => (
        <GoalCard key={i.id} obj={i} />
      ))}
    </div>
  );
}

GoalList.propTypes = {
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
};
