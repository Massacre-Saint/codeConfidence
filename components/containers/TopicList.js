import React from 'react';
import PropTypes from 'prop-types';
import TopicCard from './cards/TopicCard';
import EmptyState from './EmptyState';

export default function TopicList({
  topics,
}) {
  if (topics.length === 0) {
    return (
      <div>
        <EmptyState searchEmpty />
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
