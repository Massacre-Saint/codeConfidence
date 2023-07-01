import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createTopic } from '../../utils/data/topics';
import { getSingleGoal, updateGoal } from '../../utils/data/goals';

export default function TopicForm({
  goals,
  onUpdate,
  handleClose,
  lTech,
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(() => ({
    title: '',
    description: '',
    learnedTech: lTech.id,
    completed: false,
    goal: null,
  }));
  const updateProgress = (data) => {
    if (data.goal !== null) {
      getSingleGoal(data.goal).then((goal) => {
        updateGoal(goal, user);
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createTopic(formData, user).then(() => onUpdate());
    updateProgress(formData);
    handleClose();
  };

  if (Object.keys(lTech).length !== 0) {
    return (
      <Form onSubmit={handleSubmit} className="modal-form">
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
            value={formData.title}
            type="text"
            placeholder="Title"
            required
            spellCheck="true"
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
            value={formData.description}
            type="text"
            placeholder="Description"
            required
            spellCheck="true"
          />
        </Form.Group>
        {
      !goals.length
        ? ('')
        : (
          <Form.Select
            aria-label="Selected Goal"
            size="lg"
            name="goal"
            onChange={({ target }) => {
              const value = target.value === '' ? null : target.value;
              setFormData((prev) => ({ ...prev, [target.name]: value }));
            }}
            value={formData.goal || ''}
            bsPrefix="form-box"
          >
            <option className="form-drop" value="">Assigned Goal</option>
            {goals.map((goal) => (
              <option
                className="form-drop"
                key={goal.id}
                value={goal.id}
              >
                {goal.title}
              </option>
            ))}
          </Form.Select>
        )
      }
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

TopicForm.propTypes = {
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  lTech: PropTypes.shape({
    id: PropTypes.number,
    tech: PropTypes.shape({
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      docUrl: PropTypes.string,
    }),
    uid: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

TopicForm.defaultProps = {
  lTech: {},
};
