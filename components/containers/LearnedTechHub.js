import React from 'react';
import PropTypes from 'prop-types';
import TechImage from '../icons/TechImage';
import { LearnedTechNav } from '../navs';
import LearnedTechHeader from '../headers/LearnedTechHeader';

export default function LearnedTechHub({ lTech }) {
  // const goalCount = goals.length;
  // const handleClick = () => {
  // };
  return (
    <>
      <div className="flex">
        <TechImage obj={lTech.tech} />
        <LearnedTechHeader obj={lTech.tech} />
      </div>
      <LearnedTechNav />
      <div className="containers_flex">
        <div className="list_container">
          Goals
        </div>
        <div className="list_container">
          Topics
        </div>
      </div>
    </>
  );
}
LearnedTechHub.propTypes = {
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
  // goals: PropTypes.arrayOf((PropTypes.shape({
  //   id: PropTypes.string,
  // }))).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};
