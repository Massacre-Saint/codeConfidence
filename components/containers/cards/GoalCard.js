import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { BiTimeFive } from 'react-icons/bi';
import { BsBarChartSteps } from 'react-icons/bs';
import GoalForm from '../../forms/GoalForm';
import { deleteGoal } from '../../../utils/data/goals';
import convertTime from '../../../utils/convertTime';
import EditDelete from '../../buttons/EditDelete';
import { deleteResource } from '../../../utils/data/resources';
import TechImage from '../../icons/TechImage';
import progressStyleHanlder from '../../../utils/progressStyleHandler';
import shortenString from '../../../utils/shortenString';

export default function GoalCard({
  obj,
  onUpdate,
  handleClose,
  edit,
  topics,
  resources,
  setAssignedTopicOrGoal,
  assignedTopicOrGoal,
  assigningBookmark,
  preview,
}) {
  const [showForm, setshowForm] = useState(false);
  const [resource, setResource] = useState({});
  const [goalTopics, setGoalTopics] = useState([]);
  const [show, setShow] = useState(false);
  const handleCloseTopics = () => setShow(false);
  const handleShowTopics = () => setShow(true);
  const progressClass = progressStyleHanlder(obj.progress);
  useEffect(() => {
    if (resources && resources.length > 0) {
      const goalResource = resources.find((i) => i.objectId.id === obj.id);
      setResource(goalResource);
    }
    if (topics.length > 0) {
      const results = topics.filter((i) => i.goal !== null && i.goal.id === obj.id);
      setGoalTopics(results);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics, resources, obj.id]);
  const handleClick = (assignedGoal) => {
    if (assigningBookmark) {
      setAssignedTopicOrGoal(assignedGoal);
    }
  };

  const handleKeyDown = (e) => {
    if (e.target.id === 'card') {
      handleClick(obj);
    }
    if (show) {
      handleCloseTopics();
    } else {
      handleShowTopics(true);
    }
  };

  const handleShowForm = () => {
    setshowForm(true);
  };

  const handleCancelShowForm = () => {
    setshowForm(false);
  };

  const handleDelete = () => {
    if (Object.values(resource).length > 0) {
      deleteResource(resource);
      deleteGoal(obj.id).then(() => onUpdate());
    } else {
      deleteGoal(obj.id).then(() => onUpdate());
    }
  };

  if (showForm) {
    return (
      <div className="flex-col full-width">
        <GoalForm
          obj={obj}
          onUpdate={onUpdate}
          handleClose={handleClose}
          handleCancelShowForm={handleCancelShowForm}
        />
      </div>
    );
  }
  if (preview) {
    return (
      <div
        role="button"
        tabIndex="0"
        id="card"
        onKeyDown={(e) => handleKeyDown(e, obj)}
        onClick={() => handleClick(obj)}
        className={[progressClass, assignedTopicOrGoal.id === obj.id ? 'highlight' : 'card-background padding-all border-radius-15'].join(' ')}
      >
        <div className="flex-row align-center">
          <div className="margin-r-md">
            <TechImage obj={obj.learnedTech.tech} />
          </div>
          <div className="flex-col full-width">
            <span className="fnt-large fnt-primary">
              {shortenString(obj.title)}
            </span>
            <span className="fnt-small">
              <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                <BiTimeFive />
              </IconContext.Provider>
              <span className="margin-r-sm" />
              <span className="fnt-secondary">
                {convertTime(obj.lastUpdated)}
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      role="button"
      tabIndex="0"
      id="card"
      onKeyDown={(e) => handleKeyDown(e, obj)}
      onClick={() => handleClick(obj)}
      className={assignedTopicOrGoal.id === obj.id ? 'highlight' : 'flex-row card-background padding-all border-radius-15'}
    >
      <div className="flex-row">
        <div className="margin-r-md">
          <TechImage obj={obj.learnedTech.tech} />
        </div>
        <div className="flex-col full-width">
          <div>
            <span>
              {shortenString(obj.title)}
            </span>
          </div>
          <div className="fnt-small">
            <span>
              <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                <BiTimeFive />
              </IconContext.Provider>
              <span className="margin-r-sm" />
              <span className="fnt-secondary">
                {convertTime(obj.lastUpdated)}
              </span>
            </span>
            <span className="margin-r-md" />
            {obj.progress != null ? (
              <>
                <span>
                  <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                    <BsBarChartSteps />
                  </IconContext.Provider>
                  <span className="fnt-secondary">
                    {goalTopics.length}
                  </span>
                  <span className="margin-r-sm" />
                </span>
                <div className="progress_container">
                  <ProgressBar bsPrefix="progress" now={obj.progress} label={`${obj.progress}%`} />
                </div>
              </>
            )
              : ('')}
          </div>
        </div>
        {edit ? (
          <div className="edit-delete_container">
            <EditDelete handleShowForm={handleShowForm} handleDelete={handleDelete} />
          </div>
        )
          : ('')}
      </div>
    </div>
  );
}

GoalCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    progress: PropTypes.number,
    lastUpdated: PropTypes.string,
    learnedTech: PropTypes.shape({
      id: PropTypes.number,
      tech: PropTypes.shape({
        image_url: PropTypes.string,
      }),
    }),
  }).isRequired,
  onUpdate: PropTypes.func,
  handleClose: PropTypes.func,
  edit: PropTypes.bool,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))),
  resources: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    bookmark: PropTypes.shape({
      id: PropTypes.number,
    }),
    objectId: PropTypes.shape({
      id: PropTypes.string,
    }),
    tech: PropTypes.shape({
      id: PropTypes.number,
    }),
  }))),
  setAssignedTopicOrGoal: PropTypes.func,
  assignedTopicOrGoal: PropTypes.shape({
    id: PropTypes.string,
  }),
  assigningBookmark: PropTypes.bool,
  preview: PropTypes.bool,
};

GoalCard.defaultProps = {
  edit: false,
  onUpdate: () => {},
  handleClose: () => {},
  topics: [],
  resources: [],
  setAssignedTopicOrGoal: () => {},
  assignedTopicOrGoal: {},
  assigningBookmark: false,
  preview: false,
};
