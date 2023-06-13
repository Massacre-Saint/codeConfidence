import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

function EmptyState({ noGoalsOrTopics, noBookmarksOrResources, searchEmpty }) {
  if (searchEmpty) {
    return (
      <div className="center">
        <h4 className="fnt-secondary">Nothing Found..</h4>
        <Image
          src="/search-empty.svg"
          alt="search-empty"
          layout="intrinsic"
          objectPosition="bottom"
          width={300}
          height={400}
        />
      </div>

    );
  }

  if (noBookmarksOrResources) {
    return (
      <>
        <h3>In Progress,
          <br />Bookmarks Coming Soon!
        </h3>
        <Image
          src="/wip.svg"
          alt="work in progress"
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
  searchEmpty: PropTypes.bool,
};

EmptyState.defaultProps = {
  noGoalsOrTopics: false,
  noBookmarksOrResources: false,
  searchEmpty: false,
};
