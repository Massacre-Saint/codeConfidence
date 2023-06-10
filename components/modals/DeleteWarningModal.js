import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

function DeleteWarningModal({
  show,
  handleClose,
  handleDelete,
  relatedData,
}) {
  const [topics, resources] = relatedData;
  const buttonGroup = ['delete', 'cancel'];
  const handleClick = (e) => {
    if (e.target.id === 'delete') {
      handleDelete();
    } handleClose();
  };

  const renderResponse = () => {
    if ((topics && resources).length > 0) {
      return (
        'Delete all'
      );
    }
    if (topics.length > 0) {
      return (
        `Are you sure you want delete this goal
        and the assigned topics?`
      );
    } if (resources.length > 0) {
      return (
        `Are you sure you want delete this goal
        and the following assigned topics: ${resources.map((i) => i.name)}`
      );
    } return (
      'Are you sure you want to delete this goal?'
    );
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderResponse()}</Modal.Body>
      <Modal.Footer>
        {buttonGroup.map((button) => (
          <button
            key={button}
            type="button"
            id={button}
            className="button-padding
            background-none
            border-outline
            fnt-primary
            toggle-button"
            onClick={(e) => handleClick(e)}
          >
            {button}
          </button>
        ))}
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteWarningModal;

DeleteWarningModal.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  relatedData: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
};
