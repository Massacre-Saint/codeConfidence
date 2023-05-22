import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import EmptyState from './EmptyState';
import RecentsList from './RecentsList';
import Loading from '../Loading';

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
      <div>
        <EmptyState />
      </div>
    );
  } return (
    <div className="stats">
      <Image
        src="/placeholder-chart.svg"
        width={130}
        height={130}
      />
      <h2>CLose this goal or topic?</h2>
      <div className="flex-row space-between_shift-down">
        <span className="sub-heading padding">
          Recent
        </span>
      </div>
      <div className="flex-row margin-l-md gap-col">
        <RecentsList list={[...goals, ...topics]} />
      </div>
      <div className="flex-row space-between_shift-down">
        <span className="sub-heading padding">
          Projects
        </span>
      </div>
      <div className="flex-row margin-l-md gap-col">
        <h2>Coming Soon</h2>
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
