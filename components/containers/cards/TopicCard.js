import React from 'react';
import PropTypes from 'prop-types';
import { BsSignpostSplit, BsCheckCircleFill, BsCheckCircle } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import convertTime from '../../../utils/convertTime';
import TechImage from '../../icons/TechImage';
import shortenString from '../../../utils/shortenString';

export default function TopicCard({
  obj,
  preview,
}) {
  if (preview) {
    return (
      <div
        role="button"
        tabIndex="0"
        id="card"
        className="card-background padding-all border-radius-15 no-right-padding card-ratio-fixed"
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
              Topic
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-row card-background padding-all border-radius-15">
      <div className="margin-r-md">
        <TechImage obj={obj.learnedTech.tech} />
      </div>
      <div className="flex-col full-width">
        <div className="flex-col">
          <span className="fnt-primary">
            {obj.title}
          </span>
          <span className="fnt-small fnt-secondary">
            {obj.description}
          </span>
        </div>
        <div className="fnt-small fnt-secondary">
          <span>
            <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
              <BiTimeFive />
            </IconContext.Provider>
            &nbsp;
            <span>
              {convertTime(obj.lastUpdated)}
            </span>
          </span>
          <span>
            {(obj.goal != null)
              ? (
                <span className="margin-l-md">
                  <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                    <BsSignpostSplit />
                  </IconContext.Provider>
                  &nbsp;
                  <span className="">
                    {shortenString(obj.goal.title)}
                  </span>
                </span>
              )
              : ('')}
          </span>
          <span>
            {(obj.completed
              ? (
                <span className="margin-l-md">
                  <IconContext.Provider value={{ size: '1.5em', color: 'green' }}>
                    <BsCheckCircleFill />
                  </IconContext.Provider>
                  &nbsp;
                  <span className="">
                    Completed
                  </span>
                </span>
              )
              : (
                <span className="margin-l-md">
                  <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                    <BsCheckCircle />
                  </IconContext.Provider>
                  &nbsp;
                  <span className="">
                    Not Complete
                  </span>
                </span>
              ))}
          </span>
        </div>
      </div>
    </div>
  );
}
TopicCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
    goal: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }),
    learnedTech: PropTypes.shape({
      tech: PropTypes.shape({
        image_url: PropTypes.string,
      }),
    }),
    lastUpdated: PropTypes.string,
  }).isRequired,
  preview: PropTypes.bool,
};

TopicCard.defaultProps = {
  preview: false,
};
