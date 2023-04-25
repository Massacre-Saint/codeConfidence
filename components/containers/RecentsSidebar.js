import React from 'react';
import 'react-icons';
import { BiTimeFive } from 'react-icons/bi';

function RecentsSidebar() {
  const filterOptions = [
    {
      id: 1,
      name: 'Goals',
    },
    {
      id: 2,
      name: 'Topics',
    },
    {
      id: 3,
      name: 'Resources',
    },
  ];
  return (
    <>
      <div>
        Your Recents
        <BiTimeFive />
      </div>
      <div>
        {filterOptions.map((i) => (
          <button
            className="
          button-padding
          border-radius
          border-outline
          background-none
          fnt-primary"
            type="button"
          >{i.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default RecentsSidebar;
