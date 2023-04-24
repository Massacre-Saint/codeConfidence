import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Goals from '../containers/Goals';

function AssignResourceModal({
  handleShowAssignedResourceModal,
  showAssignedResourceModal,
  setAssignedTopicOrGoal,
  assignedTopicOrGoal,
  showingGoals,
  goals,
  // topics,
  handleSubmit,
}) {
  if (showingGoals) {
    return (
      <Modal
        fullscreen
        show={showAssignedResourceModal}
        onHide={handleShowAssignedResourceModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Goals
          goals={goals}
          setAssignedTopicOrGoal={setAssignedTopicOrGoal}
          assignedTopicOrGoal={assignedTopicOrGoal}
          assigningBookmark={showAssignedResourceModal}
        />
        <Modal.Footer>
          <Button
            onClick={(e) => {
              setAssignedTopicOrGoal(assignedTopicOrGoal);
              handleSubmit(e);
            }}
          >
            Choose Goal
          </Button>
          <Button onClick={handleShowAssignedResourceModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <>
      <Modal
        show={showAssignedResourceModal}
        onHide={handleShowAssignedResourceModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Footer>
          <Button onClick={handleShowAssignedResourceModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AssignResourceModal;

AssignResourceModal.propTypes = {
  handleShowAssignedResourceModal: PropTypes.func.isRequired,
  showAssignedResourceModal: PropTypes.bool.isRequired,
  setAssignedTopicOrGoal: PropTypes.func.isRequired,
  assignedTopicOrGoal: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  showingGoals: PropTypes.bool.isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  // topics: PropTypes.arrayOf((PropTypes.shape({
  //   id: PropTypes.string,
  // }))).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
