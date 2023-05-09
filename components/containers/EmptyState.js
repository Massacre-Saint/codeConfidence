import Image from 'next/image';
import React from 'react';

function EmptyState() {
  return (
    <div>
      <Image
        src="/sign-post.svg"
        width={300}
        height={300}
      />
      <div>
        <p>
          Oops, nothing here.
        </p>
      </div>
    </div>
  );
}

export default EmptyState;
