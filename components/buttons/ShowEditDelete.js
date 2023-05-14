import React from 'react';
import PropTypes from 'prop-types';

export default function ShowEditDelete({ handleEdit, edit }) {
  if (edit) {
    return (
      <>
        <button
          type="button"
          id="exit"
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
