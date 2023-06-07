import React from 'react';
import PropTypes from 'prop-types';

function SaveButton({ handleClick }) {
  return (
    <button
      type="button"
      className="button-padding
      background-none
      border-outline
      fnt-primary
      toggle-button
      margin-r-md"
      id="save"
      onClick={(e) => handleClick(e)}
    >
      Save
    </button>
  );
}

export default SaveButton;

SaveButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
