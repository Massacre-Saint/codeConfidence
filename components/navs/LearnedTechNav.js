import React from 'react';
import PropTypes from 'prop-types';
import SortGoalsAndTopics from '../buttons/SortGoalsAndTopics';

export default function LearnedTechNav({
  handleShowAll, goals, topics,
}) {
  return (
    <div className="flex-row space-between">
      <SortGoalsAndTopics
        handleShowAll={handleShowAll}
        goals={goals}
        topics={topics}
      />
    </div>
  );
}

LearnedTechNav.propTypes = {
  handleShowAll: PropTypes.func.isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
};
