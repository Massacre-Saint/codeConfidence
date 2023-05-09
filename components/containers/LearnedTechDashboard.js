import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { AiFillDashboard } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { LearnedTechNav } from '../navs';
import CreateModal from '../modals/CreateModal';
import ShowEditDelete from '../buttons/ShowEditDelete';
import ShowAll from './ShowAll';
import RecentsList from './RecentsList';

export default function LearnedTechDashboard({
  lTech, topics, goals, onUpdate, resources,
}) {
  const [showGoal, setShowGoal] = useState(false);
  const [show, setShow] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showingGoals, setShowingGoals] = useState(false);
  const [showingBookmarks] = useState(false);
  const [edit, setEdit] = useState(false);
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
  const handleEdit = (e) => {
    if (e.target.id === 'edit') {
      setEdit(true);
    } else if (e.target.id === 'exit') {
      setEdit(false);
    } else {
      setEdit(false);
    }
  };

  const handleShowAll = (e) => {
    if (e.target.id === '4') {
      setShowingGoals(false);
      setShowAll(true);
    } else if (e.target.id === '3') {
      setShowingGoals(true);
      setShowAll(true);
    } else {
      setShowAll(false);
    } setEdit(false);
  };

  return (
    <div className="tech-view_container">
      <div className="fnt-secondary margin-btm">
        <IconContext.Provider value={{ size: '1.2em' }}>
          <AiFillDashboard className="margin-r-sm" />
        </IconContext.Provider>
        {`${lTech.tech.name} Dashboard`}
      </div>
      <LearnedTechNav
        handleShowAll={handleShowAll}
        goals={goals}
        topics={topics}
        handleShow={handleShow}
      />
      {showAll
        ? (
          <div className="flex_space_between">
            <ShowAll
              onUpdate={onUpdate}
              topics={topics}
              goals={goals}
              showingGoals={showingGoals}
              showingBookmarks={showingBookmarks}
              handleShowAll={handleShowAll}
              edit={edit}
              handleClose={handleClose}
              resources={resources}
              lTech={lTech}
            />
            <div className="create-form_btn">
              <ShowEditDelete handleEdit={handleEdit} edit={edit} />
            </div>
          </div>
        )
        : (
          <div className="stats">
            <Image
              src="/placeholder-chart.svg"
              width={130}
              height={130}
            />
            <div className="flex-col">
              <span className="sub-heading padding">
                Recents
              </span>
              <div className="flex-row margin-l-md gap-col">
                <RecentsList list={[...goals, ...topics]} />
              </div>
            </div>
            {/* Feature Coming Soon */}
            {/* <div className="flex-row space-between_shift-down">
          <span className="sub-heading padding">
            Projects
          </span>
        </div> */}
          </div>
        )}
      <CreateModal
        handleClose={handleClose}
        showGoal={showGoal}
        show={show}
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
