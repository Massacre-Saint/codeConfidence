import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSignpostSplit } from 'react-icons/bs';
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
  obj, onUpdate, handleClose, goals, edit, preview,
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
      <div className="card_spacing topic-goal_card">
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

  return (
    <div className="card_spacing topic-goal_card_container">
      <div className="topic-goal-image">
        <TechImage obj={obj.learnedTech.tech} />
      </div>
      <div className="topic-goal_card">
        <div className="topic-goal_body">
          <span className="topic-goal_card_title">
            {preview && obj.title.length > 20
              ? (`${obj.title.slice(0, 20)}....`)
              : (obj.title)}
          </span>
          <span className="topic-goal_card_desc">
            {preview && obj.description.length > 50
              ? (`${obj.description.slice(0, 50)}....`)
              : (obj.description)}
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
          <span>
            {(obj.goal != null)
              ? (
                <>
                  <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                    <BsSignpostSplit />
                  </IconContext.Provider>
                  <span className="topic-goal_card_footer-text">
                    {obj.goal.title}
                  </span>
                </>
              )
              : ('')}
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
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  preview: PropTypes.bool,
};

TopicCard.defaultProps = {
  edit: false,
  preview: false,
};
