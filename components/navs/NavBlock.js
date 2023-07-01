import Link from 'next/link';
import React from 'react';
import {
  BsFillSignpost2Fill, BsFillHouseDoorFill,
} from 'react-icons/bs';
import { TbChecklist } from 'react-icons/tb';

function NavBlock() {
  const btnGroup = [
    {
      title: 'Home',
      icon: <BsFillHouseDoorFill />,
      route: '/',
    },
    {
      title: 'Topics',
      icon: <TbChecklist />,
      route: '/topics',
    },
    {
      title: 'Goals',
      icon: <BsFillSignpost2Fill />,
      route: '/goals',
    },
  ];
  return (
    <div className="quadrant-grid-nav">
      {btnGroup.map((btn) => (
        <span key={btn.title}>
          <Link href={btn.route} passHref>
            <button
              type="button"
              className="
              flex-col
              align-center
              border-none
              background-none
              fnt-primary
              settings-button"
            >
              {btn.icon}
              {btn.title}
            </button>
          </Link>
        </span>
      ))}
    </div>
  );
}

export default NavBlock;
