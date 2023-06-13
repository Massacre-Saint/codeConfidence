import Link from 'next/link';
import React from 'react';
import {
  BsFillSignpost2Fill, BsFillHouseDoorFill,
} from 'react-icons/bs';
import { TbChecklist } from 'react-icons/tb';

function NavBlock() {
  return (
    <div className="quadrant-grid-nav">
      <span>
        <BsFillHouseDoorFill />
        <Link href="/">
          Home
        </Link>
      </span>
      <span>
        <TbChecklist />
        <Link passHref href="/topics">
          Topics
        </Link>
      </span>
      <span>
        <BsFillSignpost2Fill />
        <Link passHref href="/goals/">
          Goals
        </Link>
      </span>
    </div>
  );
}

export default NavBlock;
