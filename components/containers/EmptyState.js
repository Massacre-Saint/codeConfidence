import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

function EmptyState({ noGoalsOrTopics, noBookmarksOrResources }) {
  if (noBookmarksOrResources) {
    return (
      <>
        <h3>Such Empty,
          <br /> Bookmarks Coming Soon!
        </h3>
        <Image
          src="/wip.svg"
          alt="sign-post in space"
          layout="fill"
        />
      </>
    );
  }
  return (
    <div>
      {noGoalsOrTopics ? (
        <Image
          src="/emptySignPost.svg"
          alt="sign-post in space"
          layout="fill"
        />
      ) : (
        <Image
          src="/noTopics.svg"
          alt="spaceman pc reading no assigned topics"
          layout="fill"
          objectFit="contain"
        />
      )}
    </div>
  );
}

export default EmptyState;

EmptyState.propTypes = {
  noGoalsOrTopics: PropTypes.bool,
  noBookmarksOrResources: PropTypes.bool,
};

EmptyState.defaultProps = {
  noGoalsOrTopics: false,
  noBookmarksOrResources: false,
};
