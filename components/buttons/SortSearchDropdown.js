import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';

export default function SortSearchDropdown({ lTechGoals, setFilteredTopics, lTechTopics }) {
  const [searchInput, setSearchInput] = useState('');
  const [filteredGoals, setFilteredGoals] = useState([]);

  const handleSortGoal = (goalPk) => {
    if (goalPk) {
      const topicsWithGoal = lTechTopics.filter((obj) => obj.goal !== null);
      const results = topicsWithGoal.filter((obj) => obj.goal.id === goalPk);
      setFilteredTopics(results);
    } else {
      const results = lTechTopics.filter((obj) => obj.goal === null);
      setFilteredTopics(results);
    }
  };
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
      <DropdownButton
        id="dropdown-button-dark-example2"
        variant="secondary"
        menuVariant="dark"
        title="Goals"
        align="end"
        bsPrefix="sort-goal-btn"
      >
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
        {searchInput ? ('')
          : (
            <>
              <Dropdown.Item onClick={() => handleSortGoal()}>
                Unassigned Topics
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          )}
        {filteredGoals.length > 0
          ? (
            filteredGoals.map((i) => (
              <>
                <Dropdown.Item key={i.id} onClick={() => handleSortGoal(i.id)}>
                  {i.title}
                </Dropdown.Item>
                <Dropdown.Divider />
              </>
            ))
          ) : (
            lTechGoals.slice(0, 3).map((i) => (
              <>
                <Dropdown.Item key={i.id} onClick={() => handleSortGoal(i.id)}>
                  {i.title}
                </Dropdown.Item>
                <Dropdown.Divider />
              </>
            ))
          )}
      </DropdownButton>
    </>
  );
}

SortSearchDropdown.propTypes = {
  lTechGoals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }))).isRequired,
  setFilteredTopics: PropTypes.func.isRequired,
  lTechTopics: PropTypes.arrayOf((PropTypes.shape({
    title: PropTypes.string,
  }))).isRequired,
};
