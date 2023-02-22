import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import TopicForm from '../../forms/TopicForm';
import { deleteTopic } from '../../../utils/data/topics';

export default function TopicCard({
  obj, onUpdate, handleClose, goals,
}) {
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancelEdit = () => {
    setEdit(false);
  };

  const handleDelete = () => {
    deleteTopic(obj.id).then(() => onUpdate());
  };
  return (
    <Card className="card_spacing topic-goal_card">
      <Card.Body>
        {edit
          ? <TopicForm onUpdate={onUpdate} handleClose={handleClose} goals={goals} obj={obj} handleCancelEdit={handleCancelEdit} />
          : (
            <>
              <Card.Title>{obj.title}</Card.Title>
              <Card.Body>{obj.description}</Card.Body>
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
TopicCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    goal: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }),
  }).isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
