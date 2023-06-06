import React from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { BiTimeFive } from 'react-icons/bi';
import TechImage from '../../icons/TechImage';
import shortenString from '../../../utils/shortenString';
import convertTime from '../../../utils/convertTime';

function ResourceCard({ obj, preview }) {
  if (preview) {
    return (
      <div
        role="button"
        tabIndex="0"
        id="card"
        className="card-background padding-all border-radius-15 no-right-padding"
      >
        <div className="flex-row align-center">
          <div className="margin-r-md">
            <TechImage obj={obj.learnedTech.tech} />
          </div>
          <div className="flex-col full-width">
            <span className="fnt-primary fnt-large">
              {shortenString(obj.title)}
            </span>
            <span className="fnt-small">
              <IconContext.Provider
                value={{ size: '1.5em', color: 'white' }}
              >
                <BiTimeFive />
              </IconContext.Provider>
              <span className="margin-r-sm" />
              <span className="fnt-secondary">
                {convertTime(obj.lastUpdated)}
              </span>
            </span>
          </div>
          <div className="txt-vertical">
            <span>
              Resour
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>ResourceCard</div>
  );
}

export default ResourceCard;

ResourceCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    lastUpdated: PropTypes.string,
    title: PropTypes.string,
    learnedTech: PropTypes.shape({
      tech: PropTypes.shape({
        image_url: PropTypes.string,
      }),
    }),
  }).isRequired,
  preview: PropTypes.bool,
};

ResourceCard.defaultProps = {
  preview: false,
};
