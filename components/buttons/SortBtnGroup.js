import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

function SortBtnGroup({ radioGroup, handleFilter, filteredArray }) {
  const [selectedValue, setSelectedValue] = useState('');
  const resetFilter = () => {
    setSelectedValue('');
  };
  const showButton = () => filteredArray.map((a, index) => {
    console.warn('hello');
    const matchingRadio = radioGroup.find((item) => parseInt(item.value, 10) === index + 1);
    if (matchingRadio && a.length > 0) {
      return (
        <span
          key={matchingRadio.value}
        >
          <input
            type="radio"
            id={matchingRadio.value}
            name="nav"
            value={matchingRadio.name}
            checked={selectedValue === matchingRadio.value}
            onChange={(e) => {
              setSelectedValue(e.target.id);
              handleFilter(e);
            }}
            className="radio-none"
          />
          <label
            htmlFor={matchingRadio.value}
            type="button"
            className={
                  selectedValue !== matchingRadio.value && selectedValue !== ''
                    ? 'border-outline-selected filter-btn hide'
                    : 'filter-btn'
                }
          >{matchingRadio.name}
          </label>
        </span>
      );
    }
    return null;
  });

  return (
    <div>
      <form>
        {selectedValue !== ''
          ? (
            <button
              type="button"
              className="close-button-round"
              onClick={(e) => {
                resetFilter();
                handleFilter(e);
              }}
            >
              <AiOutlineClose />
            </button>
          )
          : ('')}
        {showButton()}
      </form>
    </div>
  );
}

export default SortBtnGroup;
SortBtnGroup.propTypes = {
  radioGroup: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  handleFilter: PropTypes.func.isRequired,
  filteredArray: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  ).isRequired,
};
