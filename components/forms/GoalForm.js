import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createGoal, getGoals } from '../../utils/data/goals';

function GoalForm({ lTech, onUpdate, handleClose }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    learnedTech: lTech.id,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createGoal(formData, user);
    getGoals(user, lTech).then(() => onUpdate());
    setFormData({ title: '', learnedTech: lTech.id });
    handleClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Create Goal</Form.Label>
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default GoalForm;

GoalForm.propTypes = {
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
