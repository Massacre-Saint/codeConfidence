import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import LearnedTechCard from './cards/LearnedTechCard';

export default function LearnedTechView({ tech }) {
  const router = useRouter();
  const handleClick = (obj) => {
    router.push(`/lTech/${obj.id}`);
  };
  return (
    <>
      <h1>Learned Tech</h1>
      <div>
        {tech.map((i) => (
          <LearnedTechCard handleClick={handleClick} key={i.id} obj={i} />
        ))}
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
