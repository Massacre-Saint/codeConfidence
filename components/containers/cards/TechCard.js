import React from 'react';
import PropTypes from 'prop-types';
import TechImage from '../../icons/TechImage';

export default function TechCard({ obj, isSelected, handleClick }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick(obj.id);
    }
  };
  return (
    <div
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onClick={() => handleClick(obj.id)}
      className={`tech_card ${isSelected ? 'highlight' : ''}`}
    >
      <TechImage obj={obj} />
    </div>
  );
}

TechCard.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
