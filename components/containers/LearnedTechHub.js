import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LearnedTechNav } from '../navs';
import CreateDropdown from '../buttons/CreateDropdown';
import CreateModal from '../modals/CreateModal';
import GoalCardPreview from './cards/GoalCardPreview';
import ShowEditDelete from '../buttons/ShowEditDelete';
import ShowAll from './ShowAll';
import TopicCardPreview from './cards/TopicCardPreview';

export default function LearnedTechHub({
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
  if (showAll) {
    return (
      <div className="tech-view_container">
        <LearnedTechNav
          handleShowAll={handleShowAll}
        />
        <div className="block_section">
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
        </div>
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

  return (
    <div className="tech-view_container">
      <LearnedTechNav
        handleShowAll={handleShowAll}
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
    </div>
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
  // bookmarks: PropTypes.arrayOf((PropTypes.shape({
  //   id: PropTypes.number,
  //   index: PropTypes.number,
  //   parentId: PropTypes.number,
  //   title: PropTypes.string,
  //   url: PropTypes.string,
  // }))).isRequired,
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
