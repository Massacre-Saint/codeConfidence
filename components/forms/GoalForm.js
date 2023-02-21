import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createGoal, updateGoal } from '../../utils/data/goals';

function GoalForm({
  lTech, onUpdate, handleClose, obj, handleBlur,
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(() => {
    if (lTech) {
      return {
        title: '',
        learnedTech: lTech.id,
      };
    }
    return {
      ...obj,
      learnedTech: obj.learnedTech.id,
    };
  });

  useEffect(() => {
    if (obj && obj.learnedTech) {
      setFormData({
        ...obj,
        learnedTech: obj.learnedTech.id,
      });
    }
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(obj).length !== 0) {
      updateGoal(formData, user).then(() => onUpdate());
      console.warn('update');
      handleBlur();
    } else {
      createGoal(formData, user).then(() => onUpdate());
    }
    handleClose();
  };

  if (Object.keys(obj).length === 0) {
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
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Create a title"
        name="title"
        onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
        value={formData.title}
        required
        spellCheck="true"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default GoalForm;

GoalForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    lastUpdate: PropTypes.string,
    learnedTech: PropTypes.shape({
      id: PropTypes.number,
    }),
    title: PropTypes.string,
    uid: PropTypes.shape({
      uid: PropTypes.string,
    }),
  }),
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
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
};

GoalForm.defaultProps = {
  lTech: {},
  obj: {},
  handleBlur: () => {},
};
