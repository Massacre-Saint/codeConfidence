import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BookmarksList from './BookmarksList';
import SortResourcesAndBookmarksDropdown from '../buttons/SortResourcesAndBookmarksDropdown';
import ResourceForm from '../forms/ResourceForm';
import SearchBar from '../SearchBar';
import BookmarkForm from '../forms/BookmarkForm';
import { getBookmarks } from '../../utils/data/bookmarks';

export default function Bookmarks({
  lTech, goals, topics, resources, onUpdate,
}) {
  const [filteredResources, setFilteredResources] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [toggledFilter, setToggledFilter] = useState(false);
  const [bookmark, setBookmark] = useState({});
  const [resource, setResource] = useState({});
  const [showBookmarkForm, setShowBookmarkForm] = useState(false);
  const [showResourceForm, setShowResourceForm] = useState(false);

  const getAndSetBookmarkData = async () => {
    const bookmarkData = await getBookmarks();
    setBookmarks(bookmarkData);
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
      <div className="view-all_container">
        <div className="sub-nav-space-between" />
        <div className="show-all_container">
          <div className="show-all_header">
            <div className="search-bar_container">
              <SearchBar />
            </div>
            <div className="show-all_header-content">
              <div>
                <SortResourcesAndBookmarksDropdown
                  resources={resources}
                  setFilteredResources={setFilteredResources}
                  lTech={lTech}
                  setToggledFilter={setToggledFilter}
                />
              </div>
            </div>
          </div>
          <div className="show-all-list-container">
            {bookmarks.length > 0
              ? (
                <BookmarksList
                  bookmarks={bookmarks}
                  resources={filteredResources}
                  toggledFilter={toggledFilter}
                  handleShowForm={handleShowForm}
                />
              )
              : ('')}
          </div>
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
  // <>
  //   <Offcanvas show={show} onHide={handleClose} className="bookmark-offcanvas">
  //     <Offcanvas.Header closeButton closeVariant="white">
  //       <SearchBar />
  //     </Offcanvas.Header>
  //     <Offcanvas.Body>
  //       <ToggleResourcesAndBookmarksButton
  //         resources={resources}
  //         setFilteredResources={setFilteredResources}
  //         lTech={lTech}
  //         setToggledFilter={setToggledFilter}
  //       />
  //       <BookmarksList
  //         bookmarks={bookmarks}
  //         resources={filteredResources}
  //         toggledFilter={toggledFilter}
  //         handleShowForm={handleShowForm}
  //       />
  //       {showResourceForm
  //         ? (
  //           <ResourceForm
  //             obj={resource}
  //             goals={goals}
  //             topics={topics}
  //             handleShowForm={handleShowForm}
  //             onUpdate={onUpdate}
  //           />
  //         )
  //         : ('')}
  //       {showBookmarkForm
  //         ? (
  //           <BookmarkForm
  //             obj={bookmark}
  //             lTech={lTech}
  //             goals={goals}
  //             topics={topics}
  //             handleShowForm={handleShowForm}
  //             onUpdate={onUpdate}
  //             fetchBookmarks={fetchBookmarks}
  //             handleCloseFormAndResetFormStates={handleCloseFormAndResetFormStates}
  //           />
  //         )
  //         : ('')}
  //     </Offcanvas.Body>
  //   </Offcanvas>
  // </>
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
