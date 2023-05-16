import React from 'react';
import PropTypes from 'prop-types';
import TopicCard from './cards/TopicCard';

export default function TopicList({
  topics, onUpdate, handleClose, goals, edit,
}) {
  if (topics.length === 0) {
    return (
      <div className="list_spacing empty-list">
        <div>Nothing here</div>
      </div>
    );
  }
  return (
    <div className="list_spacing">
      {topics.map((i) => (
        <TopicCard
          key={i.id}
          obj={i}
          handleClose={handleClose}
          onUpdate={onUpdate}
          goals={goals}
          edit={edit}
        />
      ))}
    </div>
  );
}

TopicList.propTypes = {
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }))),
  onUpdate: PropTypes.func,
  handleClose: PropTypes.func,
  edit: PropTypes.bool,
};

TopicList.defaultProps = {
  goals: [],
  onUpdate: () => {},
  handleClose: () => {},
  edit: false,
};
