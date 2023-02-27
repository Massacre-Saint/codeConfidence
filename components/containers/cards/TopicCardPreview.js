import React from 'react';
import PropTypes from 'prop-types';
import { IoMdArrowRoundForward } from 'react-icons/io';
import TopicCard from './TopicCard';

export default function TopicCardPreview({
  topics, goals, onUpdate, handleClose, handleShowAll,
}) {
  return (
    <div className="goal_container">
      <div>
        <span className="header">
          <p>{topics.length} Topics</p>
        </span>
      </div>
      <div>
        <span className="header">
          <p>Most Recent:</p>
        </span>
        <div className="card_short-width">
          {topics.slice(0, 1).map((i) => (
            <TopicCard
              key={i.id}
              obj={i}
              onUpdate={onUpdate}
              handleClose={handleClose}
              goals={goals}
            />
          ))}
        </div>
      </div>
      <div className="header">
        <span>
          <button id="topics" type="button" onClick={(e) => handleShowAll(e)}>
            Show Topics
            <IoMdArrowRoundForward />
          </button>
        </span>
      </div>
    </div>
  );
}

TopicCardPreview.propTypes = {
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleShowAll: PropTypes.func.isRequired,
};
