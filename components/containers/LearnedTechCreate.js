import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChooseAll from '../headers/ChooseAll';
import TechCard from './cards/TechCard';
import { useAuth } from '../../utils/context/authContext';
import { createLearnedTech } from '../../utils/data';
import Loading from '../Loading';

export default function LearnedTechCreate({ tech, onUpdate }) {
  const { user } = useAuth();
  const [techState, setTechState] = useState(tech);
  const [selectedTechId, setSelectedTechId] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = () => {
    const selectedTech = techState.filter((item) => item.isSelected);
    createLearnedTech(selectedTech, user).then(() => onUpdate());
  };
  useEffect(() => {
    setLoading(false);
  }, [tech, loading]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <div>
        <div className="top-container block center">
          <ChooseAll />
        </div>
      </div>
      <div className="tech_flex-container">
        {techState.map((i) => (
          <TechCard key={i.id} isSelected={i.isSelected} handleClick={handleClick} obj={i} />
        ))}
      </div>
      <div className="overlay-button">
        {techState.some((i) => i.isSelected) && (
          <button type="submit" onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </>
  );
}

LearnedTechCreate.propTypes = {
  tech: PropTypes.arrayOf((PropTypes.shape({
    techObj: PropTypes.shape({
      id: PropTypes.number,
    }),
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
