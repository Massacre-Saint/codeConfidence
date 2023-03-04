import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function SortDropdown({ lTechGoals, setFilteredGoals }) {
  const sortItems = [
    { name: 'Recently updated', value: 1 },
    { name: 'Least Complete', value: 2 },
    { name: 'Most Complete', value: 3 },
    { name: 'A-Z', value: 4 },
  ];
  const handleSort = (pk) => {
    let results;
    if (pk === 1) {
      results = [...lTechGoals].sort((a, b) => a.lastUpdated - b.lastUpdated);
    } else if (pk === 2) {
      results = [...lTechGoals].sort((a, b) => a.progress - b.progress);
    } else if (pk === 3) {
      results = [...lTechGoals].sort((a, b) => b.progress - a.progress);
    } else if (pk === 4) {
      results = [...lTechGoals].sort((a, b) => a.title.localeCompare(b.title));
    }
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
        {sortItems.map((i) => (
          <>
            <Dropdown.Item key={i.value} onClick={() => handleSort(i.value)}>
              {i.name}
            </Dropdown.Item>
            <Dropdown.Divider />
          </>
        ))}

      </DropdownButton>
    </>
  );
}

SortDropdown.propTypes = {
  lTechGoals: PropTypes.arrayOf((PropTypes.shape({
    title: PropTypes.string,
    lastUpdated: PropTypes.string,
    progress: PropTypes.number,
  }))).isRequired,
  setFilteredGoals: PropTypes.func.isRequired,
};

export default SortDropdown;
