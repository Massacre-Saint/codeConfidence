/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import LearnedTechCard from './cards/LearnedTechCard';

export default function LearnedTechView({ tech }) {
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
};
