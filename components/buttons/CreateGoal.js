import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { getGoals, createGoal } from '../../utils/data/goals';

export default function CreateGoal({ lTech, onUpdate }) {
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
  };

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
      <button type="submit">Go</button>
    </form>
  );
}

CreateGoal.propTypes = {
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
};
