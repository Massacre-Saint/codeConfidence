import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createTopic } from '../../utils/data/topics';

export default function TopicForm({
  goals, onUpdate, handleClose, lTech,
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    learnedTech: lTech.id,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createTopic(formData, user).then(() => onUpdate());
    handleClose();
  };

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
      <Form.Select
        aria-label="Selected Goal"
        name="goal"
        onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
        value={formData.goal.id}
        bsPrefix="form-box"
        required
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
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
