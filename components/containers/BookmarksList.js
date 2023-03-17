import React from 'react';
import PropTypes from 'prop-types';
import Bookmark from './cards/Bookmark';

function BookmarksList({ bookmarks }) {
  // Find the root node
  const rootNode = bookmarks.find((node) => node.parentId === 1);
  const shortenedString = (string) => {
    if (string.length > 25) {
      const shorten = string.slice(0, 30);
      return `${shorten}...`;
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
      children: children.map(buildTree),
    };
  };

  const tree = buildTree(rootNode);

  return (
    <div className="list">
      <ul>{shortenedString(rootNode.title)}</ul>
      <ul>
        {tree.children.map((child) => (
          <Bookmark key={child.id} node={child} />
        ))}
      </ul>
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
};
