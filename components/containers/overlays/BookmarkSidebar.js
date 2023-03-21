import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Offcanvas from 'react-bootstrap/Offcanvas';
import BookmarksList from '../BookmarksList';
import ResourcesByTech from '../../buttons/ResourcesByTech';
import ResourceForm from '../../forms/ResourceForm';

export default function BookmarkSidebar({
  show, handleClose, lTech, goals, topics, bookmarks, resources, onUpdate,
}) {
  const [filteredResources, setFilteredResources] = useState([]);
  const [toggledFilter, setToggledFilter] = useState(false);
  const [bookmarkAndResource, setBookmarkAndResource] = useState({});
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = (bookmark, resource) => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
    const data = { bookmark, resource };
    setBookmarkAndResource(data);
  };
  useEffect(() => {
    setFilteredResources(resources);
  }, [resources]);
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} className="bookmark-offcanvas">
        <Offcanvas.Header closeButton closeVariant="white">
          {/* <SearchBar /> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ResourcesByTech
            resources={resources}
            setFilteredResources={setFilteredResources}
            lTech={lTech}
            setToggledFilter={setToggledFilter}
            setShowForm={setShowForm}
          />
          <BookmarksList
            bookmarks={bookmarks}
            resources={filteredResources}
            toggledFilter={toggledFilter}
            handleShowForm={handleShowForm}
          />
          {showForm
            ? (
              <ResourceForm
                obj={bookmarkAndResource}
                goals={goals}
                topics={topics}
                showForm={showForm}
                handleShowForm={handleShowForm}
                onUpdate={onUpdate}
              />

            )
            : (
              ''
            )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
BookmarkSidebar.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
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
  bookmarks: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    index: PropTypes.number,
    parentId: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
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
