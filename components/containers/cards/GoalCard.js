import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { BiTimeFive } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Badge from 'react-bootstrap/Badge';
import GoalForm from '../../forms/GoalForm';
import { deleteGoal } from '../../../utils/data/goals';
import convertTime from '../../../utils/convertTime';
import EditDelete from '../../buttons/EditDelete';
import { updateResource } from '../../../utils/data/resources';
import TechImage from '../../icons/TechImage';
import TopAccordian from '../../accordians/TopicAccordian';

export default function GoalCard({
  obj, onUpdate, handleClose, edit, preview, topics, resources,
}) {
  const [showForm, setshowForm] = useState(false);
  const [resource, setResource] = useState({});
  const [goalTopics, setGoalTopics] = useState([]);
  const [show, setShow] = useState(false);
  const handleCloseTopics = () => setShow(false);
  const handleShowTopics = () => setShow(true);
  useEffect(() => {
    if (resources && resources.length > 0) {
      const techResource = resources.find((i) => i.tech.id === obj.learnedTech.id);
      if (techResource) {
        const goalResource = resources.filter((i) => i.objectId !== null && i.objectId === obj.id);
        setResource(goalResource);
      }
    }
    if (topics.length > 0) {
      const results = topics.filter((i) => i.goal !== null && i.goal.id === obj.id);
      setGoalTopics(results);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics, resources, obj.id]);
  const handleKeyDown = () => {
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
    if (resource) {
      updateResource(resource).then(() => {
        deleteGoal(obj.id).then(() => onUpdate());
      });
    } else {
      deleteGoal(obj.id).then(() => onUpdate());
    }
  };
  if (showForm) {
    return (
      <div className="card_spacing topic-goal_card">
        <GoalForm
          obj={obj}
          onUpdate={onUpdate}
          handleClose={handleClose}
          handleCancelShowForm={handleCancelShowForm}
        />
      </div>
    );
  }
  return (
    <>
      <div className="card_spacing topic-goal_card_container">
        <div className="topic-goal-image">
          <TechImage obj={obj.learnedTech.tech} />
        </div>
        <div className="topic-goal_card">
          <div>
            <span className="topic-goal_card_title">
              {preview && obj.title.length > 20
                ? (`${obj.title.slice(0, 20)}....`)
                : (obj.title)}
            </span>
          </div>
          <div className="topic-goal_card_footer">
            <span>
              <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                <BiTimeFive />
              </IconContext.Provider>
              <span className="topic-goal_card_footer-text">
                {convertTime(obj.lastUpdated)}
              </span>
            </span>
            {show
              ? (
                <button
                  className="topic-goal-accordion_btn"
                  type="button"
                  tabIndex="0"
                  onKeyDown={handleKeyDown}
                  onClick={(e) => handleKeyDown(e)}
                >
                  <IconContext.Provider value={{ size: '1.2em', color: 'red' }}>
                    <AiOutlineCloseCircle />
                  </IconContext.Provider>
                  Hide
                </button>
              )
              : (
                <>
                  {goalTopics.length > 0
                    ? (
                      <span
                        tabIndex="0"
                        role="button"
                        onKeyDown={handleKeyDown}
                        onClick={(e) => handleKeyDown(e)}
                      >
                        <Badge pill bg="light" text="dark">
                          {goalTopics.length}
                      &nbsp;
                          {goalTopics.length > 1
                            ? ('Topics')
                            : ('Topic')}
                        </Badge>
                      </span>
                    )
                    : (
                      ''
                    )}
                </>
              )}
          </div>
          {obj.progress != null ? (
            <div className="progress_container">
              <ProgressBar bsPrefix="progress" now={obj.progress} label={`${obj.progress}%`} />
            </div>
          )
            : ('')}
        </div>
        {edit ? (
          <div className="edit-delete_container">
            <EditDelete handleShowForm={handleShowForm} handleDelete={handleDelete} />
          </div>
        )
          : ('')}
      </div>
      <div className="accordion_container">
        <TopAccordian show={show} topics={goalTopics} />
      </div>
    </>
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
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  preview: PropTypes.bool,
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
  }))).isRequired,
};

GoalCard.defaultProps = {
  edit: false,
  preview: false,
  topics: [],
};
