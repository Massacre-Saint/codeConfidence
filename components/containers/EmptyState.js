import Image from 'next/image';
import React from 'react';

function EmptyState() {
  return (
    <Image
      src="/emptySignPost.svg"
      alt="sign-post in space"
      layout="fill"
    />
  );
}

export default EmptyState;
