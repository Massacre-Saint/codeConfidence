import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { BsFillSignpost2Fill } from 'react-icons/bs';
import { ProgressBar } from 'react-bootstrap';
import TechImage from '../icons/TechImage';
import convertTime from '../../utils/convertTime';
import TopicListContainer from './TopicListContainer';

function SingleGoalContainer({
  goal,
  topics,
  goals,
  onUpdate,
  lTech,
}) {
  const [filteredTopics, setFilteredTopics] = useState([]);

  useEffect(() => {
    setFilteredTopics(topics);
  }, [topics]);

  return (
    <div className="tech-view_container">
      <div className="flex-row space-between">
        <div className="fnt-secondary margin-btm">
          <IconContext.Provider value={{ size: '1.2em' }}>
            <BsFillSignpost2Fill className="margin-r-sm" />
          </IconContext.Provider>
          Viewing Goal:
        </div>
        <div className="flex-row">
          Edit and New
        </div>
      </div>
      <div className="flex-row">
        <div className="margin-r-md">
          <TechImage obj={goal.learnedTech.tech} />
        </div>
        <div className="flex-col">
          <h2>
            {goal.title}
          </h2>
          <div>
            {goal.description}
          </div>
        </div>
      </div>
      <div className="progress_container">
        <ProgressBar
          bsPrefix="progress"
          now={goal.progress}
          label={`${goal.progress}%`}
        />
      </div>
      <div className="fnt-secondary">
        <span className="margin-r-md">
          {convertTime(goal.lastUpdated)}
        </span>
        <span>
          {`${goal.progress} % complete`}
        </span>
      </div>
      <TopicListContainer
        topics={topics}
        goals={goals}
        setFilteredTopics={setFilteredTopics}
        filteredTopics={filteredTopics}
        onUpdate={onUpdate}
        lTech={lTech}
      />
    </div>
  );
}

export default SingleGoalContainer;

SingleGoalContainer.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    learnedTech: PropTypes.shape({
      tech: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
    lastUpdated: PropTypes.string,
    progress: PropTypes.number,
  }).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
  lTech: PropTypes.shape({
    tech: PropTypes.shape({
      docUrl: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};
