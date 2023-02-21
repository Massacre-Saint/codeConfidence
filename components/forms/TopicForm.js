import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createTopic, updateTopic } from '../../utils/data/topics';

export default function TopicForm({
  goals, onUpdate, handleClose, lTech, obj, handleCancelEdit,
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(() => {
    if (Object.keys(lTech).length !== 0) {
      console.warn(lTech);
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
      goal: obj.goal ? obj.goal.id : '',
    };
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateTopic(formData, user).then(() => onUpdate());
      handleCancelEdit();
    } else {
      createTopic(formData, user).then(() => onUpdate());
      handleClose();
    }
  };

  if (Object.keys(lTech).length !== 0) {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Create Topic</Form.Label>
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
          <Form.Label>Create Topic</Form.Label>
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
            size="sm"
            name="goal"
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
            value={formData.goal ? formData.goal : ''}
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
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Create Topic</Form.Label>
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
        <Form.Label>Create Topic</Form.Label>
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
            name="goal"
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
            value={formData.goal}
            bsPrefix="form-box"
          >
            <option className="form-drop" value="">Choose your favorite goal</option>
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
      <Button onClick={handleCancelEdit} variant="primary" type="button">
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
  handleCancelEdit: PropTypes.func,
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
  handleCancelEdit: () => {},
};
