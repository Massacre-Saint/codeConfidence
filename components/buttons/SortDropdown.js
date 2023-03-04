import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function SortDropdown({ array, setArray }) {
  const [sortItems, setSortItems] = useState([]);

  const defineDropdownItems = () => {
    if (array && array.length > 0 && (Object.prototype.hasOwnProperty.call(array[0], 'progress'))) {
      setSortItems([
        { name: 'Recently updated', value: 1 },
        { name: 'Least Complete', value: 2 },
        { name: 'Most Complete', value: 3 },
        { name: 'A-Z', value: 4 },
      ]);
    } else {
      setSortItems([
        { name: 'Recently updated', value: 1 },
        { name: 'A-Z', value: 4 },
      ]);
    }
  };
  useEffect(() => {
    defineDropdownItems();
  }, [array]);
  const handleSort = (pk) => {
    let results;
    if (array.progress) {
      if (pk === 1) {
        results = [...array].sort((a, b) => a.lastUpdated - b.lastUpdated);
      } else if (pk === 2) {
        results = [...array].sort((a, b) => a.progress - b.progress);
      } else if (pk === 3) {
        results = [...array].sort((a, b) => b.progress - a.progress);
      } else if (pk === 4) {
        results = [...array].sort((a, b) => a.title.localeCompare(b.title));
      }
    } else if (pk === 1) {
      results = [...array].sort((a, b) => a.lastUpdated - b.lastUpdated);
    } else if (pk === 4) {
      results = [...array].sort((a, b) => a.title.localeCompare(b.title));
    }
    setArray(results);
  };
  return (
    <>
      <DropdownButton
        id="dropdown-button-dark-example2"
        variant="secondary"
        menuVariant="dark"
        title="Sort"
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
  array: PropTypes.arrayOf((PropTypes.shape({
    obj: PropTypes.shape({
      id: PropTypes.string,
      progress: PropTypes.number,
    }),
  }))).isRequired,
  setArray: PropTypes.func.isRequired,
};

export default SortDropdown;
