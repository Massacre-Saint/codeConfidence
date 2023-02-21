import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import GoalForm from '../../forms/GoalForm';
import { deleteGoal } from '../../../utils/data/goals';

export default function GoalCard({
  obj, onUpdate, handleClose,
}) {
  const [edit, setEdit] = useState(false);
  const handleEdit = (e) => {
    if (e.target.id === 'edit') {
      setEdit(true);
    }
  };
  const handleBlur = () => {
    setEdit(false);
  };
  const handleDelete = () => {
    deleteGoal(obj.id).then(() => onUpdate());
  };

  return (
    <Card className="card_spacing">
      <Card.Body>
        {edit
          ? <GoalForm lTech={{}} obj={obj} onUpdate={onUpdate} handleClose={handleClose} handleBlur={handleBlur} />
          : (
            <>
              <Card.Title>{obj.title}</Card.Title>
              <div>
                <button type="button" id="edit" onClick={handleEdit}>Edit</button>
                <button type="button" onClick={handleDelete}>Delete</button>
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
    learnedTech: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
