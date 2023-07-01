/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unneeded-ternary */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { TbChecklist } from 'react-icons/tb';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import TechImage from '../icons/TechImage';
import convertTime from '../../utils/convertTime';
import EmptyState from './EmptyState';
import { GoalCard } from './cards';
import ExpandButton from '../buttons/ExpandButton';
import RecentsList from './RecentsList';
import SaveButton from '../buttons/SaveButton';
import CancelButton from '../buttons/CancelButton';
import CreateButton from '../buttons/CreateButton';
import KebabButton from '../buttons/KebabButton';
import { deleteTopic, getSingleTopic, updateTopic } from '../../utils/data/topics';
import { useAuth } from '../../utils/context/authContext';
import CreateModal from '../modals/CreateModal';
import DeleteWarningModal from '../modals/DeleteWarningModal';
import { deleteResource } from '../../utils/data/resources';
import { getSingleGoal, updateGoal } from '../../utils/data/goals';

function SingleTopicContanier({
  topic,
  topics,
  goal,
  goals,
  lTech,
  resources,
  onUpdate,
  setTopic,
  setGoal,
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [isExpandToggled, setIsExpandToggled] = useState(goal ? false : true);
  const [creatingGoal, setCreatingGoal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [formInput, setFormInput] = useState({
    ...topic,
    goal: topic.goal ? topic.goal.id : null,
  });

  const handleClose = () => {
    setShowCreateModal(false);
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    if (resources.length > 0) {
      resources.map((i) => deleteResource(i));
    }
    deleteTopic(topic.id).then(() => router.push(`/lTech/${lTech.id}?tech=${lTech.tech.id}`));
  };

  const updateProgress = async (data) => {
    if (data.goal !== null) {
      await getSingleGoal(data.goal).then(async (g) => {
        await updateGoal(g, user);
        setGoal(g);
      });
    } else setGoal(null);
  };
  const handleUpdate = async () => {
    await updateTopic(formInput, user);
    await getSingleTopic(topic.id).then((obj) => {
      setTopic(obj);
    });
  };

  const handleEdit = async (e) => {
    if (e.target.id === 'save') {
      handleUpdate();
      updateProgress(formInput);
      setIsEditing(false);
    } else if (e.target.id === 'edit') {
      setIsEditing(true);
    } else if (e.target.id === 'delete') {
      setShowDeleteModal(true);
    } else {
      setIsEditing(false);
      setShowDeleteModal(false);
    }
  };

  const handleCreate = (e) => {
    if (e.target.id === 'create') {
      setCreatingGoal(true);
    }
    setShowCreateModal(true);
  };

  useEffect(() => {
    setFilteredTopics(topics.filter((obj) => obj.id !== topic.id));
  }, [goals, topic, formInput]);

  if (isEditing) {
    return (
      <div className="tech-view_container">
        <div className="flex-row space-between">
          <div className="fnt-secondary margin-btm">
            <IconContext.Provider value={{ size: '1.2em' }}>
              <TbChecklist className="margin-r-sm" />
            </IconContext.Provider>
            Viewing Topic:
          </div>
          <div className="flex-row">
            <>
              <SaveButton
                handleClick={handleEdit}
              />
              <CancelButton
                handleClick={handleEdit}
              />
            </>
          </div>
        </div>
        <div className="flex-row">
          <div className="margin-r-md">
            <TechImage obj={topic.learnedTech.tech} />
          </div>
          <div className="flex-col">
            <h2>
              <form>
                <input
                  className="strip-form"
                  style={{ width: 700 }}
                  name="title"
                  onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
                  value={formInput.title}
                  spellCheck="true"
                />
              </form>
            </h2>
            <p className="fnt-secondary">
              <form className="margin-top-md">
                <textarea
                  className="strip-form"
                  name="description"
                  style={{ width: 700, height: 200 }}
                  onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
                  value={formInput.description}
                  spellCheck="true"
                />
              </form>
            </p>
          </div>
        </div>
        <div className="margin-top-lg flex-row">
          <Form.Check
            type="switch"
            name="completed"
            onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.checked }))}
            checked={formInput.completed}
            id="completed"
            label="Mark Completed"
            value={formInput.completed}
          />
          <div className="margin-l-lg fnt-secondary">
            <span className="margin-r-md">
              {convertTime(topic.lastUpdated)}
            </span>
          </div>
        </div>
        {goals.length
          ? (
            <>
              <div className="flex-row space-between_shift-down">
                <span className="sub-heading padding">
                  Choose Assigned Goal:
                </span>
              </div>
              <div className="flex-row margin-l-md gap-col">
                <Form.Select
                  aria-label="Selected Goal"
                  size="lg"
                  name="goal"
                  onChange={({ target }) => {
                    const selectedValue = target.value === 'null' ? null : target.value;
                    setFormInput((prev) => ({ ...prev, [target.name]: selectedValue }));
                  }}
                  value={formInput.goal ? formInput.goal : 'null'}
                  bsPrefix="form-box"
                >
                  <option className="form-drop" value="null">No Goal</option>
                  {goals.map((g) => (
                    <option
                      className="form-drop"
                      key={g.id}
                      value={g.id}
                    >
                      {g.title}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </>
          )
          : ('')}
        {topics.length > 1
          ? (
            <>
              <div className="flex-row space-between_shift-down">
                <span className="sub-heading padding">
                  {`View Other ${lTech.tech.name} Topics:`}
                </span>
              </div>
              <div className="flex-row margin-l-md gap-col">
                <RecentsList list={[filteredTopics]} />
              </div>
            </>
          )
          : ('')}
        <CreateModal
          handleClose={handleClose}
          showCreateModal={showCreateModal}
          lTech={lTech}
          goals={goals}
          onUpdate={onUpdate}
          creatingGoal={creatingGoal}
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
  return (
    <div className="tech-view_container">
      <div className="flex-row space-between">
        <div className="fnt-secondary margin-btm">
          <IconContext.Provider value={{ size: '1.2em' }}>
            <TbChecklist className="margin-r-sm" />
          </IconContext.Provider>
          Viewing Topic:
        </div>
        <div className="flex-row">
          <CreateButton
            handleCreate={handleCreate}
            creatingGoal
          />
          <KebabButton
            handleClick={handleEdit}
          />
        </div>
      </div>
      <div className="flex-row">
        <div className="margin-r-md">
          <TechImage obj={topic.learnedTech.tech} />
        </div>
        <div className="flex-col">
          <h2>
            {topic.title}
          </h2>
          <p className="fnt-secondary">
            {topic.description}
          </p>
        </div>
      </div>
      <div className="margin-top-lg flex-row">
        {topic.completed
          ? (
            <span className="margin-l-md">
              <IconContext.Provider value={{ size: '1.5em', color: 'green' }}>
                <BsCheckCircleFill />
              </IconContext.Provider>
                      &nbsp;
              <span className="">
                Completed
              </span>
            </span>
          )
          : (
            <span className="margin-l-md">
              <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                <BsCheckCircle />
              </IconContext.Provider>
                      &nbsp;
              <span className="">
                Not Completed
              </span>
            </span>
          )}
        <div className="margin-l-lg fnt-secondary">
          <span className="margin-r-md">
            {convertTime(topic.lastUpdated)}
          </span>
        </div>
      </div>
      <div className="flex-row space-between_shift-down">
        <span className="sub-heading padding">
          Assigned Goal:
        </span>
        {goal
          ? ('')
          : (
            <span className="sub-heading-sm padding">
              <ExpandButton
                isExpandToggled={isExpandToggled}
                setIsExpandToggled={setIsExpandToggled}
              />
            </span>
          )}
      </div>
      {goal ? (
        <div className="flex-row margin-l-md gap-col">
          <GoalCard
            obj={goal}
            topics={topics}
          />
        </div>
      ) : (
        <>
          {!isExpandToggled
            ? ('')
            : (
              <div className="relative half-height">
                <EmptyState noGoal />
              </div>

            )}
        </>
      )}
      {topics.length > 1
        ? (
          <>
            <div className="flex-row space-between_shift-down">
              <span className="sub-heading padding">
                {`View Other ${lTech.tech.name} Topics:`}
              </span>
            </div>
            <div className="flex-row margin-l-md gap-col">
              <RecentsList list={[filteredTopics]} />
            </div>
          </>
        )
        : ('')}
      <CreateModal
        handleClose={handleClose}
        showCreateModal={showCreateModal}
        lTech={lTech}
        goals={goals}
        onUpdate={onUpdate}
        creatingGoal={creatingGoal}
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

export default SingleTopicContanier;

SingleTopicContanier.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    learnedTech: PropTypes.shape({
      tech: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
    goal: PropTypes.shape({
      id: PropTypes.string,
    }),
    lastUpdated: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  goal: PropTypes.shape({}),
  goals: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  onUpdate: PropTypes.func.isRequired,
  lTech: PropTypes.shape({
    id: PropTypes.number,
    tech: PropTypes.shape({
      id: PropTypes.number,
      docUrl: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  resources: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  setTopic: PropTypes.func.isRequired,
  setGoal: PropTypes.func.isRequired,
};

SingleTopicContanier.defaultProps = {
  goal: null,
};
