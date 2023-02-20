import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TechImage from '../icons/TechImage';
import { LearnedTechNav } from '../navs';
import LearnedTechHeader from '../headers/LearnedTechHeader';
import CreateDropdown from '../buttons/CreateDropdown';
import CreateModal from '../modals/CreateModal';
import GoalList from './GoalList';

export default function LearnedTechHub({ lTech, goals, onUpdate }) {
  const [showGoal, setShowGoal] = useState(false);
  const [show, setShowTopic] = useState(false);

  const handleClose = () => {
    setShowGoal(false);
    setShowTopic(false);
  };
  const handleShow = (e) => {
    if (e.target.id === 'goal') {
      setShowGoal(true);
    }
    setShowTopic(true);
  };

  return (
    <>
      <div className="navbar_sticky flex">
        <TechImage obj={lTech.tech} />
        <LearnedTechHeader obj={lTech.tech} />
      </div>
      <LearnedTechNav />
      <div className="block_section">
        <div className="flex two-containers">
          <div className="box-half">
            <div className="flex">
              <h3>Goals</h3>
            </div>
            <div className="list_container">
              <GoalList goals={goals} />
            </div>
          </div>
          <div className="box-half">
            <div className="flex full-width">
              <h3>Topics</h3>
              <div className="float-right">
                <CreateDropdown handleShow={handleShow} />
              </div>
            </div>
            <div className="list_container">
              Topics
            </div>
          </div>
        </div>
      </div>
      <CreateModal
        handleClose={handleClose}
        showGoal={showGoal}
        show={show}
        lTech={lTech}
        onUpdate={onUpdate}
      />
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
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
