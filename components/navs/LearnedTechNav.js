import React from 'react';
import PropTypes from 'prop-types';
import SortGoalsAndTopics from '../buttons/SortGoalsAndTopics';
import CreateDropdown from '../buttons/CreateDropdown';

export default function LearnedTechNav({
  handleShowAll, handleShow, goals, topics,
}) {
  return (
    <div className="flex-row space-between">
      <SortGoalsAndTopics
        handleShowAll={handleShowAll}
        goals={goals}
        topics={topics}
      />
      <CreateDropdown
        handleShow={handleShow}
      />
    </div>
  );
}

LearnedTechNav.propTypes = {
  handleShowAll: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
};
