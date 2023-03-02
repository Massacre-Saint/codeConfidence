import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import PropTypes from 'prop-types';

export default function ToggleButtons({ lTechTopics, setFilteredTopics }) {
  const radios = [
    { name: 'Open', value: '1' },
    { name: 'Completed', value: '2' },
  ];
  const handleChange = (e) => {
    if (e.target.id === '2') {
      const results = lTechTopics.filter((obj) => obj.completed === true);
      setFilteredTopics(results);
    } else {
      setFilteredTopics(lTechTopics);
    }
  };
  return (
    <ButtonGroup>
      {radios.map((radio) => (
        <ToggleButton
          key={radio.value}
          id={radio.value}
          type="radio"
          name="radio"
          className="toggle-button"
          variant="outline"
          bsPrefix="hide-radio"
          onChange={(e) => handleChange(e)}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

ToggleButtons.propTypes = {
  lTechTopics: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool,
  })).isRequired,
  setFilteredTopics: PropTypes.func.isRequired,
};
