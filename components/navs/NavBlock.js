import React from 'react';
import {
  BsBarChartSteps, BsBookmarkFill, BsFillSignpost2Fill, BsFillHouseDoorFill,
} from 'react-icons/bs';

function NavBlock() {
  return (
    <div className="quadrant-grid-nav">
      <span>
        <BsFillHouseDoorFill />
        <span>Home</span>
      </span>
      <span>
        <BsBookmarkFill />
        <span>Bookmarks</span>
      </span>
      <span>
        <BsBarChartSteps />
        <span>Topics</span>
      </span>
      <span>
        <BsFillSignpost2Fill />
        <span>Goals</span>
      </span>
    </div>
  );
}

export default NavBlock;
