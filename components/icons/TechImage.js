import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

export default function TechImage({ obj }) {
  return (
    <>
      <Image
        loading="lazy"
        src={obj.imageUrl}
        width={140}
        height={140}
        className="tech-image"
      />
    </>
  );
}

TechImage.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
  }).isRequired,
};
