import React from 'react';
import PropTypes from 'prop-types';
import { BiLinkExternal } from 'react-icons/bi';
import MediaQuery from 'react-responsive';

export default function LearnedTechHeader({ obj }) {
  return (
    <>
      <MediaQuery minWidth={647}>
        <div className="learned-tech_header_container">
          <div className="flex-row">
            <h1>{obj.name}</h1>
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
      </MediaQuery>
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
