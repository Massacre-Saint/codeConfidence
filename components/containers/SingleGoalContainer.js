import React from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { BsFillSignpost2Fill } from 'react-icons/bs';
import TechImage from '../icons/TechImage';
import convertTime from '../../utils/convertTime';

function SingleGoalContainer({ goal }) {
  return (
    <div className="tech-view_container">
      <div className="flex-row space-between">
        <div className="fnt-secondary margin-btm">
          <IconContext.Provider value={{ size: '1.2em' }}>
            <BsFillSignpost2Fill className="margin-r-sm" />
          </IconContext.Provider>
          Viewing Goal:
        </div>
        <div className="flex-row">
          Edit and New
        </div>
      </div>
      <div className="flex-row">
        <div className="margin-r-md">
          <TechImage obj={goal.learnedTech.tech} />
        </div>
        <div className="flex-col">
          <h2>
            {goal.title}
          </h2>
          <div>
            <span>
              {convertTime(goal.lastUpdated)}
            </span>
            <span>
              {`${goal.progress} % complete`}
            </span>
          </div>
          <div>
            {goal.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleGoalContainer;

SingleGoalContainer.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    learnedTech: PropTypes.shape({
      tech: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
    lastUpdated: PropTypes.string,
    progress: PropTypes.number,
  }).isRequired,
};
