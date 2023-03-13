import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BsInfoCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

function InfoModal({ obj }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button type="button" onClick={handleShow}>
        <BsInfoCircleFill />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{obj.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{obj.description}!</Modal.Body>
      </Modal>
    </>
  );
}

export default InfoModal;

InfoModal.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
