import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoalCard } from './cards';
import TopicCard from './cards/TopicCard';

function RecentsList({ list }) {
  const recentList = list.sort((a, b) => a.lastUpdated - b.lastUpdated);
  useEffect(() => {
    console.warn(list);
  });
  return (
    <>
      {recentList.slice(0, 3).map((i) => {
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
  list: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string.isRequired,
  }))).isRequired,
};
