import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BookmarksList from './BookmarksList';
import SortResourcesAndBookmarks from '../buttons/SortResourcesAndBookmarks';
import ResourceForm from '../forms/ResourceForm';
import SearchBar from '../SearchBar';
import BookmarkForm from '../forms/BookmarkForm';
import { getBookmarks } from '../../utils/data/bookmarks';

export default function Bookmarks({
  lTech, goals, topics, resources, onUpdate,
}) {
  const [filteredResources, setFilteredResources] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [toggledFilter, setToggledFilter] = useState(false);
  const [bookmark, setBookmark] = useState({});
  const [resource, setResource] = useState({});
  const [showBookmarkForm, setShowBookmarkForm] = useState(false);
  const [showResourceForm, setShowResourceForm] = useState(false);

  const getAndSetBookmarkData = async () => {
    const bookmarkData = await getBookmarks();
    setBookmarks(bookmarkData);
    setFilteredBookmarks(bookmarkData);
  };

  const handleCloseFormAndResetFormStates = () => {
    setShowBookmarkForm(false);
    setShowResourceForm(false);
    setResource({});
    setBookmark({});
  };

  const handleShowForm = (chosenBookmark, chosenResource) => {
    if (!chosenResource) {
      setShowResourceForm(false);
      setShowBookmarkForm(true);
      setBookmark(chosenBookmark);
    } else {
      setShowBookmarkForm(false);
      setShowResourceForm(true);
      setResource(chosenResource);
    } if (showBookmarkForm || showResourceForm) {
      handleCloseFormAndResetFormStates();
    }
  };
  useEffect(() => {
    getAndSetBookmarkData();
    setFilteredResources(resources);
  }, [resources]);
  return (
    <>
      <div>
        <div className="search-bar-filter-container">
          <SortResourcesAndBookmarks
            resources={resources}
            setFilteredResources={setFilteredResources}
            lTech={lTech}
            setToggledFilter={setToggledFilter}
          />
          <SearchBar array={bookmarks} setArray={setFilteredBookmarks} />
        </div>
        <div className="show-all-list-container">
          {filteredBookmarks.length > 0
            ? (
              <BookmarksList
                bookmarks={bookmarks}
                filteredBookmarks={filteredBookmarks}
                resources={filteredResources}
                toggledFilter={toggledFilter}
                handleShowForm={handleShowForm}
              />
            )
            : ('')}
        </div>
      </div>
      {showResourceForm
        ? (
          <ResourceForm
            obj={resource}
            goals={goals}
            topics={topics}
            handleShowForm={handleShowForm}
            onUpdate={onUpdate}
          />
        )
        : ('')}
      {showBookmarkForm
        ? (
          <BookmarkForm
            obj={bookmark}
            lTech={lTech}
            goals={goals}
            topics={topics}
            handleShowForm={handleShowForm}
            onUpdate={onUpdate}
            fetchBookmarks={getAndSetBookmarkData}
            handleCloseFormAndResetFormStates={handleCloseFormAndResetFormStates}
          />
        )
        : ('')}
    </>
  );
}
Bookmarks.propTypes = {
  lTech: PropTypes.shape({
    tech: PropTypes.shape({
      docUrl: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
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
  onUpdate: PropTypes.func.isRequired,
};
