import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import PropTypes from 'prop-types';

export default function ToggleButtons({
  lTechTopics, setFilteredTopics, lTechGoals, setFilteredGoals,
}) {
  const radios = [
    { name: 'Open', value: '3' },
    { name: 'Completed', value: '4' },
  ];
  const handleChange = (e) => {
    if (lTechTopics.length > 0) {
      if (e.target.id === '4') {
        const results = lTechTopics.filter((obj) => obj.completed === true);
        setFilteredTopics(results);
      } else {
        const results = lTechTopics.filter((obj) => obj.completed === false);
        setFilteredTopics(results);
      }
    }
    if (lTechGoals.length > 0) {
      if (e.target.id === '4') {
        const results = lTechGoals.filter((obj) => obj.progress === 100);
        setFilteredGoals(results);
      } else {
        const results = lTechGoals.filter((obj) => obj.progress !== 100);
        setFilteredGoals(results);
      }
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
          onChange={(e) => {
            handleChange(e);
          }}
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
  })),
  lTechGoals: PropTypes.arrayOf(PropTypes.shape({
    progress: PropTypes.number,
  })),
  setFilteredTopics: PropTypes.func,
  setFilteredGoals: PropTypes.func,
};

ToggleButtons.defaultProps = {
  lTechTopics: [{}],
  lTechGoals: [{}],
  setFilteredGoals: () => {},
  setFilteredTopics: () => {},
};
