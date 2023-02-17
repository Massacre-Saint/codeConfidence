import React from 'react';
import PropTypes from 'prop-types';
import TechImage from '../../icons/TechImage';

export default function TechCard({ obj }) {
  return (
    <div className="tech_card">
      <TechImage obj={obj} />
    </div>
  );
}

TechCard.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
  }).isRequired,
};
