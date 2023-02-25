import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

export default function TechImage({ obj }) {
  return (
    <div className="tech-image_container">
      <Image
        loading="lazy"
        src={obj.imageUrl}
        width={140}
        height={140}
        className="tech-image"
      />
    </div>
  );
}

TechImage.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
  }).isRequired,
};
