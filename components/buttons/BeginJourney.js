import React from 'react';
import PropTypes from 'prop-types';

export default function BeginJourney({ handleShow }) {
  return (
    <>
      <button
        className="button"
        type="button"
        onClick={() => {
          handleShow();
        }}
      >
        Begin Journey
      </button>
    </>
  );
}

BeginJourney.propTypes = {
  handleShow: PropTypes.func.isRequired,
};
