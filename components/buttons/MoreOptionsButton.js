import React, { useEffect, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';

function MoreOptionsButton() {
  const [show] = useState(true);
  useEffect(() => {

  }, [show]);
  return (
    <>
      <button
        type="button"
      >
        <FiMoreVertical />
      </button>
      {/* {show
        ? (

        )
        : ('')} */}
    </>
  );
}

export default MoreOptionsButton;
