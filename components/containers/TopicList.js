import React from 'react';
import PropTypes from 'prop-types';
import TopicCard from './cards/TopicCard';

export default function TopicList({
  topics, onUpdate, handleClose, goals,
}) {
  return (
    <div className="list_spacing">
      {topics.map((i) => (
        <TopicCard
          key={i.id}
          obj={i}
          onUpdate={onUpdate}
          handleClose={handleClose}
          goals={goals}
        />
      ))}
    </div>
  );
}

TopicList.propTypes = {
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
