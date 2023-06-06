import React from 'react';
import PropTypes from 'prop-types';

function EditButton({ handleEdit, isEditing }) {
  return (
    <button
      type="button"
      className="button-padding
      background-none
      border-outline
      fnt-primary
      toggle-button
      margin-r-md"
      id="create"
      onClick={(e) => handleEdit(e)}
    >
      {isEditing ? 'Save' : 'Edit'}
    </button>
  );
}

export default EditButton;

EditButton.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};
