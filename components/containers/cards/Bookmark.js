import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import Image from 'next/image';
import MoreOptionsButton from '../../buttons/MoreOptionsButton';

function Bookmark({
  node, bookmarks, resources, toggledFilter, handleShowForm,
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
      const shorten = string.slice(0, 17);
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
                        onClick={() => setShowChildren(!showChildren)}
                        className="bookmark"
                      >
                        {showChildren ? (<FcOpenedFolder size={17} />) : (<FcFolder size={17} />)}
                        &nbsp;
                        {shortenedString(node.title)}
                      </span>
                      <span>
                        <MoreOptionsButton
                          node={node}
                          isResource={isResource}
                          handleShowForm={handleShowForm}
                        />
                      </span>
                    </>
                  // Linked Logic
                  ) : (
                    <>
                      <span>
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
                      <span>
                        <MoreOptionsButton
                          node={node}
                          isResource={isResource}
                          handleShowForm={handleShowForm}
                        />
                      </span>
                    </>
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
    children: PropTypes.arrayOf((PropTypes.shape({
      id: PropTypes.number,
    }))),
  }).isRequired,
  bookmarks: PropTypes.arrayOf((PropTypes.shape({
    obj: PropTypes.shape({
      id: PropTypes.number,
    }),
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
