import Link from 'next/link';
import React from 'react';
import {
  BsBarChartSteps, BsBookmarkFill, BsFillSignpost2Fill, BsFillHouseDoorFill,
} from 'react-icons/bs';

function NavBlock() {
  return (
    <div className="quadrant-grid-nav">
      <span>
        <BsFillHouseDoorFill />
        <Link passHref href="/">
          Home
        </Link>
      </span>
      <span>
        <BsBookmarkFill />
        <Link passHref href="/bookmarks">
          Bookmarks
        </Link>
      </span>
      <span>
        <BsBarChartSteps />
        <Link passHref href="/topics">
          Topics
        </Link>
      </span>
      <span>
        <BsFillSignpost2Fill />
        <Link passHref href="/goals">
          Goals
        </Link>
      </span>
    </div>
  );
}

export default NavBlock;
