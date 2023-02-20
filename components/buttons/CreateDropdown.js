import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function CreateDropdown({ handleShow }) {
  return (
    <>
      <ButtonGroup>
        <DropdownButton as={ButtonGroup} title="Create" id="bg-nested-dropdown">
          <Dropdown.Item onClick={(e) => handleShow(e)} id="goal" eventKey="1">Create Goal</Dropdown.Item>
          <Dropdown.Item onClick={(e) => handleShow(e)} id="topic" eventKey="2">Create Topic</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </>
  );
}

CreateDropdown.propTypes = {
  handleShow: PropTypes.func.isRequired,
};
