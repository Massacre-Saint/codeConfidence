import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ lTechTopics, setFilteredTopics }) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = lTechTopics.filter((obj) => obj.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredTopics(results);
  };

  const resetInput = () => {
    setSearchInput('');
    setFilteredTopics(lTechTopics);
  };

  return (
    <div>
      <form>
        <input
          className="search-field"
          placeholder="Search"
          value={searchInput}
          onChange={handleChange}
        />
        <button type="button" onClick={resetInput}>Reset</button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  lTechTopics: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })).isRequired,
  setFilteredTopics: PropTypes.func.isRequired,
};
