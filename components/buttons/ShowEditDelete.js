import React from 'react';
import PropTypes from 'prop-types';

export default function ShowEditDelete({ handleEdit, edit }) {
  if (edit) {
    return (
      <>
        <button
          type="button"
          id="exit"
          className="button-padding
          background-none
          border-outline-danger
          fnt-danger
          border-radius-15"
          onClick={handleEdit}
        >
          Exit
        </button>
      </>
    );
  }
  return (
    <>
      <button
        type="button"
        id="edit"
        className="button-padding
        background-none
        border-outline
        fnt-primary
        toggle-button"
        onClick={handleEdit}
      >
        Edit
      </button>
    </>
  );
}

ShowEditDelete.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};
