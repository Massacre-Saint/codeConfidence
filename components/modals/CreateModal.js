import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import MediaQuery from 'react-responsive';
import { Offcanvas } from 'react-bootstrap';
import GoalForm from '../forms/GoalForm';
import TopicForm from '../forms/TopicForm';

export default function CreateModal({
  handleClose, show, lTech, onUpdate, showGoal, goals,
}) {
  if (showGoal) {
    return (
      <>
        <MediaQuery maxWidth={769}>
          <Offcanvas show={show} onHide={handleClose} placement="bottom">
            <GoalForm lTech={lTech} onUpdate={onUpdate} handleClose={handleClose} />
          </Offcanvas>
        </MediaQuery>
        <MediaQuery minWidth={770}>
          <Modal show={show} onHide={handleClose} centered>
            <GoalForm lTech={lTech} onUpdate={onUpdate} handleClose={handleClose} />
          </Modal>
        </MediaQuery>
      </>
    );
  }
  return (
    <>
      <MediaQuery maxWidth={769}>
        <Offcanvas show={show} onHide={handleClose} placement="bottom">
          <TopicForm lTech={lTech} goals={goals} onUpdate={onUpdate} handleClose={handleClose} />
        </Offcanvas>
      </MediaQuery>
      <MediaQuery minWidth={770}>
        <Modal show={show} onHide={handleClose} centered>
          <TopicForm lTech={lTech} goals={goals} onUpdate={onUpdate} handleClose={handleClose} />
        </Modal>
      </MediaQuery>
    </>
  );
}

CreateModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
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
  onUpdate: PropTypes.func.isRequired,
  showGoal: PropTypes.bool.isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
};
