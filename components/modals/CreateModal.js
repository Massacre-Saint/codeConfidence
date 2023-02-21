import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import GoalForm from '../forms/GoalForm';

export default function CreateModal({
  handleClose, show, lTech, onUpdate, showGoal,
}) {
  if (showGoal) {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <GoalForm lTech={lTech} obj={{}} onUpdate={onUpdate} handleClose={handleClose} />
          </Modal.Body>
        </Modal>
      </>
    );
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        Hello
      </Modal>
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
};
