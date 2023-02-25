import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TechImage from '../icons/TechImage';
import { LearnedTechNav } from '../navs';
import LearnedTechHeader from '../headers/LearnedTechHeader';
import CreateDropdown from '../buttons/CreateDropdown';
import CreateModal from '../modals/CreateModal';
import GoalList from './GoalList';
import TopicList from './TopicList';

export default function LearnedTechHub({
  lTech, goals, onUpdate, topics,
}) {
  const [showGoal, setShowGoal] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShowGoal(false);
    setShow(false);
  };
  const handleShow = (e) => {
    if (e.target.id === 'goal') {
      setShowGoal(true);
    }
    setShow(true);
  };

  return (
    <>
      <div className="l-tech-nav">
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
              <GoalList goals={goals} onUpdate={onUpdate} handleClose={handleClose} />
            </div>
          </div>
          <div className="box-half">
            <div className="flex full-width">
              <h3>Topics</h3>
              <div className="create-form_btn">
                <CreateDropdown handleShow={handleShow} />
              </div>
            </div>
            <div className="list_container">
              <TopicList goals={goals} topics={topics} onUpdate={onUpdate} handleClose={handleClose} />
            </div>
          </div>
        </div>
      </div>
      <CreateModal
        handleClose={handleClose}
        showGoal={showGoal}
        show={show}
        lTech={lTech}
        goals={goals}
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
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
