import React from 'react';
import PropTypes from 'prop-types';

function ExpandButton({ isExpandToggled, setIsExpandToggled }) {
  if (isExpandToggled) {
    return (
      <button
        type="button"
        onClick={() => setIsExpandToggled(false)}
        className="background-none
            fnt-primary
            button-padding
            border-none"
      >
        Collapse
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setIsExpandToggled(true)}
      className="background-none
            fnt-primary
            button-padding
            border-none"
    >
      Expand
    </button>
  );
}

export default ExpandButton;

ExpandButton.propTypes = {
  isExpandToggled: PropTypes.bool.isRequired,
  setIsExpandToggled: PropTypes.func.isRequired,
};
