/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import LearnedTechCard from './cards/LearnedTechCard';
import RecentsList from './RecentsList';

export default function LearnedTechView({ tech, arrays }) {
  const router = useRouter();

  const handleClick = (obj) => {
    router.push({
      pathname: `/lTech/${obj.id}`,
      query: { tech: obj.tech.id },
    });
  };

  return (
    <>
      <div className="tech-view_container">
        <div className="flex-row space-between_shift-down">
          <span className="sub-heading">
            Your Skillset
          </span>
          {/* <span className="sub-heading-sm">
            Expand
          </span> */}
        </div>
        <div className="tech_flex-container">
          {tech.map((i) => (
            <LearnedTechCard handleClick={handleClick} key={i.id} obj={i} />
          ))}
        </div>
        <div className="flex-row space-between_shift-down">
          <span className="sub-heading padding">
            Goals
          </span>
          <span className="sub-heading-sm padding">
            Expand
          </span>
        </div>
        <div className="flex-row margin-l-md gap-col">
          <RecentsList list={[...arrays[0]]} />
        </div>
        <div className="flex-row space-between_shift-down">
          <span className="sub-heading padding">
            Topics
          </span>
          <span className="sub-heading-sm padding">
            Expand
          </span>
        </div>
        <div className="flex-row margin-l-md gap-col">
          <RecentsList list={[...arrays[1]]} />
        </div>
      </div>
    </>
  );
}

LearnedTechView.propTypes = {
  tech: PropTypes.arrayOf((PropTypes.shape({
    techObj: PropTypes.shape({
      id: PropTypes.number,
    }),
  }))).isRequired,
  arrays: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.shape),
  ).isRequired,
};
