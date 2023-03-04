import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchBar({
  array, setArray,
}) {
  const [searchInput, setSearchInput] = useState('');
  // const [active, setActive]

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = array.filter((obj) => obj.title.toLowerCase().includes(value.toLowerCase()));
    setArray(results);
  };

  const resetInput = () => {
    setSearchInput('');
    setArray(array);
  };

  return (
    <InputGroup>
      <InputGroup.Text id="btnGroupAddon" className="search-side"><AiOutlineSearch /></InputGroup.Text>
      <Form.Control
        type="text"
        className="search-field"
        placeholder="Search Title"
        aria-label="Input group example"
        aria-describedby="btnGroupAddon"
        value={searchInput}
        onChange={handleChange}
        // onClick={}
      />
      <InputGroup.Text id="btnGroupAddon" className="search-side"><button type="button" className="search-side_button" onClick={resetInput}>X</button></InputGroup.Text>
    </InputGroup>
  );
}

SearchBar.propTypes = {
  array: PropTypes.arrayOf((PropTypes.shape({
    title: PropTypes.string,
  }))).isRequired,
  setArray: PropTypes.func.isRequired,
};
