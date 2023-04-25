import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import { FiMoreVertical } from 'react-icons/fi';

function MoreOptionsButton({ node, isResource, handleShowForm }) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      type="button"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="border-none
      background-none
      fnt-primary"
    >
      {children}
    </button>
  ));

  CustomToggle.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  return (
    <>
      <Dropdown className="dropdown-inline">
        <Dropdown.Toggle as={CustomToggle}>
          <FiMoreVertical size={17} />
        </Dropdown.Toggle>

        <Dropdown.Menu className="fit-content">
          {node.url === null
            ? (
              <>
                <Dropdown.Item eventKey="1" onClick={() => handleShowForm(node, isResource)}>Add Folder</Dropdown.Item>
                <Dropdown.Item eventKey="2">Delete All</Dropdown.Item>
              </>
            )
            : (
              <>
                <Dropdown.Item eventKey="1" onClick={() => handleShowForm(node, isResource)}>Add</Dropdown.Item>
                <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
              </>
            )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default MoreOptionsButton;
MoreOptionsButton.propTypes = {
  isResource: PropTypes.shape({
    id: PropTypes.number,
  }),
  node: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  }).isRequired,
  handleShowForm: PropTypes.func.isRequired,
};

MoreOptionsButton.defaultProps = {
  isResource: undefined,
};
