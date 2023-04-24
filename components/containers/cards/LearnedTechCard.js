/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TechImage from '../../icons/TechImage';
import { getTopics } from '../../../utils/data/topics';
import { getGoals } from '../../../utils/data/goals';
import { useAuth } from '../../../utils/context/authContext';

export default function LearnedTechCard({ handleClick, obj }) {
  const { user } = useAuth();
  const [techGoalsAndTopics, setTechGoalsAndTopics] = useState([]);
  const assignState = async () => {
    const topics = await getTopics(user, obj);
    const goals = await getGoals(user, obj);
    const topicsAndGoals = topics.concat(goals);
    setTechGoalsAndTopics(topicsAndGoals);
  };
  useEffect(() => {
    assignState();
  }, [user]);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick(obj);
    }
  };
  return (
    <div
      className="tech_card outline"
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onClick={() => handleClick(obj)}
    >
      <TechImage obj={obj.tech} techGoalsAndTopics={techGoalsAndTopics} />
    </div>
  );
}

LearnedTechCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    lastUpdated: PropTypes.string,
    image_url: PropTypes.string,
    tech: PropTypes.shape({
      imageUrl: PropTypes.string,
    }).isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
