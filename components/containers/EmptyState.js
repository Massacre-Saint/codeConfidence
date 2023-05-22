import Image from 'next/image';
import React from 'react';

function EmptyState() {
  return (
    <div>
      <Image
        src="/emptySignPost.svg"
        alt="sign-post in space"
        layout="fill"
      />
    </div>
  );
}

export default EmptyState;
