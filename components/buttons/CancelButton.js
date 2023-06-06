import React from 'react';
import PropTypes from 'prop-types';

function CancelButton({ handleClick }) {
  return (
    <button
      type="button"
      className="button-padding
      background-none
      border-outline
      fnt-primary
      toggle-button
      margin-r-md"
      id="cancel"
      onClick={(e) => handleClick(e)}
    >
      Cancel
    </button>
  );
}

export default CancelButton;

CancelButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
