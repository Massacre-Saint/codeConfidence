import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ShowEditDelete({ handleEdit, edit }) {
  if (edit) {
    return (
      <>
        <Button id="exit" onClick={handleEdit} variant="outline-danger">Exit</Button>
      </>
    );
  }
  return (
    <>
      <Button id="edit" onClick={handleEdit} variant="outline-light">Edit</Button>
    </>
  );
}

ShowEditDelete.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};
