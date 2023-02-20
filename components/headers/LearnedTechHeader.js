import React from 'react';
import PropTypes from 'prop-types';

export default function LearnedTechHeader({ obj }) {
  return (
    <div className="learned-tech_header_contianer">
      <div>
        <h1>{obj.name}</h1>
      </div>
      <div>
        {obj.description}
      </div>
    </div>
  );
}

LearnedTechHeader.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
