import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

function EmptyState({ noGoalsOrTopics }) {
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
};

EmptyState.defaultProps = {
  noGoalsOrTopics: false,
};
