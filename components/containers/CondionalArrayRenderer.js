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
  const [goals, topics] = jaggedArray;
  if (showingGoals) {
    return (
      <GoalList goals={goals} />
    );
  } if (showingTopics) {
    return (
      <TopicList topics={topics} />
    );
  } return (
    <div>Hello</div>
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
