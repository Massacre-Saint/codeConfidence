import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { BiTimeFive } from 'react-icons/bi';
import GoalForm from '../../forms/GoalForm';
import { deleteGoal } from '../../../utils/data/goals';
import convertTime from '../../../utils/convertTime';

export default function GoalCard({
  obj, onUpdate, handleClose, edit,
}) {
  const [showForm, setshowForm] = useState(false);
  const handleShowForm = () => {
    setshowForm(true);
  };
  const handleCancelShowForm = () => {
    setshowForm(false);
  };

  const handleDelete = () => {
    deleteGoal(obj.id).then(() => onUpdate());
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
    <div className="card_spacing topic-goal_card">
      <div>
        <span className="topic-goal_card_title">{obj.title}</span>
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
      </div>
      {obj.progress != null ? (
        <div className="progress_container">
          <ProgressBar bsPrefix="progress" color="green" now={obj.progress} label={`${obj.progress}%`} />
        </div>
      )
        : ('')}
      {edit ? (
        <div>
          <button type="button" id="showForm" onClick={handleShowForm}>Edit</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </div>
      )
        : ('')}
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
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.bool,
};

GoalCard.defaultProps = {
  edit: false,
};
