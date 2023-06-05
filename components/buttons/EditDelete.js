import React from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import PropTypes from 'prop-types';

export default function EditDelete({ handleShowForm, handleDelete }) {
  return (
    <div className="edit-delte-btn">
      <button
        type="button"
        id="showForm"
        onClick={(e) => {
          e.stopPropagation();
          handleShowForm();
        }}
      >
        <AiFillEdit />
      </button>
      <button type="button" onClick={handleDelete}>
        <AiFillDelete />
      </button>
    </div>
  );
}

EditDelete.propTypes = {
  handleShowForm: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
