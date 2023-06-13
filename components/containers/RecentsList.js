import React from 'react';
import PropTypes from 'prop-types';
import { GoalCard } from './cards';
import TopicCard from './cards/TopicCard';
import ResourceCard from './cards/ResourceCard';

function RecentsList({ list }) {
  const joinedArray = [].concat(...list);
  const recentList = joinedArray.sort((a, b) => {
    const dateA = new Date(a.lastUpdated);
    const dateB = new Date(b.lastUpdated);
    return dateB - dateA;
  });
  return (
    <>
      {recentList.slice(0, 5).map((i) => {
        if (i.bookmark) {
          return (
            <ResourceCard
              key={i.id}
              obj={i}
              preview
            />
          );
        }
        if (i.progress !== undefined) {
          return (
            <GoalCard
              key={i.id}
              obj={i}
              preview
            />
          );
        }
        return (
          <TopicCard
            key={i.id}
            obj={i}
            preview
          />
        );
      })}
    </>
  );
}

export default RecentsList;

RecentsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape,
  ).isRequired,
};
