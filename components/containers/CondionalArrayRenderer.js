import React from 'react';
import PropTypes from 'prop-types';
import RecentsList from './RecentsList';

function CondionalArrayRenderer(
  {
    jaggedArray,
    showingGoals,
    showingTopics,
  },
) {
  const handleFilteredArray = (array) => {
    const goals = [];
    const topics = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].progress !== undefined) {
        goals.push(array[i]);
      } else {
        topics.push(array[i]);
      }
    }

    const combinedArray = [goals, topics];
    return combinedArray;
  };

  if (showingGoals) {
    return (
      <div
        className="list_spacing show-all-list-container"
      >
        <RecentsList list={handleFilteredArray(jaggedArray)[0]} />
      </div>
    );
  } if (showingTopics) {
    return (
      <div
        className="list_spacing show-all-list-container"
      >
        <RecentsList list={handleFilteredArray(jaggedArray)[1]} />
      </div>
    );
  }
  return (
    <div>SHowing Resources</div>
  );
}

export default CondionalArrayRenderer;

CondionalArrayRenderer.propTypes = {
  jaggedArray: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  ).isRequired,
  showingGoals: PropTypes.bool,
  showingTopics: PropTypes.bool,
};

CondionalArrayRenderer.defaultProps = {
  showingGoals: false,
  showingTopics: false,
};
