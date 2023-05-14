import React from 'react';
import PropTypes from 'prop-types';
import { BiLinkExternal } from 'react-icons/bi';

export default function LearnedTechHeader({ obj }) {
  return (
    <>
      <div className="learned-tech_header_container">
        <div className="flex-row">
          <h2>{obj.name}</h2>
          <a
            rel="noopener noreferrer"
            title={`${obj.name} documentation`}
            target="_blank"
            href={obj.docUrl}
          >
            <BiLinkExternal />
          </a>
        </div>
        <p>
          {obj.description}
        </p>
      </div>
    </>
  );
}

LearnedTechHeader.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    docUrl: PropTypes.string,
  }).isRequired,
};
