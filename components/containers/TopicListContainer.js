import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import FilterModal from '../modals/FilterModal';
import TopicList from './TopicList';

function TopicListContainer({
  topics,
  goals,
  resources,
  setFilteredTopics,
  filteredTopics,
  onUpdate,
  handleClose,
  edit,
  lTech,
}) {
  return (
    <div className="center">
      <div className="space-between margin-sides">
        <SearchBar array={topics} setArray={setFilteredTopics} />
        <FilterModal
          goals={goals}
          topics={topics}
          setFilteredTopics={setFilteredTopics}
          lTech={lTech}
        />
      </div>
      <div className="bottom-border-inset" />
      <div className="show-all-list-container">
        <TopicList
          topics={filteredTopics}
          goals={goals}
          onUpdate={onUpdate}
          handleClose={handleClose}
          edit={edit}
          resources={resources}
        />
      </div>
    </div>
  );
}

export default TopicListContainer;

TopicListContainer.propTypes = {
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  resources: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    bookmark: PropTypes.shape({
      id: PropTypes.number,
    }),
    objectId: PropTypes.shape({
      id: PropTypes.string,
    }),
    tech: PropTypes.shape({
      id: PropTypes.number,
    }),
  }))).isRequired,
  setFilteredTopics: PropTypes.func.isRequired,
  filteredTopics: PropTypes.arrayOf((
    PropTypes.shape({
    })
  )).isRequired,
  lTech: PropTypes.shape({
    tech: PropTypes.shape({
      docUrl: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};
