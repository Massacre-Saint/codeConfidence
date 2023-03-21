import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdArrowRoundForward } from 'react-icons/io';
import GoalCard from './GoalCard';

export default function GoalCardPreview({
  goals, onUpdate, handleClose, handleShowAll, resources,
}) {
  const [isPreview] = useState(true);
  return (
    <div className="goal_container">
      <div>
        <span className="header">
          <span>{goals.length}</span>
          &nbsp;
          <span>
            {goals.length > 1 || goals.length === 0
              ? ('Goals')
              : ('Goal')}
          </span>
        </span>
      </div>
      <div>
        <span className="header">
          <p>Most Recent:</p>
        </span>
        <div className="card_short-width">
          {goals.length === 0
            ? (
              <>
                <div className="card_spacing topic-goal_card_container">
                  <h3>No goals found.</h3>
                </div>
              </>
            )
            : (
              <>
                {goals.slice(0, 1).map((i) => (
                  <GoalCard
                    key={i.id}
                    obj={i}
                    onUpdate={onUpdate}
                    handleClose={handleClose}
                    preview={isPreview}
                    resources={resources}
                  />
                ))}
              </>

            )}
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
