import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSignpostSplit, BsCheckCircleFill, BsCheckCircle } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import TopicForm from '../../forms/TopicForm';
import { deleteTopic } from '../../../utils/data/topics';
import { getSingleGoal, updateGoal } from '../../../utils/data/goals';
import convertTime from '../../../utils/convertTime';
import { useAuth } from '../../../utils/context/authContext';
import EditDelete from '../../buttons/EditDelete';
import TechImage from '../../icons/TechImage';

export default function TopicCard({
  obj,
  onUpdate,
  handleClose,
  goals,
  edit,
  preview,
}) {
  const { user } = useAuth();
  const [showForm, setshowForm] = useState(false);

  const handleShowForm = () => {
    setshowForm(true);
  };
  const handleCancelShowForm = () => {
    setshowForm(false);
  };

  const handleDelete = () => {
    if (obj.goal != null) {
      getSingleGoal(obj.goal.id).then((goalObj) => {
        deleteTopic(obj.id).then(() => updateGoal(goalObj, user));
      });
    } else {
      deleteTopic(obj.id);
    }
    onUpdate();
  };

  if (showForm) {
    return (
      <div className="flex-col full-width">
        <TopicForm
          onUpdate={onUpdate}
          handleClose={handleClose}
          goals={goals}
          obj={obj}
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
        className="card-background padding-all border-radius-15"
      >
        <div className="flex-row align-center">
          <div className="margin-r-md">
            <TechImage obj={obj.learnedTech.tech} />
          </div>
          <div className="flex-col full-width">
            <span className="fnt-primary fnt-large">
              {obj.title}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-row card-background padding-all border-radius-15">
      <div>
        <TechImage obj={obj.learnedTech.tech} />
      </div>
      <div className="flex-col full-width">
        <div className="flex-col">
          <span className="fnt-primary">
            {obj.title}
          </span>
          <span className="fnt-small fnt-secondary">
            {obj.description}
          </span>
        </div>
        <div className="fnt-small fnt-secondary">
          <span>
            <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
              <BiTimeFive />
            </IconContext.Provider>
            &nbsp;
            <span>
              {convertTime(obj.lastUpdated)}
            </span>
          </span>
          <span>
            {(obj.goal != null)
              ? (
                <span className="margin-l-md">
                  <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                    <BsSignpostSplit />
                  </IconContext.Provider>
                  &nbsp;
                  <span className="">
                    {obj.goal.title}
                  </span>
                </span>
              )
              : ('')}
          </span>
          <span>
            {(obj.completed
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
                    Not Complete
                  </span>
                </span>
              ))}
          </span>
        </div>
      </div>
      {edit ? (
        <div className="edit-delete_container">
          <EditDelete handleShowForm={handleShowForm} handleDelete={handleDelete} />
        </div>
      )
        : ('')}
    </div>
  );
}
TopicCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
    goal: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }),
    learnedTech: PropTypes.shape({
      tech: PropTypes.shape({
        image_url: PropTypes.string,
      }),
    }),
    lastUpdated: PropTypes.string,
  }).isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }))),
  onUpdate: PropTypes.func,
  handleClose: PropTypes.func,
  edit: PropTypes.bool,
  preview: PropTypes.bool,
};

TopicCard.defaultProps = {
  edit: false,
  preview: false,
  goals: [],
  handleClose: () => {},
  onUpdate: () => {},
};
