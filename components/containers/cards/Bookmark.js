import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AiOutlineFolderOpen, AiOutlineFolderAdd } from 'react-icons/ai';
import Image from 'next/image';
import KebabButton from '../../buttons/KebabButton';

function Bookmark({
  node,
  bookmarks,
  resources,
  toggledFilter,
  handleShowForm,
  testFunction,
}) {
  const [showChildren, setShowChildren] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isResource = resources.find((resource) => resource.bookmark.id === node.id);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowChildren(false);
    } else {
      setShowChildren(false);
    }
  };
  const shortenedString = (string) => {
    if (string.length > 40) {
      const shorten = string.slice(0, 40);
      return `${shorten}...`;
    }
    return string;
  };

  useEffect(() => {
  }, [bookmarks, toggledFilter]);
  return (
    <>
      {!isResource && toggledFilter
        ? (
          <></>
        )
        : (
          <>
            <div className="list">
              <li>
                {node.url === null
                  // Folder Logic
                  ? (
                    <>
                      <span
                        tabIndex="0"
                        role="button"
                        onKeyDown={handleKeyDown}
                        onClick={() => {
                          setShowChildren(!showChildren);
                          testFunction(node);
                        }}
                        className="bookmark"
                      >
                        {showChildren ? (<AiOutlineFolderOpen size={17} />) : (<AiOutlineFolderAdd size={17} />)}
                        &nbsp;
                        {shortenedString(node.title)}
                      </span>
                      <span>
                        <KebabButton
                          node={node}
                          isResource={isResource}
                          handleClick={handleShowForm}
                          forBookmarkSidebar
                        />
                      </span>
                    </>
                  // Linked Logic
                  ) : (
                    <span
                      id="bookmark"
                      tabIndex="0"
                      role="button"
                      onKeyDown={handleKeyDown}
                      onClick={() => testFunction(node)}
                    >
                      <Image
                        width={17}
                        height={17}
                        src={
                            `https://www.google.com/s2/favicons?domain=${node.url}`
                          }
                      />
                        &nbsp;
                      {shortenedString(node.title)}
                    </span>
                  )}
                {hasChildren && showChildren && (
                <div className="flex-row">
                  <div className="indent-line" />
                  <ul>
                    {node.children.map((child) => (
                      <Bookmark
                        key={child.id}
                        node={child}
                        bookmarks={bookmarks}
                        resources={resources}
                        toggledFilter={toggledFilter}
                        handleShowForm={handleShowForm}
                        testFunction={testFunction}
                      />
                    ))}
                  </ul>
                </div>
                )}
              </li>
            </div>
          </>
        )}
    </>
  );
}

export default Bookmark;
Bookmark.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
    })),
  }).isRequired,
  bookmarks: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  resources: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  toggledFilter: PropTypes.bool.isRequired,
  handleShowForm: PropTypes.func.isRequired,
  testFunction: PropTypes.func.isRequired,
};
