import React from 'react';
import PropTypes from 'prop-types';
import GoalList from './GoalList';
import TopicList from './TopicList';

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
        className="show-all-list-container"
      >
        <GoalList goals={handleFilteredArray(jaggedArray)[0]} />
      </div>
    );
  } if (showingTopics) {
    return (
      <div
        className="show-all-list-container"
      >
        <TopicList topics={handleFilteredArray(jaggedArray)[1]} />
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
