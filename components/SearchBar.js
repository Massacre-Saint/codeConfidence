import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

export default function SearchBar({
  array, setArray,
}) {
  const [searchInput, setSearchInput] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const inputRef = useRef(null);

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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        if (searchInput.length > 0) {
          setShowSearchBar(true);
        } else setShowSearchBar(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [inputRef, searchInput.length]);
  return (
    <div className="search-container">
      <div>
        <AiOutlineSearch
          type="button"
          className="search-button"
          aria-label="collapsed navbar"
          onClick={() => setShowSearchBar(true)}
        />
        <input
          className={`search-input ${showSearchBar ? 'active' : ''}`}
          name="search"
          placeholder="Search by Title"
          value={searchInput}
          onChange={handleChange}
          ref={inputRef}
        />
        <AiOutlineClose
          type="button"
          className={`search-input-reset ${showSearchBar ? 'taco' : ''}`}
          onClick={resetInput}
        />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  array: PropTypes.arrayOf((PropTypes.shape({
    title: PropTypes.string,
  }))).isRequired,
  setArray: PropTypes.func.isRequired,
};
