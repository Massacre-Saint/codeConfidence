import React from 'react';
import PropTypes from 'prop-types';
import { Message } from '../headers';
import TechImage from '../icons/TechImage';
import CreateGoal from '../buttons/CreateGoal';

export default function ViewAssociated({ lTech, goals, onUpdate }) {
  const goalCount = goals.length;
  const handleClick = () => {
  };
  return (
    <>
      <div className="top-container block center">
        <Message />
      </div>
      <div className="lTech-view_all lg-block">
        <div className="lg-container div1">
          <div>
            <TechImage obj={lTech.tech} />
          </div>
          <h1>{lTech.tech.name}</h1>
          <p>{lTech.tech.description}</p>
          <a href={lTech.tech.docUrl} onClick={handleClick} target="_blank" rel="noreferrer">
            <span> Learn more</span>
          </a>
        </div>
        <div className="med-container div2">
          <div>
            <h2>{goalCount}</h2>
            <CreateGoal lTech={lTech} onUpdate={onUpdate} />
          </div>
        </div>
        <div className="med-container div3">Topics</div>
      </div>
    </>
  );
}
ViewAssociated.propTypes = {
  lTech: PropTypes.shape({
    id: PropTypes.number,
    tech: PropTypes.shape({
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      docUrl: PropTypes.string,
    }),
    uid: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
