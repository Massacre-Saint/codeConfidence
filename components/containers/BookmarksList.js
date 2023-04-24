import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FcFolder } from 'react-icons/fc';
import Bookmark from './cards/Bookmark';

function BookmarksList({
  bookmarks, resources, toggledFilter, handleShowForm,
}) {
  // Find the root node
  const rootNode = bookmarks.find((node) => node.parentId === 1);
  const shortenedString = (string) => {
    if (string.length > 40) {
      const shorten = string.slice(0, 16);
      return `${shorten}`;
    }
    return string;
  };
  // Traverse the tree recursively to build the tree structure
  const buildTree = (node) => {
    const children = bookmarks.filter((child) => child.parentId === node.id);
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
  }, [bookmarks]);
  return (
    <div className="bookmark-list_container">
      <span>
        <FcFolder />
        {shortenedString(rootNode.title)}
      </span>
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
          ''
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
