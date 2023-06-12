import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Bookmark from './cards/Bookmark';

function BookmarksList({
  bookmarks,
  filteredBookmarks,
  resources, toggledFilter,
  handleShowForm,
}) {
  // Find the root node
  const rootNode = filteredBookmarks[0];
  const parentNodesIds = filteredBookmarks.map((i) => i.parentId);
  const rootNodes = bookmarks.filter((i) => parentNodesIds.includes(i.id));

  // Traverse the tree recursively to build the tree structure
  const buildTree = (node) => {
    const children = filteredBookmarks.filter((bookmark) => bookmark.parentId === node.id);
    if (children.length === 0) {
      return node;
    }
    return {
      ...node,
      children: children.map((child) => buildTree(child)),
    };
  };

  const tree = buildTree(rootNode);

  useEffect(() => {
  }, [rootNodes, filteredBookmarks]);
  return (
    <div className="bookmark-list_container">
      {tree.children
        ? (
          <>
            {tree.children.map((child) => (
              <span key={child.id}>
                <Bookmark
                  key={child.id}
                  node={child}
                  bookmarks={bookmarks}
                  resources={resources}
                  toggledFilter={toggledFilter}
                  handleShowForm={handleShowForm}
                />
              </span>
            ))}
          </>
        )
        : (
          <>
            {filteredBookmarks.map((bookmark) => (
              <span key={bookmark.id}>
                <Bookmark
                  key={bookmark.id}
                  node={bookmark}
                  bookmarks={bookmarks}
                  resources={resources}
                  toggledFilter={toggledFilter}
                  handleShowForm={handleShowForm}
                />
              </span>
            ))}
          </>
        )}
    </div>
  );
}

export default BookmarksList;

BookmarksList.propTypes = {
  bookmarks: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    index: PropTypes.number,
    parentId: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
  }))).isRequired,
  filteredBookmarks: PropTypes.arrayOf((PropTypes.shape({
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
  toggledFilter: PropTypes.bool.isRequired,
  handleShowForm: PropTypes.func.isRequired,
};
