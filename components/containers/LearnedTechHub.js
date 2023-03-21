import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { IoMdArrowBack } from 'react-icons/io';
import TechImage from '../icons/TechImage';
import { LearnedTechNav } from '../navs';
import LearnedTechHeader from '../headers/LearnedTechHeader';
import CreateDropdown from '../buttons/CreateDropdown';
import CreateModal from '../modals/CreateModal';
import GoalCardPreview from './cards/GoalCardPreview';
import ShowEditDelete from '../buttons/ShowEditDelete';
import ShowAll from './ShowAll';
import TopicCardPreview from './cards/TopicCardPreview';

export default function LearnedTechHub({
  lTech, topics, goals, bookmarks, onUpdate, resources,
}) {
  const [showGoal, setShowGoal] = useState(false);
  const [show, setShow] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showingGoals, setShowingGoals] = useState(false);
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
    if (e.target.id === 'topics') {
      setShowingGoals(false);
      setShowAll(true);
    } else if (e.target.id === 'goals') {
      setShowingGoals(true);
      setShowAll(true);
    } else {
      setShowAll(false);
    } setEdit(false);
  };
  if (showAll) {
    return (
      <>
        <div className="l-tech-nav">
          <div className="tech-image-nav">
            <TechImage obj={lTech.tech} />
          </div>
          <LearnedTechHeader obj={lTech.tech} />
        </div>
        <LearnedTechNav
          lTech={lTech}
          handleShowAll={handleShowAll}
          handleShow={handleShow}
          showAll={showAll}
          goals={goals}
          topics={topics}
          bookmarks={bookmarks}
          resources={resources}
          onUpdate={onUpdate}
        />
        <div className="block_section">
          <div className="flex_space_between">
            <div className="create-form_btn">
              {showAll ? (
                <button
                  type="button"
                  className="back-btn"
                  onClick={(e) => {
                    handleShowAll(e);
                    handleEdit(e);
                    onUpdate();
                  }}
                >
                  <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                    <IoMdArrowBack />
                  </IconContext.Provider>
                </button>
              ) : ('')}
            </div>
            <div className="create-form_btn">
              <ShowEditDelete handleEdit={handleEdit} edit={edit} />
            </div>
          </div>
          <ShowAll
            onUpdate={onUpdate}
            topics={topics}
            goals={goals}
            showingGoals={showingGoals}
            handleShowAll={handleShowAll}
            edit={edit}
            handleClose={handleClose}
            resources={resources}
          />
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

  return (
    <>
      <div className="l-tech-nav">
        <div className="tech-image-nav">
          <TechImage obj={lTech.tech} />
        </div>
        <LearnedTechHeader obj={lTech.tech} />
      </div>
      <LearnedTechNav
        lTech={lTech}
        handleShowAll={handleShowAll}
        goals={goals}
        topics={topics}
        bookmarks={bookmarks}
        resources={resources}
        onUpdate={onUpdate}
      />
      <div className="block_section">
        <div className="flex full-width">
          <div className="create-form_btn">
            <CreateDropdown handleShow={handleShow} />
          </div>
        </div>
        <div className="flex two-containers">
          <div className="box-half">
            <div className="flex" />
            <div className="preview_container">
              <GoalCardPreview
                goals={goals}
                onUpdate={onUpdate}
                handleClose={handleClose}
                handleShowAll={handleShowAll}
                resources={resources}
              />
            </div>
          </div>
          <div className="box-half">
            <div className="preview_container">
              <TopicCardPreview
                topics={topics}
                onUpdate={onUpdate}
                handleClose={handleClose}
                goals={goals}
                handleShowAll={handleShowAll}
              />
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
  bookmarks: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    index: PropTypes.number,
    parentId: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
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
