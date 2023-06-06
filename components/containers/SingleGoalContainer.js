import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { BsFillSignpost2Fill } from 'react-icons/bs';
import { ProgressBar } from 'react-bootstrap';
import TechImage from '../icons/TechImage';
import convertTime from '../../utils/convertTime';
import TopicListContainer from './TopicListContainer';
import CreateButton from '../buttons/CreateButton';
import CreateModal from '../modals/CreateModal';
import ExpandButton from '../buttons/ExpandButton';
import RecentsList from './RecentsList';

function SingleGoalContainer({
  goal,
  topics,
  goals,
  onUpdate,
  lTech,
}) {
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [creatingTopic, setCreatingTopic] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isExpandToggled, setIsExpandToggled] = useState(false);

  const handleClose = () => {
    setCreatingTopic(false);
    setShowCreateModal(false);
  };

  const handleCreate = (e) => {
    if (e.target.id === 'create') {
      setCreatingTopic(true);
    }
    setShowCreateModal(true);
  };

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
          <CreateButton
            handleCreate={handleCreate}
          />
        </div>
      </div>
      <div className="flex-row">
        <div className="margin-r-md">
          <TechImage obj={goal.learnedTech.tech} />
        </div>
        <div className="flex-col">
          <h2 className="block">
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
        />
      </div>
      <div className="fnt-secondary">
        <span className="margin-r-md">
          {convertTime(goal.lastUpdated)}
        </span>
        <span>
          {`${goal.progress}% complete`}
        </span>
      </div>
      <div className="flex-row space-between_shift-down">
        <span className="sub-heading padding">
          Assigned Topics:
        </span>
        <span className="sub-heading-sm padding">
          <ExpandButton
            isExpandToggled={isExpandToggled}
            setIsExpandToggled={setIsExpandToggled}
          />
        </span>
      </div>
      <div className="flex-row margin-l-md gap-col">
        {isExpandToggled ? (
          <TopicListContainer
            topics={topics}
            goals={goals}
            setFilteredTopics={setFilteredTopics}
            filteredTopics={filteredTopics}
            lTech={lTech}
          />
        ) : (
          <RecentsList list={[topics]} />
        )}
      </div>
      <CreateModal
        handleClose={handleClose}
        creatingTopic={creatingTopic}
        showCreateModal={showCreateModal}
        lTech={lTech}
        goals={goals}
        onUpdate={onUpdate}
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
