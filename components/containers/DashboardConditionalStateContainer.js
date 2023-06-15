import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EmptyState from './EmptyState';
import RecentsList from './RecentsList';
import Loading from '../Loading';
import DoughnutChart from '../DoughnutChart';

function DashboardConditionalStateContainer({ goals, topics }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (goals.length === 0 && topics.length === 0) {
    return (
      <div className="relative full-height">
        <EmptyState
          noGoalsOrTopics
        />
      </div>
    );
  } return (
    <div className="stats">
      <DoughnutChart goals={goals} topics={topics} />
      <div className="flex-row space-between_shift-down">
        <span className="sub-heading padding">
          Recent
        </span>
      </div>
      <div className="flex-row margin-l-md gap-col overflow-hidden right-fade">
        <RecentsList horizontal list={[...goals, ...topics]} />
      </div>
      <div className="flex-row space-between_shift-down">
        <span className="sub-heading padding">
          Projects
        </span>
      </div>
      <div className="flex-row margin-l-md gap-col">
        Coming Soon
      </div>
    </div>
  );
}

export default DashboardConditionalStateContainer;

DashboardConditionalStateContainer.propTypes = {
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
};
