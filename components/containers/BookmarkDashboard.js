import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { BiLinkExternal } from 'react-icons/bi';
import Image from 'next/image';
import KebabButton from '../buttons/KebabButton';
import shortenString from '../../utils/shortenString';

function BookmarkDashboard({
  bookmark,
  lTech,
  testFunction,
}) {
  const handleChange = () => {
    console.warn(lTech);
  };
  useEffect(() => {
    handleChange();
  }, [bookmark]);

  const handleClick = () => console.warn('click');
  return (
    <div className="tech-view_container">
      <div className="flex-row margin-btm space-between">
        <button
          type="button"
          className="close-button-round"
          onClick={() => testFunction(bookmark)}
        >
          <IoIosArrowBack />
        </button>
        <div className="flex-row">
          <KebabButton
            handleClick={handleClick}
          />
        </div>
      </div>
      <div className="fnt-secondary margin-btm">
        <IconContext.Provider value={{ size: '1.2em' }}>
          <AiFillDashboard className="margin-r-sm" />
        </IconContext.Provider>
        <span>Bookmark Dashboard:</span>
      </div>
      <div className="flex-row">
        <div className="margin-r-md">
          <Image
            width={60}
            height={60}
            src="/chrome_icon.svg"
          />
        </div>
        <div className="flex-col">
          <h2>
            {bookmark.title}
          </h2>
          {!bookmark.url
            ? ('')
            : (
              <a
                rel="noopener noreferrer"
                title={`${bookmark.title} documentation`}
                target="_blank"
                href={bookmark.url}
                className="lowercase"
              >
                <BiLinkExternal
                  className="margin-r-md fnt-secondary"
                />
                {shortenString(bookmark.url)}
              </a>
            ) }
        </div>
      </div>
    </div>
  );
}

export default BookmarkDashboard;

BookmarkDashboard.propTypes = {
  bookmark: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  lTech: PropTypes.shape({
    tech: PropTypes.shape({}),
  }).isRequired,
  testFunction: PropTypes.func.isRequired,
};
