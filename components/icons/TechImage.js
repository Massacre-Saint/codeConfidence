// import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

export default function TechImage() {
  // const src = `${obj.imageUrl}`;
  return (
    <>
      <h2>Image</h2>
      {/* <Image
        src={obj.imageUrl}
        loader={() => src}
      /> */}
    </>
  );
}

TechImage.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
  }).isRequired,
};
