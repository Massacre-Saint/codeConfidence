import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { ProgressBar } from 'react-bootstrap';
import GoalForm from '../../forms/GoalForm';
import { deleteGoal } from '../../../utils/data/goals';

export default function GoalCard({
  obj, onUpdate, handleClose,
}) {
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  const handleCancelEdit = () => {
    setEdit(false);
  };

  const handleDelete = () => {
    deleteGoal(obj.id).then(() => onUpdate());
  };

  return (
    <Card className="card_spacing topic-goal_card">
      <Card.Body>
        {edit
          ? <GoalForm obj={obj} onUpdate={onUpdate} handleClose={handleClose} handleCancelEdit={handleCancelEdit} />
          : (
            <>
              <Card.Title>{obj.title}</Card.Title>
              <div>
                <button type="button" id="edit" onClick={(e) => handleEdit(e)}>Edit</button>
                <button type="button" onClick={handleDelete}>Delete</button>
                {obj.progress !== null ? (<ProgressBar now={obj.progress} />) : ('')}
              </div>
            </>
          )}
      </Card.Body>
    </Card>
  );
}

GoalCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    progress: PropTypes.number,
    learnedTech: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
