import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai';

export default function CreateDropdown({ handleShow }) {
  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        variant="outline-success"
        menuVariant="dark"
        title={(
          <>
            <AiOutlinePlus />
          </>
        )}
        id="bg-nested-dropdown"
        drop="bottom-end"
        bsPrefix="close-button-round"
      >
        <Dropdown.Item onClick={(e) => handleShow(e)} id="goal" eventKey="1">Create Goal</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleShow(e)} id="topic" eventKey="2">Create Topic</Dropdown.Item>
      </DropdownButton>
    </>
  );
}

CreateDropdown.propTypes = {
  handleShow: PropTypes.func.isRequired,
};
