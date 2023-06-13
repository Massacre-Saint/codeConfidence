import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { AiFillDashboard } from 'react-icons/ai';
import { LearnedTechNav } from '../navs';
import CreateModal from '../modals/CreateModal';
import { CreateDropdown } from '../buttons';
import DashboardConditionalStateContainer from './DashboardConditionalStateContainer';
import CondionalListContainer from './CondionalListContainer';

export default function LearnedTechDashboard({
  lTech, topics, goals, onUpdate, resources,
}) {
  const [creatingGoal, setCreatingGoal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showingGoals, setShowingGoals] = useState(false);
  const [showingBookmarks] = useState(false);
  const handleClose = () => {
    setCreatingGoal(false);
    setShowCreateModal(false);
  };
  const handleShow = (e) => {
    if (e.target.id === 'goal') {
      setCreatingGoal(true);
    }
    setShowCreateModal(true);
  };

  const handleShowAll = (e) => {
    if (e.target.id === '2') {
      setShowingGoals(false);
      setShowAll(true);
    } else if (e.target.id === '1') {
      setShowingGoals(true);
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  };

  return (
    <div className="tech-view_container">
      <div className="flex-row space-between">
        <div className="fnt-secondary margin-btm">
          <IconContext.Provider value={{ size: '1.2em' }}>
            <AiFillDashboard className="margin-r-sm" />
          </IconContext.Provider>
          {`${lTech.tech.name} Dashboard`}
        </div>
        <div className="flex-row">
          <CreateDropdown
            handleShow={handleShow}
          />
        </div>
      </div>
      <LearnedTechNav
        handleShowAll={handleShowAll}
        goals={goals}
        topics={topics}
      />
      {showAll
        ? (
          <CondionalListContainer
            topics={topics}
            goals={goals}
            showingGoals={showingGoals}
            showingBookmarks={showingBookmarks}
            handleShowAll={handleShowAll}
            resources={resources}
            lTech={lTech}
          />
        )
        : (
          <DashboardConditionalStateContainer
            goals={goals}
            topics={topics}
          />
        )}
      <CreateModal
        handleClose={handleClose}
        creatingGoal={creatingGoal}
        showCreateModal={showCreateModal}
        lTech={lTech}
        goals={goals}
        onUpdate={onUpdate}
      />
    </div>
  );
}
LearnedTechDashboard.propTypes = {
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
  resources: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    bookmark: PropTypes.shape({
      id: PropTypes.number,
    }),
    objectId: PropTypes.shape({
      id: PropTypes.string,
    }),
    tech: PropTypes.shape({
      id: PropTypes.number,
    }),
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
