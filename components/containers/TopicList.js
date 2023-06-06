import React from 'react';
import PropTypes from 'prop-types';
import TopicCard from './cards/TopicCard';

export default function TopicList({
  topics,
}) {
  if (topics.length === 0) {
    return (
      <div className="list_spacing empty-list">
        <div>Nothing here</div>
      </div>
    );
  }
  return (
    <div className="list_spacing">
      {topics.map((i) => (
        <TopicCard
          key={i.id}
          obj={i}
        />
      ))}
    </div>
  );
}

TopicList.propTypes = {
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
};
