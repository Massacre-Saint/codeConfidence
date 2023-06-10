import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { BsFillSignpost2Fill } from 'react-icons/bs';
import { ProgressBar } from 'react-bootstrap';
import { useRouter } from 'next/router';
import TechImage from '../icons/TechImage';
import convertTime from '../../utils/convertTime';
import TopicListContainer from './TopicListContainer';
import CreateButton from '../buttons/CreateButton';
import CancelButton from '../buttons/CancelButton';
import CreateModal from '../modals/CreateModal';
import ExpandButton from '../buttons/ExpandButton';
import SaveButton from '../buttons/SaveButton';
import RecentsList from './RecentsList';
import { deleteGoal, getSingleGoal, updateGoal } from '../../utils/data/goals';
import { useAuth } from '../../utils/context/authContext';
import EmptyState from './EmptyState';
import KebabButton from '../buttons/KebabButton';
import { deleteResource } from '../../utils/data/resources';
import DeleteWarningModal from '../modals/DeleteWarningModal';

function SingleGoalContainer({
  goal,
  setGoal,
  topics,
  goals,
  onUpdate,
  lTech,
  resources,
}) {
  const [filteredTopics, setFilteredTopics] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formInput, setFormInput] = useState(goal);
  const [creatingTopic, setCreatingTopic] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isExpandToggled, setIsExpandToggled] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClose = () => {
    setCreatingTopic(false);
    setShowCreateModal(false);
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    if (resources.length > 0) {
      resources.map((i) => deleteResource(i));
    }
    deleteGoal(goal.id).then(() => router.back());
  };

  const handleEdit = (e) => {
    if (e.target.id === 'save') {
      updateGoal(formInput, user).then(() => {
        getSingleGoal(goal.id).then(setGoal);
      });
      setIsEditing(false);
    } if (e.target.id === 'edit') {
      setIsEditing(true);
    } if (e.target.id === 'delete') {
      setShowDeleteModal(true);
    } else setIsEditing(false);
  };

  const handleCreate = (e) => {
    if (e.target.id === 'create') {
      setCreatingTopic(true);
    }
    setShowCreateModal(true);
  };

  useEffect(() => {
    setFilteredTopics(topics);
  }, [topics, formInput, goal]);

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
          {isEditing
            ? (
              <>
                <SaveButton
                  handleClick={handleEdit}
                />
                <CancelButton
                  handleClick={handleEdit}
                />
              </>
            )
            : (
              <>
                <CreateButton
                  handleCreate={handleCreate}
                />
                <KebabButton
                  handleClick={handleEdit}
                />
              </>
            )}
        </div>
      </div>
      <div className="flex-row">
        <div className="margin-r-md">
          <TechImage obj={goal.learnedTech.tech} />
        </div>
        <div className="flex-col">
          <h2>
            {isEditing ? (
              <form>
                <textarea
                  cols={43}
                  className="strip-form"
                  name="title"
                  onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
                  value={formInput.title}
                  spellCheck="true"
                >
                  {formInput.title}
                </textarea>
              </form>
            )
              : (goal.title)}
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
          {goal.progress ? `${goal.progress}% complete` : ''}
        </span>
      </div>
      <div className="flex-row space-between_shift-down">
        <span className="sub-heading padding">
          Assigned Topics:
        </span>
        {topics.length > 0
          ? (
            <span className="sub-heading-sm padding">
              <ExpandButton
                isExpandToggled={isExpandToggled}
                setIsExpandToggled={setIsExpandToggled}
              />
            </span>
          )
          : ('')}
      </div>
      {topics.length > 0
        ? (
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

        ) : (
          <div className="relative half-height">
            <EmptyState />
          </div>
        )}
      <CreateModal
        handleClose={handleClose}
        creatingTopic={creatingTopic}
        showCreateModal={showCreateModal}
        lTech={lTech}
        goals={goals}
        onUpdate={onUpdate}
      />
      {showDeleteModal ? (
        <DeleteWarningModal
          show={setShowDeleteModal}
          handleClose={handleClose}
          handleDelete={handleDelete}
          relatedData={[topics, resources]}
        />
      ) : ('')}
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
  setGoal: PropTypes.func.isRequired,
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
  resources: PropTypes.arrayOf((PropTypes.shape({
  }))).isRequired,
};
