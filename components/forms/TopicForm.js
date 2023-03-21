import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createTopic, updateTopic } from '../../utils/data/topics';
import { getSingleGoal, updateGoal } from '../../utils/data/goals';

export default function TopicForm({
  goals, onUpdate, handleClose, lTech, obj, handleCancelShowForm,
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(() => {
    if (Object.keys(lTech).length !== 0) {
      return {
        title: '',
        description: '',
        learnedTech: lTech.id,
        completed: false,
        goal: null,
      };
    }
    return {
      ...obj,
      learnedTech: obj.learnedTech.id,
      goal: obj.goal ? obj.goal.id : null,
    };
  });
  const updateProgress = (data) => {
    if (data.goal !== null) {
      getSingleGoal(data.goal).then((goal) => {
        updateGoal(goal, user).then(() => onUpdate());
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateTopic(formData, user).then(() => onUpdate());
      updateProgress(formData);
      handleCancelShowForm();
    } else {
      createTopic(formData, user).then(() => onUpdate());
      updateProgress(formData);
      handleClose();
    }
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
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
            value={formData.goal ? formData.goal : ''}
            bsPrefix="form-box"
          >
            <option className="form-drop" value="null">Assigned Goal</option>
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
  return (
    <Form onSubmit={handleSubmit} className="edit-form">
      <Form.Group className="mb-3" controlId="title">
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

      <Form.Group className="mb-3" controlId="description">
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
      <Form.Check
        type="switch"
        name="completed"
        onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.checked }))}
        checked={formData.completed}
        id="completed"
        label="Mark Completed"
      />
      {
      !goals.length
        ? ('')
        : (
          <Form.Select
            aria-label="Selected Goal"
            name="goal"
            onChange={({ target }) => {
              const value = target.value === '' ? null : target.value;
              setFormData((prev) => ({ ...prev, [target.name]: value }));
            }}
            value={formData.goal || ''}
            bsPrefix="form-box"
          >
            <option className="form-drop" value="">Choose Goal</option>
            {
                goals.map((goal) => (
                  <option
                    className="form-drop"
                    key={goal.id}
                    value={goal.id}
                  >
                    {goal.title}
                  </option>
                ))
              }
          </Form.Select>
        )
      }
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button onClick={handleCancelShowForm} variant="outline-danger" type="button">
        Cancel
      </Button>
    </Form>
  );
}

TopicForm.propTypes = {
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }))).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    learnedTech: PropTypes.shape({
      id: PropTypes.number,
    }),
    goal: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCancelShowForm: PropTypes.func,
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
  obj: {},
  handleCancelShowForm: () => {},
};
