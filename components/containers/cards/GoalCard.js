import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function GoalCard({ obj }) {
  return (
    <Card className="card_spacing">
      <Card.Body>{obj.title}</Card.Body>
      <div>
        <span>
          <button type="button">
            Edit
          </button>
          <button type="button">
            Delete
          </button>
        </span>
      </div>
    </Card>
  );
}

GoalCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
