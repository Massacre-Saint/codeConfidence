import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChooseAll from '../headers/ChooseAll';
import TechCard from './cards/TechCard';

export default function LearnedTechCreate({ tech }) {
  const [techState, setTechState] = useState(tech);
  const [selectedTechId, setSelectedTechId] = useState(null);

  const handleClick = (id) => {
    const updatedTech = techState.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      }
      return item;
    });
    setTechState(updatedTech);
    if (selectedTechId === id) {
      setSelectedTechId(null);
    } else {
      setSelectedTechId(id);
    }
  };

  return (
    <>
      <div className="tech-start_container">
        <div className="top-container block center">
          <ChooseAll />
        </div>
      </div>
      <div className="tech_grid-container">
        {techState.map((i) => (
          <TechCard key={i.id} isSelected={i.isSelected} handleClick={handleClick} obj={i} />
        ))}
      </div>
      {techState.some((i) => i.isSelected) && (
        <div className="selected-tech">
          <h1>Yay</h1>
        </div>
      )}
    </>
  );
}

LearnedTechCreate.propTypes = {
  tech: PropTypes.arrayOf((PropTypes.shape({
    techObj: PropTypes.shape({
      id: PropTypes.number,
    }),
  }))).isRequired,
};
