import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import { FiSettings } from 'react-icons/fi';
import { Authentication } from '.';

function UserSettingButton() {
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
      fnt-primary
      settings-button"
    >
      {children}
    </button>
  ));
  CustomToggle.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  return (
    <Dropdown className="dropdown-inline">
      <Dropdown.Toggle as={CustomToggle}>
        <FiSettings size={20} />
      </Dropdown.Toggle>
      <Dropdown.Menu
        className="fit-content"
        variant="dark"
      >

        <Dropdown.Item
          eventKey="2"
        >
          <Authentication />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserSettingButton;
