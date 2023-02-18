import React from 'react';
import PropTypes from 'prop-types';
import { Message } from '../headers';
import TechImage from '../icons/TechImage';

export default function ViewAssociated({ obj }) {
  console.warn(obj);
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
            <TechImage obj={obj.tech} />
          </div>
          <h1>{obj.tech.name}</h1>
          <p>{obj.tech.description}</p>
          <a href={obj.tech.docUrl} onClick={handleClick} target="_blank" rel="noreferrer">
            <span> Learn more</span>
          </a>
        </div>
        <div className="med-container div2">Goals</div>
        <div className="med-container div3">Comments</div>
      </div>
    </>
  );
}
ViewAssociated.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    tech: PropTypes.shape({
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      docUrl: PropTypes.string,
    }),
    uid: PropTypes.string,
  }).isRequired,
};
