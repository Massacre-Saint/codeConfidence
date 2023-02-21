import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import TopicForm from '../../forms/TopicForm';
import { deleteTopic } from '../../../utils/data/topics';

export default function TopicCard({
  obj, onUpdate, handleClose, goals,
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
    deleteTopic(obj.id).then(() => onUpdate());
  };
  return (
    <Card className="card_spacing">
      <Card.Body>
        {edit
          ? <TopicForm onUpdate={onUpdate} handleClose={handleClose} handleBlur={handleBlur} goals={goals} obj={obj} />
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