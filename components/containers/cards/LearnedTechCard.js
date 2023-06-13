/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import TechImage from '../../icons/TechImage';

export default function LearnedTechCard({ handleClick, obj }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick(obj);
    }
  };
  return (
    <div
      className="tech_card"
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onClick={() => handleClick(obj)}
    >
      <TechImage obj={obj.tech} />
    </div>
  );
}

LearnedTechCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    lastUpdated: PropTypes.string,
    image_url: PropTypes.string,
    tech: PropTypes.shape({
      imageUrl: PropTypes.string,
    }).isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
