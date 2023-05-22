import Image from 'next/image';
import React from 'react';

function EmptyState() {
  return (
    <div>
      <Image
        src="/emptyGoalsAndTopics.svg"
        alt="sign-post in space"
        layout="fill"
        width={500}
        height={500}
        objectFit="fill"
        objectPosition="top"
      />
    </div>
  );
}

export default EmptyState;
