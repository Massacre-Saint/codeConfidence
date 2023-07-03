import React from 'react';
import PropTypes from 'prop-types';

function CreateButton({ handleCreate, creatingGoal }) {
  return (
    <button
      type="button"
      className="button-padding
      background-none
      border-outline
      fnt-primary
      toggle-button"
      id="create"
      onClick={(e) => handleCreate(e)}
    >
      {creatingGoal ? 'Add Goal' : 'Add Topic'}
    </button>
  );
}

export default CreateButton;

CreateButton.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  creatingGoal: PropTypes.bool,
};

CreateButton.defaultProps = {
  creatingGoal: false,
};
