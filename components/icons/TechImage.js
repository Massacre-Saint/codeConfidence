import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

export default function TechImage({ obj }) {
  return (
    <div>
      <Image
        loading="lazy"
        src={obj.imageUrl}
        className="tech-image"
        layout="responsive"
        height={75}
        width={75}
      />
    </div>
  );
}

TechImage.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
  }).isRequired,
};
