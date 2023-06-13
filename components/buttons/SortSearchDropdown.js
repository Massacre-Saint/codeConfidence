import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function SortSearchDropdown({
  lTechGoals, handleToggledQuery, filterOptions,
}) {
  const [searchInput, setSearchInput] = useState('');
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [recentGoals] = useState(
    lTechGoals.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()),
  );
  const resetInput = () => {
    setSearchInput('');
    setFilteredGoals([]);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = lTechGoals.filter((obj) => obj.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredGoals(results);
  };

  return (
    <>
      <InputGroup>
        <Form.Control
          autoFocus
          placeholder="Search Goals"
          value={searchInput}
          onChange={handleChange}
          bsPrefix="search-field-inner-nav"
        />
        <InputGroup.Text id="btnGroupAddon" bsPrefix="search-field-inner-reset"><button type="button" onClick={resetInput}>X</button></InputGroup.Text>
      </InputGroup>

      {filteredGoals.length > 0
        ? (
          filteredGoals.map((i) => (
            filterOptions.slice(6, 7).map((s) => (
              <button
                type="button"
                className={
                    i.id === s.param
                      ? 'background-none fit-content border-outline-selected fnt-primary'
                      : 'background-none fit-content border-outline fnt-primary'
                  }
                key={i.id}
                id="8"
                name="goal"
                onChange={(e) => handleToggledQuery(i, e)}
              >
                {i.title}
              </button>
            ))
          )))
        : (
          recentGoals.slice(0, 3).map((i) => (
            filterOptions.slice(6, 7).map((s) => (
              <button
                type="button"
                className={
                    i.id === s.param
                      ? 'background-none fit-content border-outline-selected fnt-primary'
                      : 'background-none fit-content border-outline fnt-primary'
                  }
                key={i.id}
                id="8"
                name="goal"
                onClick={(e) => handleToggledQuery(i, e)}
              >
                {i.title}
              </button>

            ))
          ))
        )}
    </>
  );
}

SortSearchDropdown.propTypes = {
  lTechGoals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }))).isRequired,
  handleToggledQuery: PropTypes.func.isRequired,
  filterOptions: PropTypes.arrayOf((PropTypes.shape({
    param: PropTypes.string,
  }))),
};

SortSearchDropdown.defaultProps = {
  filterOptions: PropTypes.arrayOf((PropTypes.shape({
    param: '',
  }))),
};
