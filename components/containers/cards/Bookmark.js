import PropTypes from 'prop-types';
import { FcFolder } from 'react-icons/fc';

function Bookmark({ node }) {
  const hasChildren = node.children && node.children.length > 0;
  const shortenedString = (string) => {
    if (string.length > 25) {
      const shorten = string.slice(0, 30);
      return `${shorten}...`;
    }
    return string;
  };
  return (
    <div className="list">
      <li>
        {node.url === null ? (
          <span style={{ paddingLeft: hasChildren ? 5 : 10 }}>
            <FcFolder />
            {shortenedString(node.title)}
          </span>
        ) : (
          <span style={{ paddingLeft: hasChildren ? 5 : 10 }}>
            {shortenedString(node.title)}
          </span>
        )}
        {hasChildren && (
          <ul>
            {node.children.map((child) => (
              <Bookmark key={child.id} node={child} />
            ))}
          </ul>
        )}
      </li>
    </div>
  );
}

export default Bookmark;
Bookmark.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.arrayOf((PropTypes.shape({
      id: PropTypes.number,
    }))).isRequired,
  }).isRequired,
};
