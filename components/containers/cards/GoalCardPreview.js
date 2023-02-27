import React from 'react';
import PropTypes from 'prop-types';
import { IoMdArrowRoundForward } from 'react-icons/io';
import GoalCard from './GoalCard';

export default function GoalCardPreview({
  goals, onUpdate, handleClose, handleShowAll,
}) {
  return (
    <div className="goal_container">
      <div>
        <span className="header">
          <p>{goals.length} Goals</p>
        </span>
      </div>
      <div>
        <span className="header">
          <p>Most Recent:</p>
        </span>
        <div className="card_short-width">
          {goals.slice(0, 1).map((i) => (
            <GoalCard
              key={i.id}
              obj={i}
              onUpdate={onUpdate}
              handleClose={handleClose}
            />
          ))}
        </div>
      </div>
      <div className="header">
        <span>
          <button id="goals" type="button" onClick={(e) => handleShowAll(e)}>
            Show Goals
            <IoMdArrowRoundForward />
          </button>
        </span>
      </div>
    </div>
  );
}

GoalCardPreview.propTypes = {
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleShowAll: PropTypes.func.isRequired,
};
