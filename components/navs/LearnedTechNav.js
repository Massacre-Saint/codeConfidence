import React from 'react';
import PropTypes from 'prop-types';
import SortBtnGroup from '../buttons/SortBtnGroup';

export default function LearnedTechNav({
  handleShowAll, goals, topics,
}) {
  const radioGroup = [
    { name: 'Goals', value: '1' },
    { name: 'Topics', value: '2' },
  ];
  return (
    <div className="flex-row space-between">
      <SortBtnGroup
        radioGroup={radioGroup}
        handleFilter={handleShowAll}
        filteredArray={[goals, topics]}
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
