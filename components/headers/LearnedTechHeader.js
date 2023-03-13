import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import InfoModal from '../modals/InfoModal';

export default function LearnedTechHeader({ obj }) {
  return (
    <>
      <MediaQuery minWidth={647}>
        <div className="learned-tech_header_contianer">
          <div className="sticky">
            <h1>{obj.name}</h1>
          </div>
          <div className="overflow">
            {obj.description}
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={646}>
        <div className="learned-tech_header_contianer">
          <MediaQuery minWidth={440}>
            <div>
              <h1>{obj.name}</h1>
            </div>
          </MediaQuery>
          <MediaQuery minWidth={319}>
            <div className="info">
              <InfoModal obj={obj} />
            </div>
          </MediaQuery>
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
  }).isRequired,
};
